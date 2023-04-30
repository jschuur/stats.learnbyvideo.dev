import { Grid } from "@tremor/react";

import ActiveChannelsCard from "~/components/cards/ActiveChannelsCard";
import LiveStreamsCard from "~/components/cards/LiveStreamsCard";
import RecentVideoCard from "~/components/cards/RecentVideoCard";
import TotalViewsCard from "~/components/cards/TotalViewsCard";
import VideoUploadsChart from "~/components/charts/VideosUploadsChart";
import TimeframeSelect from "~/components/ui/TimeframeSelect";
import VideoLists from "~/components/videos/Videos";

import { api } from "~/utils/api";

export default function Dashboard() {
  const { data: metrics } = api.stats.metrics.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { data: videoUploads } = api.stats.videoUploads.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col">
      <div className="ml-auto">
        <TimeframeSelect />
      </div>
      <Grid numColsLg={4} numCols={2} className="mt-6 gap-6">
        <RecentVideoCard count={metrics?.recentVideos} />
        <ActiveChannelsCard count={metrics?.activeChannels} />
        <TotalViewsCard count={metrics?.totalViews} />
        <LiveStreamsCard count={metrics?.liveStreams} />
      </Grid>

      <div className="mt-6">
        <VideoUploadsChart chartData={videoUploads} />
      </div>

      <div className="mt-6">
        <VideoLists />
      </div>
    </div>
  );
}
