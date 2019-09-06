import getPort from "../../specter/__tests__/lib/getPort";
import createApp from "../../specter/__tests__/lib/createApp";
import Client, { Request, Response } from "../src/browser";
import assert from "assert";
import {
  Service,
  Request as SpecterRequest,
  Response as SpecterResponse
} from "../../specter/src";

test("get Next Request", async () => {
  class Foo extends Service {
    constructor() {
      super("foo", {});
    }

    async read(
      req: SpecterRequest<{}, { foo: string }, {}>
    ): Promise<SpecterResponse<{}, { foo: string } | { hasNext: string }>> {
      if (!req.query.foo) {
        const res = new SpecterResponse(
          {},
          {
            hasNext: "true"
          }
        );
        res.setNextReqs(
          new SpecterRequest("foo", {
            method: "GET",
            headers: {},
            query: {
              foo: "bar"
            },
            body: {}
          })
        );
        return res;
      }
      const res = new SpecterResponse({}, { foo: req.query.foo });
      return res;
    }
  }
  const { server } = createApp(new Foo());
  const { port } = await getPort(server);
  const client = new Client({
    base: `http://localhost:${port}/xhr`,
    fetchOptions: {}
  });
  const request = new Request("foo", {
    headers: {},
    query: {},
    body: {}
  });
  const res = await client.read(request);
  const data = res.body;
  assert.deepStrictEqual(data, {
    hasNext: "true"
  });
  const [nextReq] = res.getNextReqs();
  assert.strictEqual(nextReq.resource, "foo");
  assert.deepStrictEqual(nextReq.query, { foo: "bar" });
  const res2 = await client.read(new Request(nextReq.resource, nextReq));
  const data2 = res2.body;
  assert.deepStrictEqual(data2, {
    foo: "bar"
  });
  server.close();
});
