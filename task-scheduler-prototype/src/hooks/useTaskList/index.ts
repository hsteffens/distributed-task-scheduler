import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask } from "../../services/scheduledTasks"; 
import { toast } from "react-toastify";

export const useTaskList = () => {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    refetchInterval: 30000, 
  });

  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => toast.error("Failed to delete task."),
  });

  return {
    tasks,
    isLoading,
    error,
    deleteTask: (taskId: string) => mutation.mutate(taskId),
  };
};
