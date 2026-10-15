
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../services/firebase.js";

function Login({ alIngresar }) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [registrando, setRegistrando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setMensaje("");

    try {
      if (registrando) {
        await createUserWithEmailAndPassword(
          auth,
          correo.trim(),
          contrasena
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          correo.trim(),
          contrasena
        );
      }

      alIngresar(auth.currentUser);
    } catch (error) {
      setMensaje(
        "No se pudo ingresar. Revisa el correo y la contraseña."
      );
    }
  }

  return (
    <main className="login">
      <h1>Mi Explorador</h1>
      <p>
        {registrando
          ? "Crea tu cuenta para comenzar."
          : "Ingresa con tu cuenta registrada."}
      </p>

      <form onSubmit={manejarEnvio}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(evento) => setCorreo(evento.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={contrasena}
          onChange={(evento) => setContrasena(evento.target.value)}
          minLength={6}
          required
        />

        <button type="submit">
          {registrando ? "Crear cuenta" : "Iniciar sesión"}
        </button>
      </form>

      {mensaje && <p role="alert">{mensaje}</p>}

      <button
        type="button"
        onClick={() => {
          setRegistrando(!registrando);
          setMensaje("");
        }}
      >
        {registrando
          ? "Ya tengo una cuenta"
          : "Crear una cuenta nueva"}
      </button>
    </main>
  );
}

export default Login;
