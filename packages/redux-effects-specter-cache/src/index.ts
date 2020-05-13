import { Middleware } from "redux";
import { LRUCache } from "@specter/storage";
import { SPECTER, Payload } from "@specter/redux-effects-specter";
import { Response } from "@specter/specter";

type SpecterAction = {
  type: typeof SPECTER;
  payload: Payload<any, any, any>;
  meta?: Record<string, any>;
  error?: boolean;
};

type Actions = SpecterAction | never;

// expected root state types
export interface CacheResolver<S extends Record<string, any>> {
  (action: SpecterAction, state: S): boolean;
}

export type MiddlewareOption<S> = {
  excludes?: Array<string>;
  fromCache?: CacheResolver<S>;
  toCache?: CacheResolver<S>;
  resetCache?: CacheResolver<S>;
};

let cacheInstance: LRUCache<string, Record<string, any>> | null = null;

function createCache(cacheOption?: Record<string, any>) {
  if (cacheInstance !== null) return cacheInstance;
  cacheInstance = new LRUCache<string, Record<string, any>>(cacheOption);
  return cacheInstance;
}

// CAUTION: this function expected to call after the createCache execudes in once.
// MEMO: this can call from outside middleware, and reset a cache data.
export function resetCacheData() {
  const cache = createCache();
  cache.clearAll();
}

export default function reduxEffectsSpecterCache<S = any>({
  middlewareOption = {},
  cacheOption = {},
}: {
  middlewareOption?: MiddlewareOption<S>;
  cacheOption?: Record<string, any>;
}): Middleware {
  const { excludes, fromCache, toCache, resetCache } = middlewareOption;
  const cache = createCache(cacheOption);
  return ({ getState }) => (next) => (action: Actions) => {
    if (action.type !== SPECTER) return next(action);

    const { type, service, query } = action.payload;

    if (resetCache && resetCache(action, getState())) {
      resetCacheData();
    }

    if (
      type !== "read" ||
      (type === "read" && excludes && excludes.includes(service))
    ) {
      return next(action);
    }

    const cacheKey = `@@$${SPECTER}/${service}@@${JSON.stringify(
      query,
      // refs: https://github.com/recruit-tech/redux-effects-fetchr-cache/pull/3
      Object.keys(query).sort()
    )}`;

    // MEMO: you can resolve cache from action and state of store.
    //       if you dont set the fromCache function, always called cache.get function.
    const manualCache = fromCache && fromCache(action, getState());
    if (!fromCache || manualCache) {
      const cacheResult = cache.get(cacheKey);
      if (cacheResult) {
        return Promise.resolve(cacheResult);
      }
    }

    // CAUTION: this middleware depend on the "@specter/redux-effects-specter"
    //          and "@specter/redux-effects-specter" is expected next applied self.
    return ((next(action) as any) as Promise<Response<any, any>>).then(
      (resp) => {
        const manualCache = toCache && toCache(action, getState());
        if (!toCache || manualCache) {
          cache.put(cacheKey, resp);
        }
        return resp;
      }
    );
  };
}
