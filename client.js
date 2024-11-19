import { Client } from 'redis-om';

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;

/* create and open the Redis OM Client */
let client;
try {
  client = await new Client().open(url);
} catch (error) {
  console.error('Failed to connect to Redis:', error);
  process.exit(1);
}

export default client;