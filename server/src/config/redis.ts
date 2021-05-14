import redis from 'redis'
import dotenv from 'dotenv'
dotenv.config()
// heroku config
// const REDIS_PORT:any = process.env.REDIS_URL || 6379;
const __prod__ = process.env.NODE_ENV === "production"
// redis cloud service config
const REDIS_PORT:any = __prod__ && process.env.REDIS_PORT
const REDIS_HOST:any = __prod__ && process.env.REDIS_HOST
const REDIS_PASSWORD:any = __prod__ && process.env.REDIS_PASSWORD
const client = redis.createClient({
  host:REDIS_HOST,
  port:REDIS_PORT,
  password : REDIS_PASSWORD
});

client.on("error", function(error) {
  console.error(error);
});

export default client;
