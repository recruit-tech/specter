import SpecterRequest from "@specter/specter/lib/request";

export default class SpecterResponse<
  H extends {
    "x-specter-next-reqs": string;
  },
  B extends any
> {
  header: H;
  body: B;
  constructor(header: H, body: B) {
    this.header = header;
    this.body = body;
  }

  getNextReqs() {
    const nextReqs = this.header["x-specter-next-reqs"];
    const reqs = nextReqs
      .split("__sep__")
      .map(req => SpecterRequest.parseRequest(req));
    return reqs;
  }
}
