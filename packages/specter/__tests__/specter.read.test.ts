import Specter, { Client, Request, Response, Service } from "../src";
import express from "express";
import { AddressInfo } from "net";
import assert from "assert";
import getPort from "./lib/getPort";
import fetch from "isomorphic-unfetch";
import createApp from "./lib/createApp";
import Todo from "./fixtures/Todo";

test("Specter.createService example", async () => {
  class Echo extends Service {
    constructor() {
      super("echo", {});
    }
    read(request: Request<{}, { foo: string }, {}>): Promise<Response<{}, {}>> {
      return Promise.resolve(new Response<{}, {}>({}, request.query));
    }
  }
  const { server } = createApp(new Echo());
  const { port } = await getPort(server);
  const res = await fetch(`http://localhost:${port}/xhr/echo?foo=bar`);
  const data = await res.json();
  assert.deepStrictEqual(data, {
    foo: "bar"
  });
  server.close();
});

test("Specter call by client", async () => {
  class Echo2 extends Service {
    constructor() {
      super("echo2", {});
    }
    read(request: Request<{}, {}, {}>): Promise<Response<{}, {}>> {
      return Promise.resolve(
        new Response<{}, {}>(request.headers, request.query)
      );
    }
  }
  const { server } = createApp(new Echo2());
  const client = new Client();
  const request = new Request<{ foo: string }, { echo: string }, {}>("echo2", {
    headers: {
      foo: "bar"
    },
    query: {
      echo: "echo"
    },
    body: {}
  });
  const res = await client.read<Response<{ foo: string }, { echo: string }>>(
    request
  );
  const data = res.body;
  const headers = res.headers;
  assert.deepStrictEqual(headers, {
    foo: "bar"
  });
  assert.deepStrictEqual(data, {
    echo: "echo"
  });
  server.close();
});

test("Specter send next response", async () => {
  class Echo2 extends Service {
    constructor() {
      super("echo2", {});
    }
    read(request: Request<{}, {}, {}>): Promise<Response<{}, {}>> {
      const res = new Response<{}, {}>(request.headers, request.query);
      res.setNextReqs(request);
      return Promise.resolve(res);
    }
  }
  const { server } = createApp(new Echo2());
  const client = new Client();
  const request = new Request<{ foo: string }, { echo: string }, {}>("echo2", {
    headers: {
      foo: "bar"
    },
    query: {
      echo: "echo"
    },
    body: {}
  });
  const res = await client.read<Response<{ foo: string }, { echo: string }>>(
    request
  );
  const data = res.body;
  const headers = res.headers;
  assert.strictEqual(headers.foo, "bar");
  const nextReqs = res.getNextReqs();
  if (nextReqs) {
    assert.strictEqual(nextReqs[0].toString(), request.toString());
  }
  assert.deepStrictEqual(data, {
    echo: "echo"
  });
  server.close();
});
