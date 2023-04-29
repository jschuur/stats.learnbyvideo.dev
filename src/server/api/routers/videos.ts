import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const videos = [
  {
    title: "We Fixed Environment Variables",
    videoId: "UnDw3_7_9gc",
    channelName: "Theo - t3․gg",
    channelHandle: "t3dotgg",
    views: 21755,
  },
  {
    title: "Are New Frameworks Replacing React?",
    videoId: "_Wkg3s8_75w",
    channelName: "Web Dev Simplified",
    channelHandle: "WebDevSimplified",
    views: 154046,
  },
  {
    title: "Why I'm Using Express Instead of NextJS",
    videoId: "6xvLUWpCSFM",
    channelName: "Josh tried coding",
    channelHandle: "joshtriedcoding",
    views: 11031,
  },
  {
    title: "I finally found a great use-case for flex-basis!",
    videoId: "JD4ws4cY1ro",
    channelName: "Kevin Powell",
    channelHandle: "KevinPowell",
    views: 22419,
  },
];

export const videosRouter = createTRPCRouter({
  popular: publicProcedure.query(() => {
    return videos;
  }),
  recent: publicProcedure.query(() => {
    return videos;
  }),
});
