import React from "react";
import Client, { Request } from "@specter/client";
import {
  HNItemBody,
  HackerNewsItemResponse
} from "../../services/HackerNewsItem";
import { NextPageContext } from "next";

const page = (props: { result: HNItemBody }) => (
  <div>
    <div>
      <a href={props.result.url}>{props.result.title}</a>
    </div>
  </div>
);

page.getInitialProps = async (ctx: NextPageContext) => {
  const { id } = ctx.query;
  const client = new Client({
    base: "/xhr",
    fetchOption: {}
  });
  const request = new Request<{}, {}, null>("hnitem", {
    headers: {},
    query: {
      id
    },
    body: null
  });
  const data = await client.read<HackerNewsItemResponse>(request);
  const cacheHit = (data.headers as any)["x-specter-cache-hit"] || "0";
  if (ctx) {
    ctx.res?.setHeader("x-specter-cache-hit", cacheHit);
  }
  return { result: data.body };
};
export default page;
