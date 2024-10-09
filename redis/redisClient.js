// redisClient.js
import { createClient } from 'redis';

const redisClient = redis.createClient({
  url: 'redis://username:password@13.228.225.19:6379', // Thay đổi với thông tin thực tế
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
