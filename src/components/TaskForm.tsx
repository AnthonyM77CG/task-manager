import { useState } from "react";

interface Props {
  onAddTask: (title: string) => void;
}

const TaskForm = ({ onAddTask }: Props) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") return;
    onAddTask(title);
    setTitle("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 flex-1 rounded"
        placeholder="Nueva tarea"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
      >
        +
      </button>
    </div>
  );
};

export default TaskForm;
