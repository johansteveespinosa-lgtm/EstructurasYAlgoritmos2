
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Insertar un producto en el Heap
  insert(product) {
    this.heap.push(product);
    this.heapifyUp();
  }

  // Subir el producto hasta su posición correcta
  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);

      if (
        this.heap[parentIndex].popularity >=
        this.heap[index].popularity
      ) {
        break;
      }

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];

      index = parentIndex;
    }
  }

  // Extraer el producto más popular
  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();

    this.heapifyDown();

    return max;
  }

  // Reorganizar el Heap después de extraer
  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let largest = index;

      if (
        left < length &&
        this.heap[left].popularity >
          this.heap[largest].popularity
      ) {
        largest = left;
      }

      if (
        right < length &&
        this.heap[right].popularity >
          this.heap[largest].popularity
      ) {
        largest = right;
      }

      if (largest === index) {
        break;
      }

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];

      index = largest;
    }
  }

  // Obtener los K productos más populares
  getTopK(k) {
    const results = [];

    for (let i = 0; i < k && this.heap.length > 0; i++) {
      results.push(this.extractMax());
    }

    return results;
  }
}

export default MaxHeap;
