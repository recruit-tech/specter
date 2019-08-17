import Todo, { task } from "../../specter/__tests__/fixtures/Todo";
import getPort from "../../specter/__tests__/lib/getPort";
import createApp from "../../specter/__tests__/lib/createApp";
import Client, { Request, Response } from "../src/browser";
import assert from "assert";

test("Todo create by browser", async () => {
    const { server } = createApp(new Todo());
    const { port } = await getPort(server);
    const client = new Client({
        base: `http://localhost:${port}/xhr`,
        fetchOptions: {}
    });
    const request = new Request("todo", {
        headers: {},
        query: {},
        body: {
            task: {
                title: "foo",
                desc: "bar",
                done: false
            }
        }
    });
    const res = await client.create(request);
    const data = res.body;
    assert.deepStrictEqual(data, {
        id: 0,
        task: {
            title: "foo",
            desc: "bar",
            done: false
        }
    });
    server.close();
});
