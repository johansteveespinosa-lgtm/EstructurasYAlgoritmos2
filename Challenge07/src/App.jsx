

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/tasks" replace /> : <Login />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/tasks" replace /> : <Register />}
      />

      <Route
        path="/tasks"
        element={
          <PrivateRoute>
            <Tasks />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to={user ? "/tasks" : "/login"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
