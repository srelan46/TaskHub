import React, { useEffect, useState } from 'react';
import { TaskCard } from './taskCard';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/alltasks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="pl-32 pt-10 flex flex-wrap">
      {tasks.map((task) => (
        <TaskCard task={task} />
      ))}
    </div>
  );
};

export default TaskList;
