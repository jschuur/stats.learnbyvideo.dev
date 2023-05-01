import 'dotenv/config';

import { connectRedis, getField } from './lib.js';

(async () => {
  try {
    await connectRedis();

    console.log(await getField('popularVideos'));
    console.log(await getField('recentVideos'));

    process.exit(0);
  } catch (e) {
    console.error(e);
  }
})();
