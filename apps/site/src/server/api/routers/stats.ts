import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Metrics, type VideoUploadsChartData } from "~/types";
import { getCacheKey } from "~/utils/cache";

export const statsRouter = createTRPCRouter({
  metrics: publicProcedure.query(async () => getCacheKey<Metrics>("metrics")),
  videoUploads: publicProcedure.query(async () =>
    getCacheKey<VideoUploadsChartData>("videoUploads")
  ),
});
