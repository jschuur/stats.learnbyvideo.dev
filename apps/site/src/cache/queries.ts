import { prisma } from "@statslearnbyvideodev/db";
import type { Metrics, Video, VideoUploadsChartData } from "~/types";

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

export async function getMetrics(): Promise<Metrics> {
  const where = {
    publishedAt: {
      gte: new Date(
        (new Date() as unknown as number) - 60 * 60 * 24 * TIMEFRAME_DAYS * 1000
      ),
    },
  };

  const recentVideos = (await prisma.video.count({ where })) || undefined;
  const activeChannels =
    (await prisma.$queryRawUnsafe<CountResult>(ACTIVE_CHANNELS_QUERY))?.[0]
      ?.count || undefined;

  const totalViews =
    (
      await prisma.video.aggregate({
        where,
        _sum: {
          viewCount: true,
        },
      })
    )?._sum.viewCount || undefined;
  const liveStreams =
    (await prisma.video.count({
      where: { ...where, actualStartTime: { not: null } },
    })) || undefined;

  return {
    _lastUpdated: new Date(),
    recentVideos,
    activeChannels,
    totalViews,
    liveStreams,
  };
}

export async function getVideoUploads(): Promise<VideoUploadsChartData> {
  const uploads = await prisma.$queryRawUnsafe<UploadResult>(
    VIDEO_UPLOADS_QUERY
  );

  return uploads.map((d) => ({
    date: d.date.toISOString().replace("T", " ").replace(".000Z", ""),
    Uploads: d.count,
  }));
}

export const getPopularVideos = () =>
  prisma.video.findMany({
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
  }) as Promise<Video[]>;

export async function getRecentVideos(): Promise<Video[]> {
  return prisma.video.findMany({
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
  }) as Promise<Video[]>;
}
