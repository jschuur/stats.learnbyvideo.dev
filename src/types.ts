export type Video = {
  title: string;
  videoId: string;
  channelName: string;
  channelId?: string;
  channelHandle?: string;
  views: number;
  // releaseDate: string;
};

export type VideoUploadsChartData = Array<{
  date: string;
  Uploads: number;
}>;
