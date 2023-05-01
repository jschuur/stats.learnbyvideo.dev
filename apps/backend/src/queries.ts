import { prisma } from '@statslearnbyvideodev/db';

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

export async function getMetrics() {
  const where = {
    publishedAt: {
      gte: new Date((new Date() as unknown as number) - 60 * 60 * 24 * TIMEFRAME_DAYS * 1000),
    },
  };

  const recentVideos = await prisma.video.count({ where });
  const activeChannels = (await prisma.$queryRawUnsafe<CountResult>(ACTIVE_CHANNELS_QUERY))?.[0]
    ?.count;

  const totalViews =
    (
      await prisma.video.aggregate({
        where,
        _sum: {
          viewCount: true,
        },
      })
    )?._sum.viewCount || undefined;
  const liveStreams = await prisma.video.count({
    where: { ...where, actualStartTime: { not: null } },
  });

  return {
    recentVideos,
    activeChannels,
    totalViews,
    liveStreams,
  };
}
export async function getVideoUploads() {
  const uploads = await prisma.$queryRawUnsafe<UploadResult>(VIDEO_UPLOADS_QUERY);

  return uploads.map((d) => ({
    date: d.date.toISOString().replace('T', ' ').replace('.000Z', ''),
    Uploads: d.count,
  }));
}

export const getPopularVideos = () =>
  prisma.video.findMany({
    where: {
      publishedAt: {
        gte: new Date((new Date() as unknown as number) - 60 * 60 * 24 * 7 * 1000),
      },
    },
    orderBy: {
      viewCount: 'desc',
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
  });

export async function getRecentVideos() {
  return prisma.video.findMany({
    orderBy: {
      publishedAt: 'desc',
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
  });
}
