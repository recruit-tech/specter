import { Service, Request, Response } from "@specter/specter";
import { Request as ClientRequest } from "@specter/client";
import fetch from "isomorphic-unfetch";

export type HackerNewsListResponse = Response<{}, Array<number>>;

export default class HackerNewsList extends Service {
  constructor(config: object) {
    super("hnlist", config);
  }
  async read(
    _: Request<{}, {}, null>
  ): Promise<HackerNewsListResponse> {
    const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    const data: Array<number> = await res.json();
    const nextReqs = data.slice(0, 10).map((id) => new ClientRequest<{},{ id: number },null>("hnitem", { 
      headers: {}, 
      query: { id: id }, 
      body: null,
    }));
    const resp = new Response(
      {},
      data,
    );
    resp.setNextReqs(...nextReqs);
    return resp;
  }
}
