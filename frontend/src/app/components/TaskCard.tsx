import { taskDetail } from "../types/task";

type CardProps = {
  task: taskDetail;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const TaskCard: React.FC<CardProps> = ({ task, onDelete, onEdit }) => {
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
          onClick={() => onEdit(task.id)}
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

export default TaskCard;