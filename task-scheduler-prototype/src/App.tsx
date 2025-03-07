import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4 max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">Task Scheduler</h1>
        <TaskForm />
        <TaskList />
      </div>
      <ToastContainer position="top-right" />
    </QueryClientProvider>
  );
}
