import { Task } from "../../types/task";
import "./TaskItem.css";

export default function TaskItem({ task, onDelete }: {
  task: Task;
  onDelete: () => void;
}) {
  return (
    <div className="task-item">
      {/* Command - Cron */}
      <div className="task-info">
        <span className="task-command">{task.command}</span>
        <span className="task-separator">-</span>
        <span className="task-cron">{task.cron}</span>
      </div>

      {/* Delete Button */}
      <button className="delete-button" onClick={onDelete}>
        DELETE
      </button>
    </div>
  );
}
