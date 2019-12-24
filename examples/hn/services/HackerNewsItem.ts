import { Service, Request, Response } from "@specter/specter";
import fetch from "isomorphic-unfetch";
import Cache from "node-cache";

export type HNItemBody = {
  id: number;
  deleted: boolean;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by: string;
  time: number;
  text: string;
  dead: boolean;
  url: string;
  title: string;
};
export type HackerNewsItemResponse = Response<{}, HNItemBody>;

const cachekeyPrefix = "hnitems";
export default class HackerNewsItem extends Service {
  cache: Cache;

  constructor(config: object) {
    super("hnitem", config);
    this.cache = new Cache();
  }
  async read(
    request: Request<{}, { id: number }, null>
  ): Promise<HackerNewsItemResponse> {
    const cacheData = this.cache.get(`${cachekeyPrefix}-${request.query.id}`);
    if (cacheData) {
      return new Response({}, cacheData as HNItemBody);
    }
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${request.query.id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
    const data: HNItemBody = await res.json();
    this.cache.set(`${cachekeyPrefix}-${request.query.id}`, data);
    return new Response({}, data);
  }
}
