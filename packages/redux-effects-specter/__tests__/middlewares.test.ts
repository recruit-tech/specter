import assert from "assert";
import {
  createStore as createReduxStore,
  Reducer,
  compose,
  applyMiddleware,
  Store
} from "redux";
import { Client } from "../../specter/src";
import middleware, { specterCreate, specterRead } from "../src";
import createApp from "../../specter/__tests__/lib/createApp";
import Todo from "../../specter/__tests__/fixtures/Todo";
import getPort from "../../specter/__tests__/lib/getPort";
import Greeet from "../../specter/__tests__/fixtures/Greet";

describe("middlewares", () => {
  let createStore: () => Store;
  let server: ReturnType<typeof createApp>["server"];

  beforeEach(async () => {
    server = createApp(new Todo(), new Greeet()).server;
    const { port } = await getPort(server);
    const client = new Client({ base: `http://localhost:${port}/xhr` });
    createStore = () => {
      const middlewares = [middleware(client)];
      return createReduxStore(
        state => state,
        {},
        compose(applyMiddleware(...middlewares))
      );
    };
  });

  it("read greet through redux middleware", async () => {
    const store = createStore();
    const resp = (await store.dispatch(
      specterRead("greet")
    ) as any /* redux can't deside a return type of `dispatch` */);
    assert.deepStrictEqual(resp, { greet: 'hello' });
  });

  it("create todo through redux middleware", async () => {
    const initialState = { data: null };
    const reducer = (state: typeof initialState) => state;
    const store = createStore();
    const resp = (await store.dispatch(
      specterCreate("todo", {
        body: {
          task: {
            title: "foo",
            desc: "bar",
            done: false
          }
        }
      })
    ) as any /* redux can't deside a return type of `dispatch` */);
    assert.deepStrictEqual(resp, {
      id: 0,
      task: {
        title: "foo",
        desc: "bar",
        done: false
      }
    });
  });

  afterEach(() => {
    server.close()
  })
});
