import DoublyLinkedList from "./DoublyLinkedList.js";

const pages = new DoublyLinkedList();

pages.append("Google");
pages.append("YouTube");
pages.append("GitHub");
pages.append("Wikipedia");

console.log("Cantidad de páginas:", pages.size());

console.log("Primera página:", pages.peek().value);

console.log("Historial:");
pages.print();