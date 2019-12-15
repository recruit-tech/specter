import React from 'react'
import Client, { Request } from "@specter/client";
import { HackerNewsListResponse } from "../services/HackerNewsList";
import Link from 'next/link'
import { NextPageContext } from 'next';

const page = (props: { list: Array<number> }) => (<ul>
    {props.list.map((item) => <li key={item}><Link href={`/hn/[item]`} as={`/hn/${item}`}><a>{item}</a></Link></li>)};
  </ul>);

page.getInitialProps = async (_: NextPageContext) => {
  const client = new Client({
    base: "/xhr",
    fetchOption: {},
  });
  const request = new Request<{}, {}, null>("hnlist", {
    headers: {},
    query: {},
    body: null,
  });
  const data = await client.read<HackerNewsListResponse>(request);
  setTimeout(() => {
    const reqs = data.getNextReqs();
    reqs?.forEach((req) => client.read(req));
  }, 100);
  return { list: data.body };
};
export default page
