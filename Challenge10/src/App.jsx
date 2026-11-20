
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Comprobar la sesión del usuario
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
        });

        const { data } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => data.subscription.unsubscribe();
    }, []);

    // Consultar tareas y activar Realtime
    useEffect(() => {
        if (!user) {
            setTasks([]);
            return;
        }

        const loadTasks = async () => {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                setMessage(error.message);
            } else {
                setTasks(data);
            }
        };

        loadTasks();

        const channel = supabase
            .channel('tasks-live-' + user.id)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'tasks',
                    filter: 'user_id=eq.' + user.id
                },
                () => {
                    loadTasks();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    // Registrar usuario
    const register = async () => {
        setMessage('');

        const { error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Registro realizado. Revisa tu correo si necesitas confirmar la cuenta.');
        }
    };

    // Iniciar sesión
    const login = async () => {
        setMessage('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setMessage(error.message);
        }
    };

    // Cerrar sesión
    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            setMessage(error.message);
        }
    };

    // Crear o editar una tarea
    const saveTask = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!title.trim()) {
            setMessage('Escribe un título para la tarea.');
            return;
        }

        setLoading(true);

        let result;

        if (editingTask) {
            result = await supabase
                .from('tasks')
                .update({
                    title: title.trim(),
                    description: description.trim() || null
                })
                .eq('id', editingTask)
                .eq('user_id', user.id);
        } else {
            result = await supabase
                .from('tasks')
                .insert({
                    title: title.trim(),
                    description: description.trim() || null
                });
        }

        if (result.error) {
            setMessage(result.error.message);
        } else {
            setTitle('');
            setDescription('');
            setEditingTask(null);
            setMessage('Tarea guardada correctamente.');
        }

        setLoading(false);
    };

    // Preparar una tarea para editar
    const editTask = (task) => {
        setEditingTask(task.id);
        setTitle(task.title);
        setDescription(task.description || '');
        setMessage('');
    };

    // Marcar o desmarcar una tarea
    const toggleTask = async (task) => {
        const { error } = await supabase
            .from('tasks')
            .update({
                is_completed: !task.is_completed
            })
            .eq('id', task.id)
            .eq('user_id', user.id);

        if (error) {
            setMessage(error.message);
        }
    };

    // Eliminar una tarea
    const deleteTask = async (id) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Tarea eliminada correctamente.');
        }
    };

    // Cancelar edición
    const cancelEdit = () => {
        setEditingTask(null);
        setTitle('');
        setDescription('');
        setMessage('');
    };

    return (
        <div className="container">
            <h1>Challenge 10 - Tasks</h1>

            {user ? (
                <div className="tasks-section">
                    <h2>Bienvenido</h2>
                    <p>{user.email}</p>

                    <button onClick={logout}>
                        Cerrar sesión
                    </button>

                    <hr />

                    <h2>Mis tareas</h2>

                    <form className="task-form" onSubmit={saveTask}>
                        <input
                            type="text"
                            placeholder="Título de la tarea"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Descripción de la tarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button type="submit" disabled={loading}>
                            {loading
                                ? 'Guardando...'
                                : editingTask
                                    ? 'Guardar cambios'
                                    : 'Crear tarea'}
                        </button>

                        {editingTask && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                            >
                                Cancelar edición
                            </button>
                        )}
                    </form>

                    {message && <p>{message}</p>}

                    <h2>Lista de tareas</h2>

                    {tasks.length === 0 ? (
                        <p>No tienes tareas todavía.</p>
                    ) : (
                        <div className="task-list">
                            {tasks.map((task) => (
                                <div className="task-item" key={task.id}>
                                    <h3>
                                        {task.title}
                                    </h3>

                                    <p>
                                        {task.description || 'Sin descripción'}
                                    </p>

                                    <p>
                                        Estado: {task.is_completed
                                            ? 'Completada'
                                            : 'Pendiente'}
                                    </p>

                                    <button
                                        onClick={() => toggleTask(task)}
                                    >
                                        {task.is_completed
                                            ? 'Marcar pendiente'
                                            : 'Completar'}
                                    </button>

                                    <button
                                        onClick={() => editTask(task)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="auth-form">
                    <h2>Registro e inicio de sesión</h2>

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={register}>Registrarse</button>
                    <button onClick={login}>Iniciar sesión</button>

                    {message && <p>{message}</p>}
                </div>
            )}
        </div>
    );
}

export default App;
