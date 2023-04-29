import { type Video } from "~/types";

type Props = {
  video: Video;
  rank: number;
};

export default function VideoListItem({ video, rank }: Props) {
  return (
    <tr className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
      <td className="w-10 whitespace-nowrap px-6 py-1 font-medium">
        {rank + 1}
      </td>
      <td className="whitespace-nowrap px-6 py-1">
        <a href={`https://youtube.com/watch?v=${video.videoId}`}>
          {video.title}
        </a>
      </td>
      <td className="whitespace-nowrap px-6 py-1">
        <a
          href={
            video?.channelHandle
              ? `https://youtube.com/@${video?.channelHandle}`
              : `https://youtube.com/channel/${video?.channelId || ""}`
          }
        >
          {video.channelName}
        </a>
      </td>
      <td className="whitespace-nowrap px-6 py-1 text-end">
        {Intl.NumberFormat().format(video.views)}
      </td>
    </tr>
  );
}
