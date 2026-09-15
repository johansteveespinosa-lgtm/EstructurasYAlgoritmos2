import { useState } from "react";
import CircularDoublyLinkedList from "../structures/CircularDoublyLinkedList.js";

function CommitteePage() {
    const [committee] = useState(() => {
        const list = new CircularDoublyLinkedList();

        list.append("Director");
        list.append("Administrador");
        list.append("Coordinador");

        return list;
    });

    const [currentMember, setCurrentMember] = useState(
        committee.peek()
    );

    const nextMember = () => {
        setCurrentMember(currentMember.next);
    };

    const previousMember = () => {
        setCurrentMember(currentMember.previous);
    };

    return (
        <div>
            <h1>Comité administrativo</h1>

            <h2>Miembro actual</h2>

            {currentMember !== null ? (
                <p>{currentMember.value}</p>
            ) : (
                <p>No hay miembros registrados</p>
            )}

            <button onClick={previousMember}>
                Anterior
            </button>

            <button onClick={nextMember}>
                Siguiente
            </button>

            <p>Miembros del comité: {committee.size()}</p>
        </div>
    );
}

export default CommitteePage;