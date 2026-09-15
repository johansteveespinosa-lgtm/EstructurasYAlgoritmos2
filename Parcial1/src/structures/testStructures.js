import LinkedList from "./LinkedList.js";
import DoublyLinkedList from "./DoublyLinkedList.js";
import CircularLinkedList from "./CircularLinkedList.js";
import CircularDoublyLinkedList from "./CircularDoublyLinkedList.js";

const patients = new LinkedList();

patients.append("Johan");
patients.append("Yurany");
patients.append("Madeleine");

console.log("Pacientes:");
patients.print();

const history = new DoublyLinkedList();

history.append("Pedro");
history.append("Ana");

console.log("Historial:");
history.print();

const doctors = new CircularLinkedList();

doctors.append("Dr. Jose");
doctors.append("Dr. Jennifer");
doctors.append("Dr. Yolanda");

console.log("Medicos:");
doctors.print();

const committee = new CircularDoublyLinkedList();

committee.append("Director");
committee.append("Administrador");
committee.append("Coordinador");

console.log("Comite:");
committee.print();