import kv from "@vercel/kv";
import prettyMilliseconds from "pretty-ms";
import superjson from "superjson";
import { type SuperJSONResult } from "superjson/dist/types.js";

import {
  getMetrics,
  getPopularVideos,
  getRecentVideos,
  getVideoUploads,
} from "~/cache/queries";
import type { CacheData, Metrics, Video, VideoUploadsChartData } from "~/types";

export async function setCacheKey<T>(key: string, getter: () => Promise<T>) {
  const startTime = Date.now();

  process.stdout.write(`Querying ${key}...`);
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
      `Query returned ${JSON.stringify(data)} for ${key}, skipping\n`
    );

    return;
  }

  const value = {
    _queryTime: endTime - startTime,
    _lastUpdated: endTime,
    data,
  };

  console.log(`Saving ${key}...`);
  await kv.set(`${key}:${process.env.NODE_ENV}`, superjson.serialize(value));

  console.log(`${key} set\n`);
}

export async function getCacheKey<T>(key: string): Promise<T | null> {
  // kv.get already returns the parsed JSON
  const cachedValue = await kv.get<SuperJSONResult>(
    `${key}:${process.env.NODE_ENV}`
  );

  const res = cachedValue
    ? superjson.deserialize<CacheData & { data: T }>(cachedValue).data
    : null;
  return res;
}

export async function updateCache() {
  try {
    console.log("Updating cache...\n");

    await setCacheKey<Metrics>("metrics", getMetrics);
    await setCacheKey<VideoUploadsChartData>("videoUploads", getVideoUploads);
    await setCacheKey<Video[]>("popularVideos", getPopularVideos);
    await setCacheKey<Video[]>("recentVideos", getRecentVideos);

    console.log("Done");
  } catch (e) {
    console.error(e);
  }
}
