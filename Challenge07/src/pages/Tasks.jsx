
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { TaskContext } from "../context/TaskContext";

function Tasks() {
  const { user, logout } = useAuth();
  const { tasks, addTask, editTask, deleteTask, toggleTask } =
    useContext(TaskContext);

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      return;
    }

    addTask(title.trim());
    setTitle("");
  };

  const handleEditTask = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (editingTitle.trim() === "") {
      return;
    }

    editTask(editingId, editingTitle.trim());
    setEditingId(null);
    setEditingTitle("");
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <p>Debes iniciar sesión para ver tus tareas.</p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/login")}
        >
          Ir al login
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Mis tareas</h1>
          <p className="text-muted mb-0">{user.email}</p>
        </div>

        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">Agregar una tarea</h4>

        <form onSubmit={handleAddTask} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="¿Qué necesitas hacer?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>

      <h4 className="mb-3">Lista de tareas</h4>

      {tasks.length === 0 ? (
        <div className="alert alert-info">
          Todavía no tienes tareas. ¡Agrega la primera!
        </div>
      ) : (
        <div className="list-group">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="list-group-item p-3"
            >
              {editingId === task.id ? (
                <form onSubmit={handleSaveEdit} className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    required
                  />

                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingId(null)}
                  >
                    Cancelar
                  </button>
                </form>
              ) : (
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />

                    <span
                      className={task.done ? "text-decoration-line-through text-muted" : ""}
                    >
                      {task.title}
                    </span>

                    <span className={`badge ms-2 ${task.done ? "bg-success" : "bg-warning text-dark"}`}>
                      {task.done ? "Completada" : "Pendiente"}
                    </span>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditTask(task)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;
