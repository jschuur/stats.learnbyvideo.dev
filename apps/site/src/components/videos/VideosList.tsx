import VideoListItem from "~/components/videos/VideoListItem";
import { type Video } from "~/types";

type Props = {
  videos: Video[] | undefined;
};

export default function VideoList({ videos }: Props) {
  return videos?.length ? (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="w-10 px-6 py-2"></th>
                    <th scope="col" className="px-6 py-2">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Channel
                    </th>
                    <th scope="col" className="px-6 py-2 text-end">
                      Views
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video, index) => (
                    <VideoListItem
                      key={video.videoId}
                      video={video}
                      rank={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

{
}
