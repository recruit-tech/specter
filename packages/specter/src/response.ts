import SpecterRequest from "./request";

export type AnyResponse = SpecterResponse<{}, {}>;
export default class SpecterResponse<H extends any, B extends any> {
  status?: number;
  header: H;
  body: B;
  error?: any;
  constructor(header: H, body: B) {
    this.header = header;
    this.body = body;
  }
  setStatus(status: number) {
    this.status = status;
  }
  setNextReqs(...reqs: SpecterRequest<any, any, any>[]) {
    this.header = {
      ...this.header,
      "x-specter-next-reqs": reqs.map(req => req.toString())
    };
  }
  setError(error: any) {
    this.error = error;
  }
}
