import assert from "assert";
import { specterRead, specterCreate } from "@specter/redux-effects-specter";
import createStore, { resetStore } from "./fixture/createStore";
import { resetCacheData } from "../src";

describe("reset cache function", () => {
  beforeEach(() => {
    resetCacheData();
    resetStore();
  });

  it("always false => cache all", async () => {
    const resetCache = () => false;
    const store = createStore({ resetCache });
    assert.deepStrictEqual(store.getState(), { log: [] });

    const action = specterRead("greeting");
    await store.dispatch(action);
    assert.deepStrictEqual(store.getState().log, [action]);

    await store.dispatch(specterRead("greeting"));
    // read from cache
    assert.deepStrictEqual(store.getState().log, [action]);
  });

  it("always true => always reset cahe", async () => {
    const resetCache = () => true;
    const store = createStore({ resetCache });
    assert.deepStrictEqual(store.getState(), { log: [] });

    const action = specterRead("greeting");
    await store.dispatch(action);
    assert.deepStrictEqual(store.getState().log, [action]);

    await store.dispatch(specterRead("greeting"));
    assert.deepStrictEqual(store.getState().log, [action, action]);
  });

  it("always true => read always uses cache, but create purges the cache result", async () => {
    const store = createStore({
      resetCache: action => action.payload.type !== "read"
    });
    assert.deepStrictEqual(store.getState(), { log: [] });
    const readAction = specterRead("greeting");
    const createAction = specterCreate("greeting");

    // set cache
    await store.dispatch(readAction);
    assert.deepStrictEqual(store.getState().log, [readAction]);

    // from cache
    await store.dispatch(readAction);
    assert.deepStrictEqual(store.getState().log, [readAction]);

    // expired cache
    await store.dispatch(createAction);
    assert.deepStrictEqual(store.getState().log, [readAction, createAction]);

    // set cache
    await store.dispatch(readAction);
    assert.deepStrictEqual(store.getState().log, [
      readAction,
      createAction,
      readAction
    ]);

    // from cache
    await store.dispatch(readAction);
    assert.deepStrictEqual(store.getState().log, [
      readAction,
      createAction,
      readAction
    ]);
  });

  it("resetCacheData: use exposed resetCacheData function", async () => {
    // always cache
    const resetCache = () => false;
    const store = createStore({ resetCache });

    assert.deepStrictEqual(store.getState(), { log: [] });
    const readAction = specterRead("greeting");

    await store.dispatch(readAction);
    assert.deepStrictEqual(store.getState().log, [readAction]);

    resetCacheData();

    await store.dispatch(readAction);
    assert.deepStrictEqual(store.getState().log, [readAction, readAction]);
  });
});
