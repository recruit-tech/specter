import Specter, { Service } from "@specter/specter";
import Client, { Request, Response } from "@specter/client";

type RequestHeader = { }
type ResponseHeader = { }
type Query = { }
type RequestBody = {}
type ResponseBody = { count: number }

export default class Counter extends Service {
  count: number;
  constructor(config: any) {
    super("counter", config);
    this.count = 0;
  }
  async update(request: Request<RequestHeader, Query, RequestBody>): Promise<Response<ResponseHeader, ResponseBody>> {
    this.count++;
    const response = new Response({}, {
      count: this.count,
    })
    return response;
  }
  async read(request: Request<RequestHeader, Query, RequestBody>): Promise<Response<ResponseHeader, ResponseBody>> {
    const response = new Response<ResponseHeader, ResponseBody>({}, {
      count: this.count,
    })
    return response;
  }
}