
import { useState } from 'react';
import Tree from 'react-d3-tree';
import BinaryTree from './data/BinaryTree';
import './App.css';

function App() {
  const [tree, setTree] = useState(() => {
    const newTree = new BinaryTree();
    [8, 3, 10, 1, 6, 14, 4, 7, 13].forEach((n) => newTree.insert(n));
    return newTree;
  });

  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const treeData = [tree.toD3Tree()];

  function addNumber() {
    const value = Number(number);

    if (number.trim() === '' || !Number.isFinite(value)) {
      setMessage('Escribe un número válido.');
      return;
    }

    if (tree.search(value)) {
      setMessage(`El número ${value} ya existe.`);
      return;
    }

    const newTree = new BinaryTree();

    tree.inorder().forEach((n) => newTree.insert(n));
    newTree.insert(value);

    setTree(newTree);
    setMessage(`Número ${value} agregado.`);
    setNumber('');
  }

  function searchNumber() {
    if (number.trim() === '' || !Number.isFinite(Number(number))) {
      setMessage('Escribe un número válido.');
      return;
    }

    const value = Number(number);
    setMessage(
      tree.search(value)
        ? `El número ${value} sí existe en el árbol.`
        : `El número ${value} no existe en el árbol.`
    );
  }

  return (
    <div className="app">
      <h1>Challenge 8 - Binary Tree</h1>
      <p className="subtitle">Árbol binario de búsqueda</p>

      <section>
        <h2>Agregar y buscar números</h2>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Escribe un número"
        />
        <button onClick={addNumber}>Agregar</button>
        <button onClick={searchNumber}>Buscar</button>
        <p>{message}</p>
      </section>

      <section>
        <h2>Recorridos</h2>
        <p><strong>Inorder:</strong> {tree.inorder().join(', ')}</p>
        <p><strong>Postorder:</strong> {tree.postorder().join(', ')}</p>
        <p><strong>Preorder:</strong> {tree.preorder().join(', ')}</p>
      </section>

      <section>
        <h2>Árbol visual</h2>
        <div className="tree-container">
          <Tree
            data={treeData}
            orientation="vertical"
            zoomable
            draggable
            collapsible={false}
            translate={{ x: 450, y: 60 }}
          />
        </div>
      </section>
    </div>
  );
}

export default App;

