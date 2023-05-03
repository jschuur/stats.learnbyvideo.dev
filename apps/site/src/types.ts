export type Video = {
  title: string;
  youtubeId: string;
  channel: {
    channelName: string;
    youtubeId?: string;
    channelHandle?: string;
  };
  viewCount: number;
  publishedAt: Date;
};

export type VideoUploadsChartData = Array<{
  date: string;
  Uploads: number;
}>;

export type Metrics = {
  _lastUpdated: Date;
  recentVideos: number | undefined;
  activeChannels: number | undefined;
  totalViews: number | undefined;
  liveStreams: number | undefined;
};

export type CacheData = {
  _queryTime: number;
  _lastUpdated: number;
  data: unknown;
};
