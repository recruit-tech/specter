/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RedisCache } from "../src/";
import assert from "assert";
import { AddressInfo } from "net";
import { redisMiniServer } from "./utils/redis-mini-server";

describe("RedisStorage", () => {
  test("put / get / delete", done => {
    redisMiniServer.listen(0);
    redisMiniServer.on("listening", async () => {
      const address = redisMiniServer.address();
      const port = (address as AddressInfo).port;
      const storage = new RedisCache<string, string>({
        port,
        host: "localhost"
      });
      await storage.put("test", "foo");
      const value = await storage.get("test");
      assert.strictEqual(value, "foo");
      await storage.delete("test");
      const value2 = await storage.get("test");
      assert.strictEqual(value2, null);
      await storage.close();
      redisMiniServer.close();
      done();
    });
  });

  test("put", done => {
    redisMiniServer.listen(0);
    redisMiniServer.on("listening", async () => {
      const address = redisMiniServer.address();
      const port = (address as AddressInfo).port;
      const storage = new RedisCache<any, any>({
        port,
        host: "localhost",
        identify: (k: any) => JSON.stringify(k),
        serialize: (v: any) => JSON.stringify(v),
        deserialize: (v: any) => JSON.parse(v)
      });
      await storage.put({ 1: 2, 3: 4 }, { 5: 6, 7: 8 });
      const value = await storage.get({ 1: 2, 3: 4 });
      assert.deepStrictEqual(value, { 5: 6, 7: 8 });
      await storage.close();
      redisMiniServer.close();
      done();
    });
  });
});
