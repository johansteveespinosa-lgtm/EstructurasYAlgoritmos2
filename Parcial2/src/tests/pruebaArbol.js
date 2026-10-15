
import ArbolNario from "../models/ArbolNario.js";
import Nodo from "../models/Nodo.js";

const arbol = new ArbolNario();

const carpeta = arbol.crearCarpeta(
  "Universidad",
  "raiz",
  "estudiante@correo.com"
);

const archivo = arbol.crearArchivo(
  "Tarea.pdf",
  carpeta.id,
  "estudiante@correo.com"
);

console.log("Carpeta creada:", carpeta.nombre);
console.log("Archivo creado:", archivo.nombre);
console.log("Correo del creador:", archivo.creadoPor);
console.log("Búsqueda del archivo:", arbol.buscarNodo(archivo.id));

try {
  const hijo = new Nodo(
    "hijo",
    "No permitido",
    "archivo",
    "estudiante@correo.com",
    archivo.id
  );

  archivo.agregarHijo(hijo);
} catch (error) {
  console.log("Validación correcta:", error.message);
}
