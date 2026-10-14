
import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './AtmPage.css'

function generarFechaAleatoria() {
  const ahora = new Date()
  const diasAtras = Math.floor(Math.random() * 7)

  ahora.setDate(ahora.getDate() - diasAtras)
  ahora.setHours(
    Math.floor(Math.random() * 12) + 8,
    Math.floor(Math.random() * 60),
    0,
    0
  )

  return ahora.toISOString()
}

function crearPersona(nombre, monto) {
  return {
    id: Date.now() + Math.random(),
    nombre: nombre,
    monto: monto,
    fechaLlegada: generarFechaAleatoria()
  }
}

function AtmPage() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const [cola, setCola] = useState([
    crearPersona('Carlos', 100000),
    crearPersona('Maria', 200000),
    crearPersona('Andres', 50000),
    crearPersona('Laura', 150000),
    crearPersona('Santiago', 300000)
  ])

  const [nombre, setNombre] = useState('')
  const [monto, setMonto] = useState('')

  function agregarPersona(evento) {
    evento.preventDefault()

    if (nombre.trim() === '' || Number(monto) <= 0) {
      alert('Ingresa un nombre y un monto valido.')
      return
    }

    const nuevaPersona = crearPersona(nombre.trim(), Number(monto))

    setCola([...cola, nuevaPersona])
    setNombre('')
    setMonto('')
  }

  const colaOrdenada = [...cola].sort(
    (a, b) => new Date(a.fechaLlegada) - new Date(b.fechaLlegada)
  )

  function formatoFecha(fecha) {
    return new Date(fecha).toLocaleString('es-CO')
  }

  function formatoDinero(valor) {
    return valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    })
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <main className="atm-contenedor">
      <header className="atm-encabezado">
        <p className="atm-etiqueta">ESTRUCTURAS DE DATOS Y ALGORITMOS</p>
        <h1>Cola del cajero ATM</h1>
        <p>Gestion de personas y turnos de retiro</p>

        <p>Usuario conectado: {user.name}</p>

        <nav className="atm-navegacion">
          <Link to="/ejercicio-2">Ir al ejercicio 2</Link>
          <button type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </nav>
      </header>

      <section className="atm-resumen">
        <div className="atm-tarjeta">
          <span>Personas en la cola</span>
          <strong>{cola.length}</strong>
        </div>

        <div className="atm-tarjeta">
          <span>Total de retiros</span>
          <strong>
            {formatoDinero(
              cola.reduce((total, persona) => total + persona.monto, 0)
            )}
          </strong>
        </div>
      </section>

      <section className="atm-panel">
        <h2>Agregar persona</h2>
        <p>La fecha de llegada se asigna automaticamente.</p>

        <form onSubmit={agregarPersona}>
          <label htmlFor="atm-nombre">Nombre completo</label>
          <input
            id="atm-nombre"
            type="text"
            placeholder="Ej. Juan Perez"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            required
          />

          <label htmlFor="atm-monto">Monto del retiro (COP)</label>
          <input
            id="atm-monto"
            type="number"
            placeholder="Ej. 100000"
            min="1"
            value={monto}
            onChange={(evento) => setMonto(evento.target.value)}
            required
          />

          <button type="submit">Agregar a la cola</button>
        </form>
      </section>

      <section className="atm-panel">
        <h2>Personas en espera</h2>
        <p>Ordenadas desde la fecha mas antigua hasta la mas reciente.</p>

        <div className="atm-tabla-contenedor">
          <table>
            <thead>
              <tr>
                <th>Turno</th>
                <th>Nombre</th>
                <th>Monto del retiro</th>
                <th>Fecha de llegada</th>
              </tr>
            </thead>

            <tbody>
              {colaOrdenada.map((persona, indice) => (
                <tr key={persona.id}>
                  <td>{indice + 1}</td>
                  <td>{persona.nombre}</td>
                  <td>{formatoDinero(persona.monto)}</td>
                  <td>{formatoFecha(persona.fechaLlegada)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default AtmPage
