import cors from "cors";
import express from "express";
import tasks from "./routes/tasks";
import { loadJobsFromRedis } from "./scheduler";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/task-schedule', tasks);

// Load persisted jobs
loadJobsFromRedis().then(() => console.log("Loaded jobs from Redis"));

app.listen(PORT, () => {
  console.log(`Task Scheduler running at http://localhost:${PORT}`);
});
