import LinkedList from "./LinkedList.js";

const songs = new LinkedList();

songs.append("Blinding Lights");
songs.append("Save Your Tears");
songs.append("Starboy");
songs.append("The Hills");

console.log("Cantidad de canciones:", songs.size());

console.log("Primera canción:", songs.peek().value);

console.log("Lista de canciones:");
songs.print();