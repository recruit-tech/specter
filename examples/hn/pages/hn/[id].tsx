import React from 'react'
import Client, { Request } from "@specter/client";
import { HNItemBody, HackerNewsItemResponse } from "../../services/HackerNewsItem";
import { NextPageContext } from 'next';

const page = (props: { result: HNItemBody }) =>(<div>
  <div><a href={props.result.url}>{props.result.title}</a></div>
</div>);

page.getInitialProps = async (context: NextPageContext) => {
  const { id } = context.query; 
  const client = new Client({
    base: "/xhr",
    fetchOption: {},
  });
  const request = new Request<{}, {}, null>("hnitem", {
    headers: {},
    query: {
      id
    },
    body: null,
  });
  const data = await client.read<HackerNewsItemResponse>(request);
  return { result: data.body };
};
export default page
