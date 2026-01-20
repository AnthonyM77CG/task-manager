import { useState } from "react";
import type { TaskI } from "../types/TaskI";

interface Props {
  task: TaskI;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText);
      setIsEditing(false);
    }
  };

  const priorityColors = {
    high: 'border-l-4 border-red-500 bg-red-50',
    medium: 'border-l-4 border-yellow-500 bg-yellow-50',
    low: 'border-l-4 border-green-500 bg-green-50',
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <li className={`flex items-center gap-3 p-3 rounded ${priorityColors[task.priority]} ${task.completed ? 'opacity-60' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 cursor-pointer"
      />

      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
            className="w-full border p-1 rounded"
            autoFocus
          />
        ) : (
          <div>
            <span
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {task.title}
            </span>
            <div className="flex gap-2 mt-1 text-xs text-gray-500">
              <span className="bg-white px-2 py-1 rounded">{task.category}</span>
              {task.dueDate && (
                <span className={`px-2 py-1 rounded ${isOverdue ? 'bg-red-200 text-red-700' : 'bg-white'}`}>
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="text-blue-500 hover:text-blue-700 px-2"
      >
        ✏️
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 px-2"
      >
        🗑️
      </button>
    </li>
  );
};

export default TaskItem;