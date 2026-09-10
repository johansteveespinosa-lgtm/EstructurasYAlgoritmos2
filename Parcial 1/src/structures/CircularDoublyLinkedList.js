import CircularDoublyNode from "./CircularDoublyNode.js";

class CircularDoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new CircularDoublyNode(value);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;

            newNode.next = this.head;
            newNode.previous = this.head;
        } else {
            newNode.previous = this.tail;
            newNode.next = this.head;

            this.tail.next = newNode;
            this.head.previous = newNode;

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

    print() {
        if (this.head === null) {
            return;
        }

        let current = this.head;

        do {
            console.log(current.value);
            current = current.next;
        } while (current !== this.head);
    }
}

export default CircularDoublyLinkedList;