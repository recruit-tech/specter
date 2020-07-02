import Todo from "@specter/specter/__tests__/fixtures/Todo";
import getPort from "@specter/specter/__tests__/lib/getPort";
import createApp from "@specter/specter/__tests__/lib/createApp";
import Client, { Request } from "../src/browser";
import assert from "assert";

test("Todo return invalid json", async () => {
  const { server } = createApp(new Todo());
  const { port } = await getPort(server);
  server.on("request", (req) => {
    assert.strictEqual(req.headers.accept, "application/json");
  });
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {},
  });
  const request = new Request("todo", {
    headers: {},
    query: { invalidjson: "invalidjson", id: 0 },
  });
  const res = await client.read(request);
  const data = res.body;
  assert.deepStrictEqual(data, '"invalid json"');
  server.close();
});
