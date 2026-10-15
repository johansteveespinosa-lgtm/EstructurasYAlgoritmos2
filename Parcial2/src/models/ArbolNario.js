
import Nodo from "./Nodo.js";

class ArbolNario {
  constructor() {
    this.raiz = new Nodo(
      "raiz",
      "Mis archivos",
      "carpeta",
      "sistema"
    );
  }

  buscarNodo(id, nodo = this.raiz) {
    if (nodo.id === id) {
      return nodo;
    }

    for (let i = 0; i < nodo.hijos.length; i++) {
      const encontrado = this.buscarNodo(id, nodo.hijos[i]);

      if (encontrado !== null) {
        return encontrado;
      }
    }

    return null;
  }

  crearCarpeta(nombre, padreId, correo) {
    const padre = this.buscarNodo(padreId);

    if (padre === null) {
      throw new Error("No se encontró la carpeta padre");
    }

    if (padre.tipo !== "carpeta") {
      throw new Error("Solo una carpeta puede contener elementos");
    }

    const carpeta = new Nodo(
      crypto.randomUUID(),
      nombre,
      "carpeta",
      correo,
      padreId
    );

    padre.agregarHijo(carpeta);

    return carpeta;
  }

  crearArchivo(nombre, padreId, correo) {
    const padre = this.buscarNodo(padreId);

    if (padre === null) {
      throw new Error("No se encontró la carpeta padre");
    }

    if (padre.tipo !== "carpeta") {
      throw new Error("Solo una carpeta puede contener archivos");
    }

    const archivo = new Nodo(
      crypto.randomUUID(),
      nombre,
      "archivo",
      correo,
      padreId
    );

    padre.agregarHijo(archivo);

    return archivo;
  }

  cargarElementos(elementos) {
    this.raiz = new Nodo(
      "raiz",
      "Mis archivos",
      "carpeta",
      "sistema"
    );

    const pendientes = [...elementos];
    let huboCambios = true;

    while (pendientes.length > 0 && huboCambios) {
      huboCambios = false;

      for (let i = pendientes.length - 1; i >= 0; i--) {
        const elemento = pendientes[i];

        if (!["carpeta", "archivo"].includes(elemento.tipo)) {
          throw new Error(
            "El tipo de elemento no es válido."
          );
        }

        const padre = this.buscarNodo(elemento.padreId);

        if (padre !== null && padre.tipo === "carpeta") {
          const nodo = new Nodo(
            elemento.id,
            elemento.nombre,
            elemento.tipo,
            elemento.creadoPor,
            elemento.padreId
          );

          padre.agregarHijo(nodo);
          pendientes.splice(i, 1);
          huboCambios = true;
        }
      }
    }

    if (pendientes.length > 0) {
      throw new Error(
        "Hay elementos con una carpeta padre inexistente o no válida."
      );
    }

    return this.raiz;
  }
}

export default ArbolNario;


