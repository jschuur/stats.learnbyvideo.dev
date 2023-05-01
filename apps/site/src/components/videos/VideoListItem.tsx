import ReactTimeAgo from "react-time-ago";

import { type Video } from "~/types";
import { truncateAt } from "~/utils/utils";

type Props = {
  video: Video;
  rank: number;
};

import { CHANNEL_NAME_TRUNCATE_LENGTH, TITLE_TRUNCATE_LENGTH } from "~/config";

export default function VideoListItem({ video, rank }: Props) {
  return (
    <tr className="transition duration-300 ease-in-out hover:bg-neutral-100">
      <td className="whitespace-nowrap px-3 py-1 text-end align-top">
        {rank + 1}
      </td>
      <td className="px-3 py-1 align-top">
        <a href={`https://youtube.com/watch?v=${video.youtubeId}`}>
          {truncateAt(TITLE_TRUNCATE_LENGTH, video.title)}
        </a>
      </td>
      <td className="px-3 py-1 align-top">
        <a
          href={
            video?.channel.channelHandle
              ? `https://youtube.com/@${video.channel?.channelHandle}`
              : `https://youtube.com/channel/${video.channel?.youtubeId || ""}`
          }
        >
          {truncateAt(CHANNEL_NAME_TRUNCATE_LENGTH, video.channel.channelName)}
        </a>
      </td>
      <td className="whitespace-nowrap px-3 py-1 text-end align-top tabular-nums">
        {Intl.NumberFormat().format(video.viewCount)}
      </td>
      <td className="whitespace-nowrap px-3 py-1 text-end align-top">
        <ReactTimeAgo
          date={video.publishedAt}
          locale="en-US"
          timeStyle={"mini"}
        />
      </td>
    </tr>
  );
}
