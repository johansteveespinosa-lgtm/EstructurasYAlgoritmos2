import Node from "./Node.js";

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
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

        if (this.head.value === value) {
            this.head = this.head.next;
            this.length--;

            if (this.length === 0) {
                this.tail = null;
            }

            return;
        }

        let current = this.head;

        while (current.next !== null) {
            if (current.next.value === value) {
                if (current.next === this.tail) {
                    this.tail = current;
                }

                current.next = current.next.next;
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

export default LinkedList;