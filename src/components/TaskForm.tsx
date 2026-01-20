import { useState } from "react";

interface Props {
  onAddTask: (title: string, priority: 'low' | 'medium' | 'high', category: string, dueDate?: string) => void;
}

const TaskForm = ({ onAddTask }: Props) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (title.trim() === "") return;
    onAddTask(title, priority, category || 'General', dueDate || undefined);
    setTitle("");
    setCategory('');
    setDueDate('');
    setPriority('medium');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-6 space-y-3 p-4 bg-gray-50 rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Nueva tarea..."
      />
      
      <div className="grid grid-cols-3 gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="low">🟢 Baja</option>
          <option value="medium">🟡 Media</option>
          <option value="high">🔴 Alta</option>
        </select>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoría"
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-500 text-white py-3 rounded hover:bg-indigo-600 transition font-semibold"
      >
        ➕ Agregar Tarea
      </button>
    </div>
  );
};

export default TaskForm;
