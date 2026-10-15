
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./services/firebase.js";
import Login from "./components/Login.jsx";
import Explorador from "./components/Explorador.jsx";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelarEscucha = onAuthStateChanged(auth, (usuarioActual) => {
      setUsuario(usuarioActual);
      setCargando(false);
    });

    return () => cancelarEscucha();
  }, []);

  async function cerrarSesion() {
    await signOut(auth);
  }

  if (cargando) {
    return <p>Verificando sesión...</p>;
  }

  if (!usuario) {
    return <Login alIngresar={setUsuario} />;
  }

  return (
    <>
      <div className="barra-sesion">
        <span>Sesión: {usuario.email}</span>
        <button type="button" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <Explorador usuario={usuario} />
    </>
  );
}

export default App;
