import kv from "@vercel/kv";
import prettyMilliseconds from "pretty-ms";
import { createClient, type RedisClientType } from "redis";
import superjson from "superjson";
import { type SuperJSONResult } from "superjson/dist/types.js";

import {
  getMetrics,
  getPopularVideos,
  getRecentVideos,
  getVideoUploads,
} from "~/cache/queries";
import type { CacheData, Metrics, Video, VideoUploadsChartData } from "~/types";

let client: RedisClientType;

export function connectRedis() {
  client = createClient({ url: process.env.REDIS_URL });

  return client.connect();
}

export async function quitRedis() {
  if (client) await client.quit();
}

async function updateField<T>(field: string, getter: () => Promise<T>) {
  const startTime = Date.now();

  process.stdout.write(`Querying ${field}...`);
  const data = await getter();

  const endTime = Date.now();
  const timeSpent = endTime - startTime;
  console.log(`Done (${prettyMilliseconds(timeSpent)})`);

  if (
    data === null ||
    typeof data === "undefined" ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === "object" && Object.keys(data).length === 0)
  ) {
    console.log(
      `Query returned ${JSON.stringify(data)} for ${field}, skipping\n`
    );

    return;
  }

  const value = {
    _queryTime: endTime - startTime,
    _lastUpdated: endTime,
    data,
  };

  console.log(`Saving ${field}...`);
  await kv.set(field, superjson.stringify(value));

  console.log(`${field} set\n`);
}

export async function updateCache() {
  try {
    console.log("Updating cache...\n");

    await updateField<Metrics>("metrics", getMetrics);
    await updateField<VideoUploadsChartData>("videoUploads", getVideoUploads);
    await updateField<Video[]>("popularVideos", getPopularVideos);
    await updateField<Video[]>("recentVideos", getRecentVideos);

    console.log("Done");
  } catch (e) {
    console.error(e);
  }
}

export async function getCacheKey<T>(key: string): Promise<T | null> {
  const cachedValue = await kv.get<SuperJSONResult>(key);

  const res = cachedValue
    ? superjson.deserialize<CacheData & { data: T }>(cachedValue).data
    : null;
  return res;
}
