
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(email, password) {
    if (email === 'user@mail.com' && password === '123') {
      setUser({
        email: email,
        name: email.split('@')[0]
      })

      return true
    }

    return false
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
