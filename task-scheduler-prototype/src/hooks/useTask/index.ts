import { useState, FormEvent } from "react";

import { createTask } from "../../services/scheduledTasks"; 
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTask = () => {
    const [cron, setCron] = useState<string>("");
    const [command, setCommand] = useState<string>("");
    const [recurrent, setReccurent] = useState<boolean>(false);
    const [scheduledDate, setScheduledDate] = useState<string>("");
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: createTask,
      onSuccess: () => {
        toast.success("Task created successfully!");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: () => toast.error("Failed to create task."),
    });
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!command || ((recurrent && !cron) || (!recurrent && !scheduledDate))) {
        return toast.warn("All fields are required!");
      }
      
      const scheduled = recurrent ? cron : convertDateTimeToCron(scheduledDate);
      mutation.mutate({ id: '', cron: scheduled, command, recurrent: `${recurrent}` });
      setCron("");
      setCommand("");
    };
  
    const setCronValue = (value: string) => {
      setCron(value);
    };
  
    const setCommandValue = (value: string) => {
      setCommand(value);
    };

    const setReccurentValue = (value: boolean) => {
        setReccurent(value);
    };

    const setScheduledDateValue = (value: string) => {
      setScheduledDate(value);
  };
  
  return {
    cron,
    command,
    recurrent,
    scheduledDate,
    handleSubmit,
    setCronValue,
    setCommandValue,
    setReccurentValue,
    setScheduledDateValue,
  };
};



function convertDateTimeToCron(dateTime: string) {
  const date = new Date(dateTime);

  const minutes = date.getMinutes();
  const hours = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;

  return `${minutes} ${hours} ${dayOfMonth} ${month} *`;
}