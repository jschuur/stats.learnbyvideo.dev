import millify from "millify";
import ReactTimeAgo from "react-time-ago";

import VideoThumbnail from "~/components/videos/VideoThumbnail";

import { type Video } from "~/types";

type Props = {
  video: Video;
};

export default function VideoCard({ video }: Props) {
  return (
    <a
      className="text-slate-700  visited:text-slate-700 hover:text-slate-700"
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
    >
      <div className="w-min-[240] flex h-full w-full flex-col">
        <div className="">
          <VideoThumbnail
            youtubeId={video.youtubeId}
            alt="YouTube video thumbnail"
          />
        </div>
        <div className="my-2 flex-grow text-xs  md:text-sm">
          <b>{video.channel.channelName}</b>: {video.title}
        </div>
        <div className="text-end text-xs font-light text-slate-500  visited:text-slate-500 hover:text-slate-500">
          <ReactTimeAgo date={video.publishedAt} locale="en-US" />,{" "}
          {millify(video.viewCount, { lowercase: true })} views
        </div>
      </div>
    </a>
  );
}
