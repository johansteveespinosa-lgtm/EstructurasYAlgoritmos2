
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import AtmPage from './pages/AtmPage'
import Exercise2 from './pages/Exercise2'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/atm" element={<AtmPage />} />

        <Route path="/ejercicio-2" element={<Exercise2 />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
