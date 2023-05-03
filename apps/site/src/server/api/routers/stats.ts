import { getCacheKey } from "~/cache/cache";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Metrics, type VideoUploadsChartData } from "~/types";

export const statsRouter = createTRPCRouter({
  metrics: publicProcedure.query(async () => getCacheKey<Metrics>("metrics")),
  videoUploads: publicProcedure.query(async () =>
    getCacheKey<VideoUploadsChartData>("videoUploads")
  ),
});
