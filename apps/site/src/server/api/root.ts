import { statsRouter } from "~/server/api/routers/stats";
import { videosRouter } from "~/server/api/routers/videos";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  stats: statsRouter,
  videos: videosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
