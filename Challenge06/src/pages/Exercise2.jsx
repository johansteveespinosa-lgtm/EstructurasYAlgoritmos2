
import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Exercise2() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Ejercicio 2</h1>

      <p>Usuario conectado: {user.name}</p>

      <p>Esta es la segunda página privada del Challenge 6.</p>

      <nav>
        <Link to="/atm">Volver al ejercicio 1</Link>
      </nav>

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default Exercise2
