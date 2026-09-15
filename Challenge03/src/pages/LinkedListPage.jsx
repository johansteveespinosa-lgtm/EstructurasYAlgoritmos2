import { useState } from "react";
import LinkedList from "../structures/LinkedList.js";

function LinkedListPage() {
    const [songs] = useState(() => {
        const list = new LinkedList();

        list.append("Blinding Lights");
        list.append("Save Your Tears");
        list.append("Starboy");
        list.append("The Hills");

        return list;
    });

    const [currentSong, setCurrentSong] = useState(songs.head);

    const nextSong = () => {
        if (currentSong.next !== null) {
            setCurrentSong(currentSong.next);
        }
    };

    return (
        <div>
            <h1>Music Player</h1>

            <h2>Linked List</h2>

            <p>Current song:</p>

            <h3>{currentSong.value}</h3>

            <button
                onClick={nextSong}
                disabled={currentSong.next === null}
            >
                Next Song
            </button>
        </div>
    );
}

export default LinkedListPage;