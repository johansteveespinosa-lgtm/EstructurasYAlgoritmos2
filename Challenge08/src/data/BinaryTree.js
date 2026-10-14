
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }

  search(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        return true;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  inorder(node = this.root) {
    if (node === null) return [];

    return [
      ...this.inorder(node.left),
      node.value,
      ...this.inorder(node.right)
    ];
  }

  postorder(node = this.root) {
    if (node === null) return [];

    return [
      ...this.postorder(node.left),
      ...this.postorder(node.right),
      node.value
    ];
  }

  preorder(node = this.root) {
    if (node === null) return [];

    return [
      node.value,
      ...this.preorder(node.left),
      ...this.preorder(node.right)
    ];
  }

  toD3Tree(node = this.root) {
    if (node === null) return null;

    const children = [];

    if (node.left !== null) {
      children.push(this.toD3Tree(node.left));
    }

    if (node.right !== null) {
      children.push(this.toD3Tree(node.right));
    }

    return {
      name: String(node.value),
      children
    };
  }
}

export default BinaryTree;
