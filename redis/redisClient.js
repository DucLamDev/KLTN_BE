// redisClient.js
import { createClient } from 'redis';

const redisClient = createClient();

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
