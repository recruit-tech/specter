import { Storage } from "@specter/storage";
import { RedisCache } from "../src/";
import assert from "assert";
import net, { AddressInfo } from "net";
import { redisMiniServer } from "./utils/redis-mini-server";

describe("RedisStorage", () => {
  test("put", done => {
    redisMiniServer.listen(0);
      // const address = redisMiniServer.address();
      // const port = (address as AddressInfo).port;
    redisMiniServer.on("listening", async () => {
      const address = redisMiniServer.address();
      const port = (address as AddressInfo).port;
      console.log(port);
      const storage = new RedisCache<string, string>({ port });
      storage.put("test", "foo", { serialize: (k: string) => k });
      console.log(storage);
      const value = storage.get("test", {
        deserialize: (v: string) => v
      });
      console.log(value);
      storage.close();
      redisMiniServer.close();
      done();
    });
  });
});
