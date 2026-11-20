
import { useMemo, useState } from "react";
import Trie from "./structures/Trie";
import MaxHeap from "./structures/MaxHeap";
import "./App.css";

const initialProducts = [
  { name: "air max", popularity: 90 },
  { name: "air force", popularity: 95 },
  { name: "air jordan", popularity: 85 },
  { name: "adidas boost", popularity: 80 },
  { name: "adidas samba", popularity: 92 },
  { name: "nike revolution", popularity: 75 },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("air");
  const [topK, setTopK] = useState(2);
  const [name, setName] = useState("");
  const [popularity, setPopularity] = useState("");
  const [message, setMessage] = useState("");

  // Construir el Trie con todos los productos
  const trie = useMemo(() => {
    const newTrie = new Trie();

    products.forEach((product) => {
      newTrie.insert(product.name, product.popularity);
    });

    return newTrie;
  }, [products]);

  // Buscar por prefijo y obtener los Top K con Heap
  const { results, totalMatches } = useMemo(() => {
    const matches = trie.searchByPrefix(search);
    const heap = new MaxHeap();

    matches.forEach((product) => {
      heap.insert(product);
    });

    return {
      results: heap.getTopK(topK),
      totalMatches: matches.length,
    };
  }, [trie, search, topK]);

  // Agregar un producto nuevo
  const addProduct = (event) => {
    event.preventDefault();

    const normalizedName = name.trim().toLowerCase();
    const numericPopularity = Number(popularity);

    if (!normalizedName) {
      setMessage("Debes ingresar el nombre del producto.");
      return;
    }

    if (
      popularity.trim() === "" ||
      !Number.isInteger(numericPopularity) ||
      numericPopularity < 0 ||
      numericPopularity > 100
    ) {
      setMessage("La popularidad debe estar entre 0 y 100.");
      return;
    }

    if (products.some((product) => product.name === normalizedName)) {
      setMessage("Este producto ya está registrado.");
      return;
    }

    setProducts((previous) => [
      ...previous,
      {
        name: normalizedName,
        popularity: numericPopularity,
      },
    ]);

    setName("");
    setPopularity("");
    setMessage("Producto agregado correctamente.");
  };

  return (
    <div className="app">
      <header className="header">
        <span className="tag">CHALLENGE 12 · DATA STRUCTURES</span>
        <h1>Smart Product Search</h1>
        <p>
          Buscador inteligente de productos utilizando
          <strong> Trie + Max Heap</strong>.
        </p>
      </header>

      <main className="dashboard">
        <section className="panel search-panel">
          <h2>Buscar productos</h2>
          <p>Escribe un prefijo para encontrar coincidencias.</p>

          <label htmlFor="search">Prefijo de búsqueda</label>
          <input
            id="search"
            type="text"
            placeholder="Ejemplo: air"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <label htmlFor="topK">Cantidad de resultados (Top K)</label>
          <input
            id="topK"
            type="number"
            min="1"
            max="100"
            value={topK}
            onChange={(event) => {
              const value = Number(event.target.value);
              setTopK(Math.max(1, Math.min(100, value || 1)));
            }}
          />

          <div className="stats">
            <div>
              <strong>{products.length}</strong>
              <span>Productos</span>
            </div>
            <div>
              <strong>{totalMatches}</strong>
              <span>Coincidencias</span>
            </div>
            <div>
              <strong>{results.length}</strong>
              <span>Top resultados</span>
            </div>
          </div>
        </section>

        <section className="panel results-panel">
          <h2>Top resultados</h2>
          <p>Ordenados de mayor a menor popularidad.</p>

          {results.length === 0 ? (
            <div className="empty">
              No se encontraron productos con ese prefijo.
            </div>
          ) : (
            <div className="results-list">
              {results.map((product, index) => (
                <div className="product-card" key={product.name}>
                  <div className="rank">#{index + 1}</div>

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="progress">
                      <div
                        className="progress-fill"
                        style={{ width: `${product.popularity}%` }}
                      />
                    </div>
                  </div>

                  <div className="score">
                    {product.popularity}
                    <span>/100</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="panel add-panel">
          <h2>Agregar producto</h2>
          <p>Inserta nuevos productos en nuestro buscador.</p>

          <form onSubmit={addProduct}>
            <label htmlFor="name">Nombre del producto</label>
            <input
              id="name"
              type="text"
              placeholder="Ejemplo: air zoom"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <label htmlFor="popularity">Popularidad (0 - 100)</label>
            <input
              id="popularity"
              type="number"
              min="0"
              max="100"
              placeholder="Ejemplo: 98"
              value={popularity}
              onChange={(event) => setPopularity(event.target.value)}
            />

            <button type="submit">+ Agregar producto</button>
          </form>

          {message && <p className="message">{message}</p>}
        </section>

        <section className="panel catalog-panel">
          <h2>Catálogo de productos</h2>
          <p>Productos almacenados en el Trie.</p>

          <div className="catalog-list">
            {products.map((product) => (
              <div className="catalog-item" key={product.name}>
                <span>{product.name}</span>
                <strong>{product.popularity}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        Challenge 12 · Trie + Heap · React
      </footer>
    </div>
  );
}

export default App;
