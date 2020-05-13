import Specter, { Client, Request, Response, Service } from "../src";
import { AddressInfo } from "net";
import assert from "assert";
import fetch from "isomorphic-unfetch";
import Todo, { task } from "./fixtures/Todo";
import getPort from "./lib/getPort";
import createApp from "./lib/createApp";

test("Todo create", async () => {
  const { server } = await createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client();
  const request = new Request<{}, {}, { task: task }>("todo", {
    headers: {},
    query: {},
    body: {
      task: {
        title: "foo",
        desc: "bar",
        done: false,
      },
    },
  });
  const res = await client.create<Response<{}, { id: number; task: task }>>(
    request
  );
  const data = res.body;
  assert.deepStrictEqual(data, {
    id: 0,
    task: {
      title: "foo",
      desc: "bar",
      done: false,
    },
  });
  server.close();
});

test("Todo update", async () => {
  const { server } = await createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client();
  const request = new Request<{}, {}, { task: task }>("todo", {
    headers: {},
    query: {},
    body: {
      task: {
        title: "foo",
        desc: "bar",
        done: false,
      },
    },
  });
  const postRes = await client.create<Response<{}, { id: number; task: task }>>(
    request
  );
  request.query = {
    id: postRes.body.id,
  };
  request.body = {
    task: {
      title: "foo2",
      desc: "bar2",
      done: true,
    },
  };
  const res = await client.update<Response<{}, { task: task }>>(request);
  const data = res.body;
  assert.deepStrictEqual(data, {
    id: +`${postRes.body.id}`,
    task: {
      title: "foo2",
      desc: "bar2",
      done: true,
    },
  });
  server.close();
});

test("Todo read", async () => {
  const { server } = await createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client();
  const request = new Request<{}, {}, { task: task }>("todo", {
    headers: {},
    query: {},
    body: {
      task: {
        title: "foo",
        desc: "bar",
        done: false,
      },
    },
  });
  const postRes = await client.create<Response<{}, { id: number; task: task }>>(
    request
  );
  const readReq = new Request<{}, { id: number }, null>("todo", {
    headers: {},
    query: {
      id: postRes.body.id,
    },
    body: null,
  });
  const res = await client.read<Response<{}, { task: task }>>(readReq);
  const data = res.body;
  assert.deepStrictEqual(data, {
    id: +`${postRes.body.id}`,
    task: {
      title: "foo",
      desc: "bar",
      done: false,
    },
  });
  server.close();
});

test("Todo delete", async () => {
  const { server } = await createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client();
  const request = new Request<{}, {}, { task: task }>("todo", {
    headers: {},
    query: {},
    body: {
      task: {
        title: "foo",
        desc: "bar",
        done: false,
      },
    },
  });
  const postRes = await client.create<Response<{}, { id: number; task: task }>>(
    request
  );
  const deleteReq = new Request<{}, { id: number }, null>("todo", {
    headers: {},
    query: {
      id: postRes.body.id,
    },
    body: null,
  });
  const res = await client.delete<Response<{}, { task: task }>>(deleteReq);
  assert.strictEqual(res.status, 204);
  server.close();
});
