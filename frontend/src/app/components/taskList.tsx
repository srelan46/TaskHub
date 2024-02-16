import React, { useEffect, useState } from "react";
import { taskDetail } from "../types/task";
import TaskCard from "./TaskCard";

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
        credentials: "include",
      });
      const res = await response.json();
      if (response.status === 404) {
        throw new Error(res.message);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const res = await response.json();
      if (response.status === 404) {
        throw new Error(res.message);
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Edit error: ", error);
    }
  };
  return (
    <div className="pl-32 flex flex-wrap">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
