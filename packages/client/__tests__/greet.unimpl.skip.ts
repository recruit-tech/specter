import Greet from "@specter/specter/__tests__/fixtures/Greet";
import getPort from "@specter/specter/__tests__/lib/getPort";
import createApp from "@specter/specter/__tests__/lib/createApp";
import { isSpecterError } from "@specter/specter";
import Client, { Request } from "../src/browser";
import assert from "assert";

test("Greet delete throws unimplemented error, catch on express error", async () => {
  const { app, server } = createApp(new Greet());
  app.use((err: any, _req: any, _res: any, _next: Function) => {
    assert.ok(isSpecterError(err));
  });
  const { port } = await getPort(server);
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {},
  });
  const req = new Request<{}, {}, {}>("greet", { headers: {}, query: {} }); // body is not set
  await client.delete(req);
  server.close();
});
