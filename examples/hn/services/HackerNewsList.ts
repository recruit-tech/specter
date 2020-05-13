import { Service, Request, Response } from "@specter/specter";
import { Request as ClientRequest } from "@specter/client";
import { Storage } from "@specter/storage";

import fetch from "isomorphic-unfetch";

export type HackerNewsListResponse = Response<{}, Array<number>>;
type HackerNewsListRequest = Request<{}, {}, null>;

export default class HackerNewsList extends Service {
  storage: Storage<string, HackerNewsListResponse>;
  constructor(config: object) {
    super("hnlist", config);
    this.storage = new Storage({});
  }
  async read(req: HackerNewsListRequest): Promise<HackerNewsListResponse> {
    const cachedRes = await this.storage.get(req.toString());
    if (cachedRes) {
      cachedRes.appendHeader("x-specter-cache-hit", 1);
      return cachedRes;
    }
    const res = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    const data: Array<number> = await res.json();
    const nextReqs = data.slice(0, 10).map(
      (id) =>
        new ClientRequest<{}, { id: number }, null>("hnitem", {
          headers: {},
          query: { id: id },
          body: null,
        })
    );
    const resp = new Response({}, data);
    resp.setNextReqs(...nextReqs);
    this.storage.store(req.toString(), resp, {
      expiredSec: 10,
    });
    return resp;
  }
}
