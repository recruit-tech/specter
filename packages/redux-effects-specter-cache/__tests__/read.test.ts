import assert from "assert";
import { Store } from "redux";
import { specterRead, specterCreate } from "@specter/redux-effects-specter";
import createStore from "./fixture/createStore";
import { resetCacheData } from "../src";

describe("cache middleware", () => {
  let store: Store;
  beforeEach(() => {
    store = createStore({});
    resetCacheData();
  });

  it("no cache (not same servicea, read action", async () => {
    // initial state
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    await store.dispatch<any>(specterRead("greet"));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);
    assert.deepStrictEqual(state1.log, [specterRead("greet")]);

    await store.dispatch<any>(specterRead("fuga"));
    const state2 = store.getState();
    assert.equal(state2.log.length, 2);
    assert.deepStrictEqual(state2.log, [
      specterRead("greet"),
      specterRead("fuga"),
    ]);
  });

  it("no cache (same service, not read action)", async () => {
    // initial state
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    await store.dispatch<any>(specterRead("greet"));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);
    assert.deepStrictEqual(state1.log, [specterRead("greet")]);

    await store.dispatch<any>(specterCreate("greet"));
    const state2 = store.getState();
    assert.equal(state2.log.length, 2);
    assert.deepStrictEqual(state2.log, [
      specterRead("greet"),
      specterCreate("greet"),
    ]);
  });

  it("no cache with query (same service, read action, difference query)", async () => {
    // initial state
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    await store.dispatch<any>(specterRead("greet", { query: { foo: 1 } }));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);
    assert.deepStrictEqual(state1.log, [
      specterRead("greet", { query: { foo: 1 } }),
    ]);

    await store.dispatch<any>(specterRead("greet", { query: { foo: 2 } }));
    const state2 = store.getState();
    assert.equal(state2.log.length, 2);
    assert.deepStrictEqual(state2.log, [
      specterRead("greet", { query: { foo: 1 } }),
      specterRead("greet", { query: { foo: 2 } }),
    ]);
  });

  it("hit cache (same service, read action)", async () => {
    // initial state
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    // expected cachging when calling first
    await store.dispatch<any>(specterRead("greet"));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);
    assert.deepStrictEqual(state1.log, [specterRead("greet")]);

    // read from cache
    await store.dispatch<any>(specterRead("greet"));
    const state2 = store.getState();
    // expected log is one because, dont call dummy specter middleware
    assert.equal(state2.log.length, 1);
    assert.deepStrictEqual(state2.log, [specterRead("greet")]);
  });

  it("hit cache with query (same service, read action)", async () => {
    // initial state
    const state0 = store.getState();
    assert.equal(state0.log.length, 0);

    // expected cachging when calling first
    await store.dispatch<any>(specterRead("greet", { query: { foo: 1 } }));
    const state1 = store.getState();
    assert.equal(state1.log.length, 1);
    assert.deepStrictEqual(state1.log, [
      specterRead("greet", { query: { foo: 1 } }),
    ]);

    // read from cache
    await store.dispatch<any>(specterRead("greet", { query: { foo: 1 } }));
    const state2 = store.getState();
    // expected log is one because, dont call dummy specter middleware
    assert.equal(state2.log.length, 1);
    assert.deepStrictEqual(state2.log, [
      specterRead("greet", { query: { foo: 1 } }),
    ]);
  });
});
