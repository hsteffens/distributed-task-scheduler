import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import redis from "../redis";
import { scheduleJob, removeJob } from "../scheduler";

const router = Router();

/**
 * Create a new scheduled task
 */
router.post("/", async (req, res) => {
  const { cron_expression, job, recurrent } = req.body;

  if (!cron_expression || !job) {
    res.status(400).json({ error: "Missing cron_expression or job" });
    return;
  }

  try {
    const id = uuidv4();
    await scheduleJob(id, cron_expression, job, recurrent);
    res.status(201).json({ id, cron_expression, job, recurrent });
  } catch (error) {
    res.status(400).json({ error });
  }
});

/**
 * Get all scheduled tasks
 */
router.get("/", async (_, res) => {
  const keys = await redis.keys("task:*");
  const tasks = await Promise.all(keys.map((key) => redis.hgetall(key)));
  res.json(tasks);
});

/**
 * Delete a scheduled task
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const exists = await redis.exists(`task:${id}`);
  if (!exists) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  await removeJob(id);
  res.json({ message: "Task deleted successfully" });
});

export default router;
