import 'dotenv/config';

import { connectRedis, updateField } from './lib.js';
import { getMetrics, getPopularVideos, getRecentVideos, getVideoUploads } from './queries.js';

(async () => {
  try {
    await connectRedis();
    console.log('Updating cache...\n');

    await updateField('metrics', getMetrics);
    await updateField('videoUploads', getVideoUploads);
    await updateField('popularVideos', getPopularVideos);
    await updateField('recentVideos', getRecentVideos);

    const url = `${process.env.NEXTAUTH_URL}/api/update?secret=${process.env.REVALIDATE_SECRET_TOKEN}`;
    console.log('Revalidating homepage... ');
    await fetch(url);

    console.log('Done');

    process.exit(0);
  } catch (e) {
    console.error(e);

    process.exit(1);
  }
})();
