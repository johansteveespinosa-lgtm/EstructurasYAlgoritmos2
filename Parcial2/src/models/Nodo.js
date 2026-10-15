
class Nodo {
  constructor(id, nombre, tipo, creadoPor, padreId = null) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.creadoPor = creadoPor;
    this.padreId = padreId;
    this.hijos = [];
  }

  agregarHijo(nodo) {
    if (this.tipo !== "carpeta") {
      throw new Error("Un archivo no puede tener hijos");
    }

    this.hijos.push(nodo);
  }
}

export default Nodo;
