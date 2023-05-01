import ReactTimeAgo from "react-time-ago";

import { api } from "~/utils/api";

export default function Footer() {
  const { data: metrics } = api.stats.metrics.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return (
    <footer className="mt-10 text-center text-sm font-light">
      <div>
        From <a href="https://twitter.com/joostschuur">Joost Schuur</a> &middot;{" "}
        <a href="https://twitter.com/learnbyvideodev">@learnbyvideodev</a>{" "}
        &middot;{" "}
        <a href="https://github.com/jschuur/stats.learnbyvideo.dev">GitHub</a>
      </div>
      <div>
        Powered by <a href="https://tinybird.co">Tinybird</a>,{" "}
        <a href="https://tremor.so">Tremor</a>,{" "}
        <a href="https://create.t3.gg/">T3</a>,{" "}
        <a href="https://sst.dev">SST</a> and{" "}
        <a href="https://nextjs.org/">Next.js</a>
      </div>
      {metrics?._lastUpdated && (
        <div>
          Last updated:{" "}
          <ReactTimeAgo date={metrics._lastUpdated} locale="en-US" />
        </div>
      )}
    </footer>
  );
}
