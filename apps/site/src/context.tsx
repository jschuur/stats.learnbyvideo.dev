import { createContext, useState } from "react";

import type { Metrics, Video, VideoUploadsChartData } from "~/types";

export const appContext = createContext({} as AppContext);

export type AppContext = {
  metrics: Metrics | null;
  setMetrics: (metrics: Metrics | null) => void;
  videoUploads: VideoUploadsChartData | null;
  setVideoUploads: (videoUploads: VideoUploadsChartData | null) => void;
  recentVideos: Video[] | null;
  setRecentVideos: (recentVideos: Video[] | null) => void;
  popularVideos: Video[] | null;
  setPopularVideos: (popularVideos: Video[] | null) => void;
};

type Props = {
  children: React.ReactNode;
};

export function AppContextProvider({ children }: Props) {
  const [metrics, setMetrics] = useState<Metrics>({} as Metrics);
  const [videoUploads, setVideoUploads] = useState<VideoUploadsChartData>([]);
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [popularVideos, setPopularVideos] = useState<Video[]>([]);

  const store = {
    metrics,
    setMetrics,
    videoUploads,
    setVideoUploads,
    recentVideos,
    setRecentVideos,
    popularVideos,
    setPopularVideos,
  };
  return (
    <appContext.Provider value={store as AppContext}>
      {children}
    </appContext.Provider>
  );
}
