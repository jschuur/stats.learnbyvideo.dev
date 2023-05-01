import prettyMilliseconds from 'pretty-ms';
import { createClient, type RedisClientType } from 'redis';
import superjson from 'superjson';

let client: RedisClientType;

export function connectRedis() {
  client = createClient({ url: process.env.REDIS_URL });

  return client.connect();
}

export async function quitRedisAndExit(exitCode: number) {
  if (client) await client.quit();

  process.exit(exitCode);
}

export async function updateField(field: string, getter: () => Promise<any>) {
  const startTime = Date.now();

  process.stdout.write(`Querying ${field}...`);
  const data = await getter();

  const endTime = Date.now();
  const timeSpent = endTime - startTime;
  console.log(`Done (${prettyMilliseconds(timeSpent)})`);

  if (
    data === null ||
    typeof data === 'undefined' ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'object' && Object.keys(data).length === 0)
  ) {
    console.log(`Query returned ${JSON.stringify(data)} for ${field}, skipping\n`);

    return;
  }

  const value = {
    _queryTime: endTime - startTime,
    _lastUpdated: endTime,
    data,
  };

  console.log(`Saving ${field}...`);
  await client.set(field, superjson.stringify(value));

  console.log(`${field} set\n`);
}

export const getField = async (field: string) => superjson.parse((await client.get(field)) || '');
