import React from 'react';
import { taskDetail } from './task';

type CardProps = {
  task: taskDetail;
};

export const TaskCard: React.FC<CardProps> = ({ task }) => {
  const dueDate = new Date(task.due_date);
  const createDate = new Date(task.created_at);
  
  const handleDelete = async () => {
    console.log(task.id);
    try {
      const response = await fetch('http://localhost:5000/tasks/${task.id}', {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      window.location.reload();
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };
  return (
    <div className={`bg-white text-black rounded-lg shadow p-4 m-2 ${task.completed ? 'bg-green-100' : 'hover:bg-blue-100'}`}>
      <div className="flex justify-between item   ` s-center">
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p className="text-sm font-bold">{task.username}</p>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <div>
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
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="text-xs mt-2">
        <p>Due: {dueDate.toLocaleDateString()}</p>
        <p>Created: {createDate.toLocaleDateString()}</p>
        <p className={`${task.completed ? 'text-green-700' : 'text-red-700'}`}>
          {task.completed ? 'Completed' : 'Not Completed'}
        </p>
      </div>
    </div>
  );
};
