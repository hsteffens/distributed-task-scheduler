import cors from "cors";
import express from "express";
import tasks from "./routes/tasks";
import { loadJobsFromRedis } from "./scheduler";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/task-schedule', tasks);

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// Load persisted jobs
loadJobsFromRedis(io).then(() => console.log("Loaded jobs from Redis"));

server.listen(PORT, () => {
  console.log(`Task Scheduler running at http://localhost:${PORT}`);
});
