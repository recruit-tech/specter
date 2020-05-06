import SpecterRequest from "./request";

export type AnyResponse = SpecterResponse<{}, {}>;
export default class SpecterResponse<H extends any, B extends any> {
  status?: number;
  headers: H;
  body: B;
  error?: any;
  nextReqs?: SpecterRequest<any, any, any>[];
  constructor(headers: H, body: B) {
    this.headers = headers;
    this.body = body;
  }
  setStatus(status: number) {
    this.status = status;
  }
  setNextReqs(...reqs: SpecterRequest<any, any, any>[]) {
    this.headers = {
      ...this.headers,
      "x-specter-next-reqs": reqs.map(req => req.toString()).join("__sep__")
    };
    this.nextReqs = reqs;
  }
  appendHeader(key: string, value: any) {
    this.headers[key] = value;
  }
  setError(error: any) {
    this.error = error;
  }
  getNextReqs() {
    return this.nextReqs;
  }
}
