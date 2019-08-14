export default class SpecterRequest<H extends any, Q extends any, B extends any> {
  resource: string;
  headers: H;
  query: Q;
  body?: B;
  method?: string;
  req: object;

  constructor(resource: string, request: {
    headers: H,
    query: Q,
    body?: B,
    method?: string,
  }) {
    this.resource = resource;
    this.headers = request.headers;
    this.query = request.query;
    this.body = request.body;
    this.method = request.method;
    this.req = request;
  }

  toHeader(): string {
    return JSON.stringify({
      resource: this.resource,
      headers: this.headers,
      query: this.query,
      body: this.body,
      method: this.method,
    });
  }

  static toRequest(req: string): SpecterRequest<any, any, any> {
    const r = JSON.parse(req);
    return new SpecterRequest(r.resource, { 
      headers: r.headers,
      query: r.query,
      body: r.body,
      method: r.method,
    });
  }
}