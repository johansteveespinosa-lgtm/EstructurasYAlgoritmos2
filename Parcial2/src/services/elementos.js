
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc
} from "firebase/firestore";

import { db } from "./firebase.js";

const coleccionElementos = collection(db, "elementos");

export function escucharElementos(alRecibir) {
  return onSnapshot(coleccionElementos, (resultado) => {
    const elementos = resultado.docs.map((documento) => ({
      id: documento.id,
      ...documento.data()
    }));

    alRecibir(elementos);
  });
}

export async function guardarElemento(
  id,
  nombre,
  tipo,
  padreId,
  usuario
) {
  if (!usuario || !usuario.email) {
    throw new Error("Debes iniciar sesión para crear elementos.");
  }

  if (!nombre.trim()) {
    throw new Error("Escribe un nombre.");
  }

  if (!["carpeta", "archivo"].includes(tipo)) {
    throw new Error("Tipo de elemento no válido.");
  }

  const referencia = doc(coleccionElementos, id);

  await setDoc(referencia, {
    nombre: nombre.trim(),
    tipo,
    padreId,
    creadoPor: usuario.email,
    uidCreador: usuario.uid,
    createdAt: serverTimestamp()
  });
}
