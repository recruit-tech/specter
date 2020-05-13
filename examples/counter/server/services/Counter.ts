import { Service } from "@specter/specter";
import { Request, Response } from "@specter/client";

export default class Counter extends Service {
  count: number;
  constructor(config: object) {
    super("counter", config);
    this.count = 0;
  }
  async update(
    request: Request<{}, {}, {}>
  ): Promise<Response<{}, { count: number }>> {
    this.count++;
    const response = new Response(
      {},
      {
        count: this.count
      }
    );
    return response;
  }
  async read(
    request: Request<{}, {}, {}>
  ): Promise<Response<{}, { count: number }>> {
    const response = new Response(
      {},
      {
        count: this.count
      }
    );
    return response;
  }
}
