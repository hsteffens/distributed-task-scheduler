import cron from "node-cron";
import redis from "../redis";
import { Server } from "socket.io";

interface ScheduledJobs {
  [key: string]: cron.ScheduledTask;
}

const scheduledJobs: ScheduledJobs = {};
let server: Server;

/**
 * Schedule a new cron job and persist it in Redis.
 */
export async function scheduleJob(id: string, cronExpression: string, job: string, recurrent: boolean) {
  if (!cron.validate(cronExpression)) {
    throw new Error("Invalid cron expression");
  }

  const task = cron.schedule(cronExpression, async () => {
    console.log(`Executing job ${id}: ${job}`);
    if (!recurrent) {
      fetch(`http://localhost:3000/task-schedule/${id}`, {
        method: 'delete'
      });
    }
    
    // Notify clients via WebSockets
    server.emit("task-executed", { id, job, executed_time: Date.now() });
  }, {
    scheduled: true,
    timezone: "America/Los_Angeles"
  });

  scheduledJobs[id] = task;

  // Save job metadata in Redis
  await redis.hset(`task:${id}`, {
    id,
    cron_expression: cronExpression,
    job,
    recurrent
  });

  console.log(`Job ${id} scheduled: ${cronExpression}`);

}

/**
 * Remove a job from Redis and stop execution.
 */
export async function removeJob(id: string) {
  if (scheduledJobs[id]) {
    scheduledJobs[id].stop();
    //delete scheduledJobs[id];
    await redis.del(`task:${id}`);
    console.log(`Job ${id} removed`);
  }
}

/**
 * Load tasks from Redis at startup.
 */
export async function loadJobsFromRedis(io: Server) {
  server = io;
  const keys = await redis.keys("task:*");
  for (const key of keys) {
    const task = await redis.hgetall(key);
    if (task) {
      await scheduleJob(task.id, task.cron_expression, task.job, task.recurrent === "true");
    }
  }
}
