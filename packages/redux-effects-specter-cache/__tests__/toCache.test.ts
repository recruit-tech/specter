import assert from "assert";
import { specterRead } from "@specter/redux-effects-specter";
import createStore from "./fixture/createStore";
import { resetCacheData } from "../src";

describe("toCache", () => {
  it("toCache: false", async () => {
    const store = createStore({
      toCache: () => false
    });
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    await store.dispatch(specterRead("greet"));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);

    await store.dispatch(specterRead("greet"));
    const state2 = store.getState();
    assert.equal(state2.log.length, 2);
  });

  it("toCache: false -> true", async () => {
    let toCache = false;
    const store = createStore({
      toCache: () => toCache
    });
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    await store.dispatch(specterRead("greet"));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);

    await store.dispatch(specterRead("greet"));
    const state2 = store.getState();
    assert.equal(state2.log.length, 2);

    toCache = true;
    // to cache
    await store.dispatch(specterRead("greet"));
    const state3 = store.getState();
    assert.equal(state3.log.length, 3);

    // from cache
    await store.dispatch(specterRead("greet"));
    const state4 = store.getState();
    assert.equal(state4.log.length, 3);
  });

  afterEach(() => {
    resetCacheData();
  });
});
