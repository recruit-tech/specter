/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Service, Request, Response } from "@specter/specter";
import fetch from "isomorphic-unfetch";
import { Storage } from "@specter/storage";
import { RedisCache } from "@specter/storage-redis";

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
type HackerNewsItemRequest = Request<{}, { id: number }, null>;

export default class HackerNewsItem extends Service {
  cache: Storage<HackerNewsItemRequest, HackerNewsItemResponse>;

  constructor(config: object) {
    super("hnitem", config);
    this.cache = new Storage({
      storage: new RedisCache({
        identify: (key: HackerNewsItemRequest) => `hnitem-${key.query.id}`,
        serialize: (value: HackerNewsItemResponse) => value.toString(),
        deserialize: (value: string) => Response.parse(value),
      }),
    });
  }
  async read(request: HackerNewsItemRequest): Promise<HackerNewsItemResponse> {
    const cacheData = await this.cache.get(request);
    if (cacheData) {
      cacheData.appendHeader("x-specter-cache-hit", 1);
      return cacheData;
    }
    const res = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${request.query.id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
    const data: HNItemBody = await res.json();
    const resp = new Response({}, data);
    this.cache.store(request, resp);
    return resp;
  }
}
