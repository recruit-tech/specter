import { IncomingMessage, IncomingHttpHeaders } from "http";
import { Request as ExpressRequest } from "express";
type Request = ExpressRequest | IncomingMessage;
export type AnyRequest = SpecterRequest<{}, {}, {}>;

export default class SpecterRequest<
  H extends IncomingHttpHeaders,
  Q extends any,
  B extends any = {}
> {
  resource: string;
  headers: H | IncomingHttpHeaders;
  query: Q;
  body: B;
  method?: string;
  req: object;

  constructor(
    resource: string,
    req: Request | { method?: string; headers: H; query: Q; body?: B }
  ) {
    this.resource = resource;
    this.method = req.method;
    this.query = (req as ExpressRequest).query || {};
    this.headers = req.headers || {};
    this.body = (req as ExpressRequest).body || {};
    if (!this.body) {
      throw new Error("Not Supported Yet.");
    }
    this.req = req;
  }

  static parseRequest(req: string) {
    const parsed = JSON.parse(req);
    return new SpecterRequest(parsed.resource, {
      method: parsed.method,
      headers: parsed.headers,
      query: parsed.query,
      body: parsed.body
    });
  }

  toString() {
    return JSON.stringify({
      resource: this.resource,
      headers: this.headers,
      query: this.query,
      body: this.body,
      method: this.method
    });
  }
}
