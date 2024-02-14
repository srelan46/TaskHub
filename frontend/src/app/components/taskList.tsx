import React, { useEffect, useState } from "react";
import { taskDetail } from "./task";

type CardProps = {
  task: taskDetail;
  onDelete: (id: number) => void;
};

const TaskCard: React.FC<CardProps> = ({ task, onDelete }) => {
  const dueDate = new Date(task.due_date).toLocaleDateString();
  const createDate = new Date(task.created_at).toLocaleDateString();

  return (
    <div
      className={`bg-white text-black rounded-lg shadow p-4 m-2 ${
        task.completed ? "bg-green-100" : "hover:bg-blue-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p className="text-sm font-bold">{task.username}</p>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <button
          className="text-xs font-semibold text-blue-500 hover:text-blue-700 mr-2"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Edit
        </button>
        <button
          className="text-xs font-semibold text-red-500 hover:text-red-700"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
      <div className="text-xs mt-2">
        <p>Due: {dueDate}</p>
        <p>Created: {createDate}</p>
        <p className={`${task.completed ? "text-green-700" : "text-red-700"}`}>
          {task.completed ? "Completed" : "Not Completed"}
        </p>
      </div>
    </div>
  );
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<taskDetail[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:5000/alltasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="pl-32 pt-10 flex flex-wrap">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskList;