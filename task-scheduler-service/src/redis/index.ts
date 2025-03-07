import Redis from "ioredis";

const PORT = process.env.PORT && parseInt(process.env.PORT) || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "localhost";

const redis = new Redis({
  host: REDIS_HOST,
  port: PORT
});

redis.on("connect", () => console.log("Connected to Redis"));
redis.on("error", (err) => console.error("Redis error:", err));

export default redis;
