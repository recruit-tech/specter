import { Request, Response, Service } from "../../src";

export type ReadRequest = Request<{}, {}>; // no-body request
type ReadResponse = Response<{}, { greet: string }>;

export default class Greeet extends Service {
  constructor() {
    super("greet", {});
  }

  async read(_request: ReadRequest): Promise<ReadResponse> {
    const result = new Response(
      {},
      {
        greet: "hello"
      }
    );
    return result;
  }
}
