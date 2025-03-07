import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { io } from "socket.io-client";

const queryClient = new QueryClient();

const socket = io("http://localhost:3000");

export default function App() {
  useEffect(() => {
    socket.on("task-executed", ({ id, job, executed_time}) => {
      toast.success(`Task ${id} executed at ${executed_time} with content: ${job}`);
    });

    return () => {
      socket.off("task-executed");
    };
  }, []);
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
