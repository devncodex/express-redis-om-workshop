import { Client } from 'redis-om'
import { createClient } from 'redis'

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL

/* create a connection to Redis with Node Redis */
export const connection = createClient({ url })
await connection.connect()

/* create a Client and bind it to the Node Redis connection */
const client = await new Client().use(connection)

export default client