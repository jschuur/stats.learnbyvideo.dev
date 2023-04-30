import { Card, Tab, TabList } from "@tremor/react";
import { useState } from "react";

import VideoList from "./VideosList";

import { api } from "~/utils/api";

export default function VideoLists() {
  const [videoList, setVideoList] = useState("1");
  const { data: popularVideos } = api.stats.popular.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { data: recentVideos } = api.stats.recent.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <Card>
      <TabList defaultValue="1" value={videoList} onValueChange={setVideoList}>
        <Tab value="1" text="Popular videos" />
        <Tab value="2" text="Recent videos" />
      </TabList>

      {videoList === "1" && <VideoList videos={popularVideos} />}
      {videoList === "2" && <VideoList videos={recentVideos} />}
    </Card>
  );
}
