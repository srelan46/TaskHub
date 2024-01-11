import React from 'react';
import { taskDetail } from './task';

// Define the props based on the taskDetail type
type CardProps = {
  task: taskDetail;
};


export const TaskCard: React.FC<CardProps> = ({ task }) => {
  const dueDate = new Date(task.due_date);
  const createDate = new Date(task.created_at);
  return (
    <div className={`bg-white text-black rounded-lg shadow p-4 m-2 ${task.completed ? 'bg-green-100' : 'hover:bg-blue-100'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">{task.title}</h3>
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
            onClick={(e) => {
              e.stopPropagation(); 
            }}
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
