import { useTaskList } from "../../hooks/useTaskList";
import { Task } from "../../types/task";
import TaskItem from "../TaskItem";

export default function TaskList() {
  const { tasks, isLoading, error, deleteTask } = useTaskList();

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks</p>;

  return (
    <div>
      {tasks?.map((task: Task) => (
        <TaskItem key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
      ))}
    </div>
  );
}