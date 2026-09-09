import { useState } from "react";
import LinkedListPage from "./pages/LinkedListPage.jsx";
import DoublyLinkedListPage from "./pages/DoublyLinkedListPage.jsx";

function App() {
    const [page, setPage] = useState("linked");

    return (
        <div>
            <nav>
                <button onClick={() => setPage("linked")}>
                    Linked List
                </button>

                <button onClick={() => setPage("doubly")}>
                    Doubly Linked List
                </button>
            </nav>

            {page === "linked" && <LinkedListPage />}

            {page === "doubly" && <DoublyLinkedListPage />}
        </div>
    );
}

export default App;