
import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

function App() {
  const [search, setSearch] = useState("cats");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const searchGifs = async () => {
      if (!search.trim()) {
        setGifs([]);
        setTotal(0);
        setError("");
        return;
      }

      if (!API_KEY) {
        setError("No se encontró la API Key de GIPHY.");
        setGifs([]);
        setTotal(0);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          api_key: API_KEY,
          q: search.trim(),
          limit: "25",
          offset: "0",
          rating: "g",
          lang: "en",
        });

        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        setGifs(data.data || []);
        setTotal(data.pagination?.total_count || 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudieron cargar los GIFs. Revisa tu API Key.");
          setGifs([]);
          setTotal(0);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    const timer = setTimeout(searchGifs, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search]);

  return (
    <div className="app">
      <header className="header">
        <span className="tag">CHALLENGE 13 · GIPHY API</span>
        <h1>GIF Search Engine</h1>
        <p>
          Busca tus GIFs favoritos utilizando
          <strong> React + GIPHY API + Fetch</strong>
        </p>
      </header>

      <main>
        <section className="search-panel">
          <h2>Buscar GIFs</h2>
          <p>Escribe una palabra y descubre GIFs relacionados.</p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Ejemplo: cats, smile, football..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="stats">
            <div>
              <strong>{gifs.length}</strong>
              <span>GIFs mostrados</span>
            </div>
            <div>
              <strong>{total.toLocaleString()}</strong>
              <span>Coincidencias totales</span>
            </div>
          </div>
        </section>

        <section className="results-section">
          <div className="results-header">
            <h2>Resultados de búsqueda</h2>
            <span>Powered by GIPHY</span>
          </div>

          {loading && (
            <div className="status">
              Buscando GIFs...
            </div>
          )}

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {!loading && !error && gifs.length === 0 && (
            <div className="status">
              No se encontraron GIFs.
            </div>
          )}

          {!loading && !error && (
            <div className="gif-grid">
              {gifs.map((gif) => (
                <a
                  href={gif.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gif-card"
                  key={gif.id}
                >
                  <img
                    src={gif.images?.fixed_height?.url}
                    alt={gif.title || "GIF"}
                    loading="lazy"
                  />
                  <div className="gif-info">
                    <span>{gif.title || "GIF sin título"}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        Challenge 13 · React · GIPHY Search API
      </footer>
    </div>
  );
}

export default App;
