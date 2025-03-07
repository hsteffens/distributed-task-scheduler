export interface ApiTask {
  id: string;
  cron_expression: string;
  job: string;
  recurrent: boolean;
}

export interface Task {
    id: string;
    cron: string;
    command: string;
    recurrent: string;
}