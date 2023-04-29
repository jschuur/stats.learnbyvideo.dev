import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const videoUploadData = [
  {
    date: "2023-01-01",
    Uploads: 174,
  },
  {
    date: "2023-01-02",
    Uploads: 180,
  },
  {
    date: "2023-01-03",
    Uploads: 210,
  },
  {
    date: "2023-01-04",
    Uploads: 197,
  },
  {
    date: "2023-01-05",
    Uploads: 258,
  },
  {
    date: "2023-01-06",
    Uploads: 207,
  },
  {
    date: "2023-01-07",
    Uploads: 223,
  },
];

const cardStats = {
  recentVideos: 12345,
  activeChannels: 345,
  totalViews: 12345678,
  liveStreams: 68,
};

export const statsRouter = createTRPCRouter({
  metrics: publicProcedure.query(() => cardStats),
  videoUploads: publicProcedure.query(() => videoUploadData),
});
