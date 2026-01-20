import { useState } from 'react'
import './App.css'
import type { TaskI } from './types/TaskI'
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState<TaskI[]>([]);

  const addTask = (title: string) => {
    const newTask: TaskI = {
      id: Date.now(),
      title,
      completed: false,
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

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Administrador de tareas
        </h1>

        <TaskForm onAddTask={addTask} />

        <ul className="space-y-2">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
