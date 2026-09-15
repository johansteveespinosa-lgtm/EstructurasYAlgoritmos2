import DoublyNode from "./DoublyNode.js";

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new DoublyNode(value);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.previous = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }

    peek() {
        return this.head;
    }

    size() {
        return this.length;
    }

    remove(value) {
        if (this.head === null) {
            return;
        }

        let current = this.head;

        while (current !== null) {
            if (current.value === value) {

                if (current.previous !== null) {
                    current.previous.next = current.next;
                } else {
                    this.head = current.next;
                }

                if (current.next !== null) {
                    current.next.previous = current.previous;
                } else {
                    this.tail = current.previous;
                }

                this.length--;
                return;
            }

            current = current.next;
        }
    }

    print() {
        let current = this.head;

        while (current !== null) {
            console.log(current.value);
            current = current.next;
        }
    }
}

export default DoublyLinkedList;