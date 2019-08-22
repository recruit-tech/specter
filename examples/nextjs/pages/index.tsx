import React from 'react'
import styled from 'styled-components'
import Client, { Request, Response } from "@specter/client";
import { RequestBody } from "../agreed/counter";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

const page = (props: { count: number }) => <Title>My page {props.count}</Title>
page.getInitialProps = async () => {
  const client = new Client({
    base: "/xhr",
    fetchOption: {},
  });
  const request = new Request<{}, {}, RequestBody>("counter", {
    headers: {},
    query: {},
    body: {
      count: 1
    }
  });
  type CounterResponse = Response<{}, { count: number }>;
  const data = await client.update<CounterResponse>(request);
  return { count: data.body.count };
};
export default page
