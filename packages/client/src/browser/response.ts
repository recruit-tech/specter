import SpecterRequest from "@specter/specter/lib/request";

export default class SpecterResponse<
  H extends {
    "x-specter-next-reqs": string;
  },
  B extends any
> {
  headers: H;
  body: B;
  constructor(headers: H, body: B) {
    this.headers = headers;
    this.body = body;
  }

  getNextReqs() {
    const nextReqs = this.headers["x-specter-next-reqs"];
    const reqs = nextReqs
      .split("__sep__")
      .map(req => SpecterRequest.parseRequest(req));
    return reqs;
  }

  static parse(res: string) {
    const parsed = JSON.parse(res);
    const response = new SpecterResponse(parsed.headers, parsed.body);
    return response;
  }
  toString() {
    return JSON.stringify({
      headers: this.headers,
      body: this.body
    });
  }
}
