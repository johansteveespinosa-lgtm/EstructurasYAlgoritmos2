import { useState } from "react";
import DoublyLinkedList from "../structures/DoublyLinkedList.js";

function DoublyLinkedListPage() {
    const [pages] = useState(() => {
        const list = new DoublyLinkedList();

        list.append("Google");
        list.append("YouTube");
        list.append("GitHub");
        list.append("Wikipedia");

        return list;
    });

    const [currentPage, setCurrentPage] = useState(pages.head);

    const nextPage = () => {
        if (currentPage.next !== null) {
            setCurrentPage(currentPage.next);
        }
    };

    const previousPage = () => {
        if (currentPage.previous !== null) {
            setCurrentPage(currentPage.previous);
        }
    };

    return (
        <div>
            <h1>Browser History</h1>

            <h2>Doubly Linked List</h2>

            <p>Current page:</p>

            <h3>{currentPage.value}</h3>

            <button
                onClick={previousPage}
                disabled={currentPage.previous === null}
            >
                Back
            </button>

            <button
                onClick={nextPage}
                disabled={currentPage.next === null}
            >
                Forward
            </button>
        </div>
    );
}

export default DoublyLinkedListPage;