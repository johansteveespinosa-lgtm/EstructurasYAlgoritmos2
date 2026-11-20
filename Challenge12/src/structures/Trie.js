
class TrieNode {
  constructor() {
    this.children = {};
    this.product = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insertar un producto en el Trie
  insert(name, popularity) {
    const normalizedName = name.trim().toLowerCase();

    if (!normalizedName || !Number.isFinite(popularity)) {
      return false;
    }

    let current = this.root;

    for (const char of normalizedName) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }

      current = current.children[char];
    }

    current.product = {
      name: normalizedName,
      popularity,
    };

    return true;
  }

  // Buscar productos que coincidan con un prefijo
  searchByPrefix(prefix) {
    const normalizedPrefix = prefix.trim().toLowerCase();
    let current = this.root;

    for (const char of normalizedPrefix) {
      if (!current.children[char]) {
        return [];
      }

      current = current.children[char];
    }

    const results = [];

    const collectProducts = (node) => {
      if (node.product !== null) {
        results.push(node.product);
      }

      for (const child of Object.values(node.children)) {
        collectProducts(child);
      }
    };

    collectProducts(current);

    return results;
  }
}

export default Trie;
