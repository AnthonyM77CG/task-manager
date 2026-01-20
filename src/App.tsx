import { useEffect, useState } from 'react'
import './App.css'
import type { TaskI } from './types/TaskI'
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState<TaskI[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: 'low' | 'medium' | 'high', category: string, dueDate?: string) => {
    const newTask: TaskI = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      category,
      dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const editTask = (id: number, newTitle: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  // Filtrar tareas
  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return b.id - a.id;
    });

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
              📋 Administrador de Tareas
            </h1>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.active}</div>
                <div className="text-sm text-gray-600">Activas</div>
              </div>
              <div className="bg-green-50 p-3 rounded text-center">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-gray-600">Completadas</div>
              </div>
            </div>

            <TaskForm onAddTask={addTask} />

            {/* Búsqueda y filtros */}
            <div className="mb-4 space-y-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="🔍 Buscar tareas..."
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 rounded ${filter === 'active' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                >
                  Activas
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
                >
                  Completadas
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
                  className="px-4 py-2 border rounded"
                >
                  <option value="date">Ordenar por fecha</option>
                  <option value="priority">Ordenar por prioridad</option>
                </select>

                {stats.completed > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-auto"
                  >
                    Limpiar completadas
                  </button>
                )}
              </div>
            </div>

            {/* Lista de tareas */}
            <ul className="space-y-2">
              {filteredTasks.length === 0 ? (
                <li className="text-center text-gray-400 py-8">
                  {searchTerm ? 'No se encontraron tareas' : 'No hay tareas. ¡Agrega una nueva!'}
                </li>
              ) : (
                filteredTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
