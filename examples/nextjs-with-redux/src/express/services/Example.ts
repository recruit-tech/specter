import { Request, Response, Service } from "@specter/specter";

export default class Counter extends Service {
  constructor(config: object) {
    super("example", config);
  }

  /* eslint @typescript-eslint/require-await: [0] */
  async read(_req: Request<{}, {}, {}>) {
    return new Response({}, { response: "hello, world" });
  }
}
