// redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config()

const redisClient = createClient({
    password: process.env.PASSREDIS,
    socket: {
        host: process.env.HOSTREDIS,
        port: process.env.PORTREDIS
    }
});
const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
    process.exit(1);
  }
};

export { redisClient, connectRedis };
