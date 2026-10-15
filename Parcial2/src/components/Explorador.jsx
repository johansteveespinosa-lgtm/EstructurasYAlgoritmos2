

import { useEffect, useRef, useState } from "react";
import ArbolNario from "../models/ArbolNario.js";
import {
  escucharElementos,
  guardarElemento
} from "../services/elementos.js";
import "./Explorador.css";

function Explorador({ usuario }) {
  const arbol = useRef(new ArbolNario());

  const [elementos, setElementos] = useState([]);
  const [actualId, setActualId] = useState("raiz");
  const [actualNombre, setActualNombre] = useState("Mis archivos");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("carpeta");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelarEscucha = escucharElementos((datos) => {
      try {
        const nuevoArbol = new ArbolNario();
        nuevoArbol.cargarElementos(datos);

        arbol.current = nuevoArbol;
        setElementos(datos);
        setCargando(false);
      } catch (error) {
        console.error(error);
        setMensaje("No se pudo reconstruir el árbol de carpetas.");
        setCargando(false);
      }
    });

    return () => cancelarEscucha();
  }, []);

  const elementosActuales = elementos.filter(
    (elemento) => elemento.padreId === actualId
  );

  async function crearElemento(evento) {
    evento.preventDefault();
    setMensaje("");

    if (!nombre.trim()) {
      setMensaje("Escribe un nombre para el elemento.");
      return;
    }

    let nuevoNodo = null;

    try {
      if (tipo === "carpeta") {
        nuevoNodo = arbol.current.crearCarpeta(
          nombre.trim(),
          actualId,
          usuario.email
        );
      } else {
        nuevoNodo = arbol.current.crearArchivo(
          nombre.trim(),
          actualId,
          usuario.email
        );
      }

      await guardarElemento(
        nuevoNodo.id,
        nuevoNodo.nombre,
        nuevoNodo.tipo,
        nuevoNodo.padreId,
        usuario
      );

      setNombre("");
      setMensaje("Elemento creado correctamente.");
    } catch (error) {
      console.error(error);

      try {
        const nuevoArbol = new ArbolNario();
        nuevoArbol.cargarElementos(elementos);
        arbol.current = nuevoArbol;
      } catch (errorArbol) {
        console.error(errorArbol);
      }

      setMensaje(
        error.message || "No se pudo crear el elemento."
      );
    }
  }

  function abrirCarpeta(carpeta) {
    setActualId(carpeta.id);
    setActualNombre(carpeta.nombre);
    setMensaje("");
  }

  function volver() {
    if (actualId === "raiz") {
      return;
    }

    const carpetaActual = elementos.find(
      (elemento) => elemento.id === actualId
    );

    if (!carpetaActual) {
      setActualId("raiz");
      setActualNombre("Mis archivos");
      return;
    }

    const padreId = carpetaActual.padreId;

    if (padreId === "raiz") {
      setActualId("raiz");
      setActualNombre("Mis archivos");
      return;
    }

    const padre = elementos.find(
      (elemento) => elemento.id === padreId
    );

    if (padre) {
      setActualId(padre.id);
      setActualNombre(padre.nombre);
    }
  }

  return (
    <main className="explorador">
      <header className="explorador-header">
        <div>
          <p className="explorador-subtitulo">MIS DOCUMENTOS</p>
          <h1>Mi Explorador</h1>
          <p>Organiza tus carpetas y archivos en un solo lugar.</p>
        </div>

        <div className="usuario">
          <span className="usuario-icono">👤</span>
          <span>{usuario.email}</span>
        </div>
      </header>

      <section className="explorador-contenido">
        <div className="ruta">
          <button
            type="button"
            className="boton-inicio"
            onClick={() => {
              setActualId("raiz");
              setActualNombre("Mis archivos");
              setMensaje("");
            }}
          >
            🏠 Mis archivos
          </button>

          {actualId !== "raiz" && (
            <span>/ {actualNombre}</span>
          )}
        </div>

        <section className="panel-crear">
          <h2>Crear elemento</h2>

          <form onSubmit={crearElemento} className="formulario">
            <input
              type="text"
              placeholder="Nombre de carpeta o archivo"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              required
            />

            <select
              value={tipo}
              onChange={(evento) => setTipo(evento.target.value)}
            >
              <option value="carpeta">Carpeta</option>
              <option value="archivo">Archivo</option>
            </select>

            <button
              type="submit"
              className="boton-crear"
              disabled={cargando}
            >
              + Crear
            </button>
          </form>

          {mensaje && (
            <p className="mensaje" role="status">
              {mensaje}
            </p>
          )}
        </section>

        <section className="panel-elementos">
          <div className="elementos-titulo">
            <h2>{actualNombre}</h2>
            <span>{elementosActuales.length} elementos</span>
          </div>

          {actualId !== "raiz" && (
            <button
              type="button"
              className="boton-volver"
              onClick={volver}
            >
              ← Volver a la carpeta anterior
            </button>
          )}

          {cargando ? (
            <p>Cargando elementos...</p>
          ) : elementosActuales.length === 0 ? (
            <div className="vacio">
              <span>📂</span>
              <h3>Esta carpeta está vacía</h3>
              <p>Crea una carpeta o un archivo para comenzar.</p>
            </div>
          ) : (
            <div className="lista-elementos">
              {elementosActuales.map((elemento) => (
                <article className="elemento" key={elemento.id}>
                  <span className="elemento-icono">
                    {elemento.tipo === "carpeta" ? "📁" : "📄"}
                  </span>

                  <div className="elemento-info">
                    <h3>{elemento.nombre}</h3>
                    <p>
                      {elemento.tipo === "carpeta"
                        ? "Carpeta"
                        : "Archivo"}
                    </p>
                    <small>Creado por: {elemento.creadoPor}</small>
                  </div>

                  {elemento.tipo === "carpeta" && (
                    <button
                      type="button"
                      className="boton-abrir"
                      onClick={() => abrirCarpeta(elemento)}
                    >
                      Abrir →
                    </button>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default Explorador;
