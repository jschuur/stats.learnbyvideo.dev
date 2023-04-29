import { SSTConfig } from 'sst';

import { API } from './stack';

export default {
  config(_input) {
    return {
      name: 'doesithaveafeed-com',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: 'nodejs18.x',
      timeout: '30 seconds',
      memorySize: 256,
    });

    app.stack(API);
  },
} satisfies SSTConfig;
