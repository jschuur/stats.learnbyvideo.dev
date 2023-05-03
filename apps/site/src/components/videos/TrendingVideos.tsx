import { Card, Title } from "@tremor/react";
import { sortBy } from "lodash";

import {
  MAX_TRENDING_AGE_MINUTES,
  MAX_TRENDING_VIEWS,
  MIN_TRENDING_AGE_MINUTES,
  MIN_TRENDING_VIEWS,
  TRENDING_INITIAL_VIDEO_COUNT,
} from "~/config";
import { type Video } from "~/types";
import { api } from "~/utils/api";

import { useMemo } from "react";
import VideoCard from "~/components/videos/VideoCard";

function filterTrendingVideos(
  videos: Video[] | null | undefined
): Video[] | null {
  const videoAgeMinutes = (video: Video) =>
    (Date.now() - video.publishedAt.getTime()) / (1000 * 60);

  const qualifiesTrending = (video: Video) => {
    const videoAge = videoAgeMinutes(video);

    return (
      video.viewCount >= MIN_TRENDING_VIEWS &&
      video.viewCount <= MAX_TRENDING_VIEWS &&
      videoAge >= MIN_TRENDING_AGE_MINUTES &&
      videoAge <= MAX_TRENDING_AGE_MINUTES
    );
  };

  return videos?.length
    ? sortBy(
        videos.filter(qualifiesTrending),
        (video) => video.viewCount / videoAgeMinutes(video)
      ).reverse()
    : null;
}

export default function VideoLists() {
  const { data: popularVideos } = api.videos.popular.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const trendingVideos = useMemo(
    () => filterTrendingVideos(popularVideos),
    [popularVideos]
  );

  if (!popularVideos) return null;

  return (
    <Card className="mt-6">
      <Title>Trending</Title>
      <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {trendingVideos &&
          trendingVideos
            .slice(0, TRENDING_INITIAL_VIDEO_COUNT)
            .map((video: Video) => (
              <span key={video.youtubeId} className="">
                <VideoCard key={video.youtubeId} video={video} />
              </span>
            ))}
      </div>
    </Card>
  );
}
