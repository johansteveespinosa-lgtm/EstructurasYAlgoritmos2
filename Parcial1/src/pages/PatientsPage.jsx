import { useState } from "react";
import LinkedList from "../structures/LinkedList.js";
import DoublyLinkedList from "../structures/DoublyLinkedList.js";

function PatientsPage() {
    const [patients] = useState(() => {
        const list = new LinkedList();

        list.append("Johan");
        list.append("Yurany");
        list.append("Madeleine");
        list.append("Carlos");

        return list;
    });

    const [history] = useState(() => {
        return new DoublyLinkedList();
    });

    const [currentPatient, setCurrentPatient] = useState(
        patients.peek()
    );

    const attendPatient = () => {
        if (currentPatient !== null) {
            history.append(currentPatient.value);
            patients.remove(currentPatient.value);
            setCurrentPatient(patients.peek());
        }
    };

    const getHistory = () => {
        const patientsHistory = [];
        let current = history.head;

        while (current !== null) {
            patientsHistory.push(current.value);
            current = current.next;
        }

        return patientsHistory;
    };

    return (
        <div>
            <h1>Gestion de pacientes</h1>

            <h2>Paciente en espera</h2>

            {currentPatient !== null ? (
                <p>{currentPatient.value}</p>
            ) : (
                <p>No hay pacientes en espera</p>
            )}

            <p>Pacientes en espera: {patients.size()}</p>

            <button onClick={attendPatient}>
                Atender paciente
            </button>

            <h2>Historial de atencion</h2>

            {getHistory().length === 0 ? (
                <p>No hay pacientes atendidos</p>
            ) : (
                <ul>
                    {getHistory().map((patient, index) => (
                        <li key={index}>{patient}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PatientsPage;