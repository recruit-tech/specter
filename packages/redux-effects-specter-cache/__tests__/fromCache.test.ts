import assert from "assert";
import { specterRead } from "@specter/redux-effects-specter";
import createStore from "./fixture/createStore";
import { resetCacheData } from "../src";

describe("fromCache", () => {
  it("fromCache: false", async () => {
    const store = createStore({
      fromCache: () => false
    });
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    await store.dispatch(specterRead("greet"));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);
    assert.deepStrictEqual(state1.log[0], specterRead("greet"));

    await store.dispatch(specterRead("greet"));
    const state2 = store.getState();
    assert.equal(state2.log.length, 2);
    assert.deepStrictEqual(state2.log, [
      specterRead("greet"),
      specterRead("greet")
    ]);
  });

  it("fromCache: false -> true", async () => {
    let fromCache = false;
    const store = createStore({
      fromCache: () => fromCache
    });
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    await store.dispatch(specterRead("greet"));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);
    assert.deepStrictEqual(state1.log, [specterRead("greet")]);

    await store.dispatch(specterRead("greet"));
    const state2 = store.getState();
    assert.equal(state2.log.length, 2);
    assert.deepStrictEqual(state2.log, [
      specterRead("greet"),
      specterRead("greet")
    ]);

    fromCache = true;
    // to cache
    await store.dispatch(specterRead("greet"));
    const state3 = store.getState();
    assert.equal(state3.log.length, 2);
    assert.deepStrictEqual(state3.log, [
      specterRead("greet"),
      specterRead("greet")
    ]);
  });

  afterEach(() => {
    resetCacheData();
  });
});
