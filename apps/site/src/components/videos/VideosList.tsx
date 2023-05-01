import VideoListItem from "~/components/videos/VideoListItem";
import { type Video } from "~/types";

type Props = {
  videos: Video[] | null | undefined;
};

export default function VideoList({ videos }: Props) {
  return videos?.length ? (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-3 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light ">
                <thead className="font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-3 py-2"></th>
                    <th scope="col" className="px-3 py-2">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-2">
                      Channel
                    </th>
                    <th scope="col" className="px-3 py-2 text-end">
                      Views
                    </th>
                    <th scope="col" className="px-3 py-2 text-end">
                      Age
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video, index) => (
                    <VideoListItem
                      key={video.youtubeId}
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
