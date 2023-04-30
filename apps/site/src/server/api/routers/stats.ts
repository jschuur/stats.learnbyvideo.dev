import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const TIMEFRAME_DAYS = 7;

const ACTIVE_CHANNELS_QUERY = `
SELECT COUNT(DISTINCT "public"."Video"."channelId")
FROM "public"."Video"
WHERE DATE("publishedAt") > NOW() - INTERVAL '${TIMEFRAME_DAYS} days'`;

const VIDEO_UPLOADS_QUERY = `
SELECT
	date_trunc('hour', "publishedAt") AS date,
	COUNT(*)::INTEGER
FROM
	"Video"
WHERE
	DATE("publishedAt") > NOW() - INTERVAL '${TIMEFRAME_DAYS} days'
GROUP BY
	date_trunc('hour', "publishedAt")
ORDER BY
	date ASC`;

type CountResult = [{ count: number }];
type UploadResult = [{ date: Date; count: number }];

export const statsRouter = createTRPCRouter({
  metrics: publicProcedure.query(async ({ ctx }) => {
    const where = {
      publishedAt: {
        gte: new Date(
          (new Date() as unknown as number) -
            60 * 60 * 24 * TIMEFRAME_DAYS * 1000
        ),
      },
    };

    const recentVideos = await ctx.prisma.video.count({ where });
    const activeChannels = (
      await ctx.prisma.$queryRawUnsafe<CountResult>(ACTIVE_CHANNELS_QUERY)
    )?.[0]?.count;

    const totalViews =
      (
        await ctx.prisma.video.aggregate({
          where,
          _sum: {
            viewCount: true,
          },
        })
      )?._sum.viewCount || undefined;
    const liveStreams = await ctx.prisma.video.count({
      where: { ...where, actualStartTime: { not: null } },
    });

    return {
      recentVideos,
      activeChannels,
      totalViews,
      liveStreams,
    };
  }),
  videoUploads: publicProcedure.query(async ({ ctx }) => {
    const uploads = await ctx.prisma.$queryRawUnsafe<UploadResult>(
      VIDEO_UPLOADS_QUERY
    );

    return uploads.map((d) => ({
      date: d.date.toISOString().replace("T", " ").replace(".000Z", ""),
      Uploads: d.count,
    }));
  }),
  popular: publicProcedure.query(({ ctx }) =>
    ctx.prisma.video.findMany({
      where: {
        publishedAt: {
          gte: new Date(
            (new Date() as unknown as number) - 60 * 60 * 24 * 7 * 1000
          ),
        },
      },
      orderBy: {
        viewCount: "desc",
      },
      select: {
        title: true,
        youtubeId: true,
        viewCount: true,
        publishedAt: true,
        channel: {
          select: {
            channelName: true,
            youtubeId: true,
          },
        },
      },
      take: 100,
    })
  ),
  recent: publicProcedure.query(({ ctx }) =>
    ctx.prisma.video.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        title: true,
        youtubeId: true,
        viewCount: true,
        publishedAt: true,
        channel: {
          select: {
            channelName: true,
            youtubeId: true,
          },
        },
      },
      take: 100,
    })
  ),
});
