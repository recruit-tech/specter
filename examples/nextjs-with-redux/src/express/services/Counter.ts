import { Request, Response, Service } from "@specter/specter";

export default class Counter extends Service {
  private count = 0;
  constructor(config: object) {
    super("counter", config);
  }

  async read(_req: Request<{}, {}, {}>) {
    return new Response({}, { count: this.count });
  }

  /* eslint @typescript-eslint/require-await: [0] */
  async update(_req: Request<{}, {}, {}>) {
    this.count++;
    return new Response({}, { count: this.count });
  }
}
