import { ApiHandler } from 'sst/node/api';

export const handler = ApiHandler(async () => ({
  statusCode: 200,
  body: JSON.stringify({ message: 'Hello World!' }),
}));
