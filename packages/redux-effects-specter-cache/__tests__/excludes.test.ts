import assert from "assert";
import { specterRead } from "@specter/redux-effects-specter";
import createStore from "./fixture/createStore";
import { resetCacheData } from "../src";

describe("excludes", () => {
  it("works", async () => {
    const store = createStore({ excludes: ["greet"] });
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    await store.dispatch(specterRead("greet"));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);
    assert.deepStrictEqual(state1.log, [specterRead("greet")]);

    await store.dispatch(specterRead("foo"));
    const state2 = store.getState();
    assert.equal(state2.log.length, 2);
    assert.deepStrictEqual(state2.log, [
      specterRead("greet"),
      specterRead("foo")
    ]);

    await store.dispatch(specterRead("foo"));
    const state3 = store.getState();
    assert.equal(state3.log.length, 2);
    assert.deepStrictEqual(state3.log, [
      specterRead("greet"),
      specterRead("foo")
    ]);
  });

  afterEach(() => {
    resetCacheData();
  });
});
