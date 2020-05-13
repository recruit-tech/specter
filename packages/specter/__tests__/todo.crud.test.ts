import assert from "assert";
import fetch from "isomorphic-unfetch";
import Todo from "./fixtures/Todo";
import getPort from "./lib/getPort";
import createApp from "./lib/createApp";

test("Todo create", async () => {
  const { server } = await createApp(new Todo());
  const { port } = await getPort(server);
  const res = await fetch(`http://localhost:${port}/xhr/todo`, {
    method: "POST",
    body: JSON.stringify({
      task: {
        title: "test",
        desc: "desc",
        done: false
      }
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  const data = await res.json();
  assert.deepStrictEqual(data, {
    id: 0,
    task: {
      title: "test",
      desc: "desc",
      done: false
    }
  });
  server.close();
});

test("Todo update", async () => {
  const { server } = await createApp(new Todo());
  const { port } = await getPort(server);
  const postRes = await fetch(`http://localhost:${port}/xhr/todo`, {
    method: "POST",
    body: JSON.stringify({
      task: {
        title: "test",
        desc: "desc",
        done: false
      }
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  const postData = await postRes.json();
  const res = await fetch(
    `http://localhost:${port}/xhr/todo?id=${postData.id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        task: {
          title: "test",
          desc: "desc",
          done: true
        }
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }
  );
  const data = await res.json();
  assert.deepStrictEqual(data, {
    id: `${postData.id}`,
    task: {
      title: "test",
      desc: "desc",
      done: true
    }
  });
  server.close();
});

test("Todo read", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  const postRes = await fetch(`http://localhost:${port}/xhr/todo`, {
    method: "POST",
    body: JSON.stringify({
      task: {
        title: "test",
        desc: "desc",
        done: false
      }
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  const postData = await postRes.json();
  const res = await fetch(
    `http://localhost:${port}/xhr/todo?id=${postData.id}`
  );
  const data = await res.json();
  assert.deepStrictEqual(data, {
    id: `${postData.id}`,
    task: {
      title: "test",
      desc: "desc",
      done: false
    }
  });
  server.close();
});

test("Todo delete", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  const postRes = await fetch(`http://localhost:${port}/xhr/todo`, {
    method: "POST",
    body: JSON.stringify({
      task: {
        title: "test",
        desc: "desc",
        done: false
      }
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  const postData = await postRes.json();
  const res = await fetch(
    `http://localhost:${port}/xhr/todo?id=${postData.id}`,
    {
      method: "DELETE"
    }
  );
  assert.strictEqual(res.status, 204);
  server.close();
});

test("Todo list", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  const postRes = await fetch(`http://localhost:${port}/xhr/todo`, {
    method: "POST",
    body: JSON.stringify({
      task: {
        title: "test",
        desc: "desc",
        done: false
      }
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  const postData = await postRes.json();
  const res = await fetch(`http://localhost:${port}/xhr/todo`);
  const headers = res.headers;
  const data = await res.json();
  server.close();
  return;
});
