import axios from "axios";
import { ApiTask, Task } from "../types/task";

const API_URL = "http://localhost:3000/task-schedule";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return  response.data.map(transformApiTask);;
};

export const createTask = async (task: Task) => {
  const response = await axios.post(API_URL, transformTask(task));
  return response.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};


function transformApiTask(apiTask: ApiTask): Task {
    return {
      id: apiTask.id,
      cron: apiTask.cron_expression,
      command: apiTask.job,
      recurrent: `${apiTask.recurrent}`,
    };
}

function transformTask(task: Task): ApiTask {
  return {
    id: task.id,
    cron_expression: task.cron,
    job: task.command,
    recurrent: task.recurrent === 'true',
  };
}