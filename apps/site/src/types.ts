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
  recentVideos: number;
  activeChannels: number;
  totalViews: number;
  liveStreams: number;
};
