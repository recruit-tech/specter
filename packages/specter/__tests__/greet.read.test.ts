import assert from "assert";
import getPort from "./lib/getPort";
import createApp from "./lib/createApp";
import Greeet from "./fixtures/Greet";
import { Client, Request } from "../src";

test("Greet read", async () => {
  const { server } = createApp(new Greeet());
  const { port } = await getPort(server);
  const client = new Client({ base: `http://localhost:${port}/xhr` });
  const req = new Request<{}, {}>("greet", { headers: {}, query: {} }); // body is not set
  const resp = await client.read(req).then(res => res.body);
  assert.deepStrictEqual(resp, {
    greet: "hello"
  });
  server.close();
});
