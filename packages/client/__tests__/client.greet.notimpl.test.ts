import Greet from "@specter/specter/__tests__/fixtures/Greet";
import getPort from "@specter/specter/__tests__/lib/getPort";
import createApp from "@specter/specter/__tests__/lib/createApp";
import Client, { Request } from "../src/browser";
import assert from "assert";

test("Greet return unimpl method", async () => {
  const { server } = createApp(new Greet());
  const { port } = await getPort(server);
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {},
  });
  const request = new Request("greet", {
    headers: {},
    query: {},
  });
  const res = await client.delete(request);
  assert.strictEqual(res.body.statusCode, 400);
  server.close();
});
