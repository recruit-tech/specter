import Todo from "../../specter/__tests__/fixtures/Todo";
import getPort from "../../specter/__tests__/lib/getPort";
import createApp from "../../specter/__tests__/lib/createApp";
import Client, { Request } from "../src/browser";
import assert from "assert";

test("Todo create by browser", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {},
  });
  const request = new Request("todo", {
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
  const res = await client.create(request);
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

test("client with default header", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {
      headers: {
        "XCSRF-Token": "EXAMPLE_TOKEN_FOR_TEST",
      },
    },
  });
  const request = new Request("todo", {
    headers: {
      Authorization: "Bearer xxxxxxxxxx",
    },
    query: {},
    body: {
      task: {
        title: "foo",
        desc: "bar",
        done: false,
      },
    },
  });
  const res = await client.create(request);
  server.close();
});

test("request was rejected if implements a validateStatus and validation failure", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {},
    validateStatus: (status: number) => status >= 200 && status < 300,
  });
  const request = new Request("todo", {
    headers: {},
    query: { id: "9999999" },
    body: {},
  });
  try {
    await client.read(request);
  } catch (err) {
    assert.deepStrictEqual(err.status, 404);
    assert.deepStrictEqual(err.statusText, "Not Found");
  }

  server.close();
});

test("Todo create and update and delete with fallback by browser", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {},
    fallbackMethod: "POST",
  });
  const request = new Request("todo", {
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
  let res = await client.create(request);
  let data = res.body;
  assert.deepStrictEqual(data, {
    id: 0,
    task: {
      title: "foo",
      desc: "bar",
      done: false,
    },
  });
  request.query = {
    id: data.id,
  };
  request.body = {
    task: {
      title: "foo",
      desc: "bar",
      done: true,
    },
  };
  res = await client.update(request);
  data = res.body;
  assert.deepEqual(data, {
    id: 0,
    task: {
      title: "foo",
      desc: "bar",
      done: true,
    },
  });
  res = await client.delete(request);
  data = res.body;
  assert.deepEqual(data, {});
  res = await client.read(request);
  data = res.body;
  assert.deepEqual(data, { id: 0 });
  server.close();
});

test("Todo create and update and delete with fallback and default header by browser", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {
      headers: {
        "XCSRF-Token": "EXAMPLE_TOKEN_FOR_TEST",
      },
    },
    fallbackMethod: "POST",
  });
  const request = new Request("todo", {
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
  let res = await client.create(request);
  let data = res.body;
  assert.deepStrictEqual(data, {
    id: 0,
    task: {
      title: "foo",
      desc: "bar",
      done: false,
    },
  });
  request.query = {
    id: data.id,
  };
  request.body = {
    task: {
      title: "foo",
      desc: "bar",
      done: true,
    },
  };
  res = await client.update(request);
  data = res.body;
  assert.deepEqual(data, {
    id: 0,
    task: {
      title: "foo",
      desc: "bar",
      done: true,
    },
  });
  res = await client.delete(request);
  data = res.body;
  assert.deepEqual(data, {});
  res = await client.read(request);
  data = res.body;
  assert.deepEqual(data, { id: 0 });
  server.close();
});
