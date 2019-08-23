import React from 'react'
import styled from 'styled-components'
import Client, { Request } from "@specter/client";
import { RequestBody } from "../agreed/counter";
import { CounterResponse } from "../services/Counter";
import Link from 'next/link'
import { NextPageContext } from 'next';

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const page = (props: { count: number }) => <Link href={`/?count=${props.count}`}><Title>My page {props.count}</Title></Link>
page.getInitialProps = async (context: NextPageContext) => {
  const {query} = context;
  const count = +query.count || 0;
  const client = new Client({
    base: "/xhr",
    fetchOption: {},
  });
  const request = new Request<{}, {}, RequestBody>("counter", {
    headers: {},
    query: {},
    body: {
      count: (count + 1),
    }
  });
  console.log(request);
  const data = await client.update<CounterResponse>(request);
  return { count: data.body.count };
};
export default page
