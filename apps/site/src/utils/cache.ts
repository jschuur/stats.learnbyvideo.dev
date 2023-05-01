import { createClient, type RedisClientType } from "redis";
import superjson from "superjson";

let client: RedisClientType;

export function connectRedis() {
  if (process.env.REDIS_URL === undefined)
    throw new Error("REDIS_URL is undefined");

  client = createClient({ url: process.env.REDIS_URL });

  return client.connect();
}

export async function getCacheKey<T>(key: string): Promise<T | null> {
  if (!client) await connectRedis();
  const cachedValue = await client.get(key);

  return cachedValue ? superjson.parse<{ data: T }>(cachedValue)?.data : null;
}
