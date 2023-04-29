import { Api, StackContext } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /hello': 'src/hello.handler',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return api;
}
