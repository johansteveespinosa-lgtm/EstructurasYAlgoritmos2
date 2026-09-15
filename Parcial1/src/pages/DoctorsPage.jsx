import { useEffect, useState } from "react";
import CircularLinkedList from "../structures/CircularLinkedList.js";

function DoctorsPage() {
    const [doctors] = useState(() => {
        const list = new CircularLinkedList();

        list.append("Dr. Jose");
        list.append("Dr. Jennifer");
        list.append("Dr. Yolanda");

        return list;
    });

    const [currentDoctor, setCurrentDoctor] = useState(
        doctors.peek()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDoctor((doctor) => doctor.next);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Rotacion de medicos</h1>

            <h2>Medico de guardia</h2>

            {currentDoctor !== null ? (
                <p>{currentDoctor.value}</p>
            ) : (
                <p>No hay medicos registrados</p>
            )}

        

            <p>Medicos registrados: {doctors.size()}</p>
        </div>
    );
}

export default DoctorsPage;