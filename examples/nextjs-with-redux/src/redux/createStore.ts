/* istanbul ignore file */

import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from "redux";
import reduxActionTiming from "redux-action-timing-middleware";
import reduxEffectsSteps, { AnyAction } from "redux-effects-steps";
import reduxEffectsUploader, {
  Config as UploaderConfig,
} from "redux-effects-formdata-uploader";
import reduxEffectsSpecter from "@specter/redux-effects-specter";
import reduxEffectsSpecterCache from "@specter/redux-effects-specter-cache";
import { composeWithDevTools } from "redux-devtools-extension";
import Client from "@specter/client";
import { reducer, RootState, INITIAL_STATE } from "./modules";
import { isClient, isServer } from "../utils/constants/runtimeCondition";

const enhancedCompose =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools({
        trace: true,
      })
    : compose;

const cacheOption = {
  max: 100,
  maxAge: isServer ? 1000 * 60 * 60 : 1000 * 60,
};

const cacheMiddlewareConfig = isServer
  ? {
      toCache: (action: AnyAction) =>
        action.payload.service.startsWith("master."),
    }
  : {
      resetCache: (action: AnyAction) => action.payload.type !== "read",
    };

function createStore(initialState: RootState) {
  const uploaderConfig: UploaderConfig = {
    csrfToken: initialState.config._csrf,
  };

  const client = new Client({
    base: "/xhr",
    fetchOptions: {
      credentials: "include",
      headers: {
        "CSRF-Token": initialState.config._csrf,
        "Keep-Alive": "timeout=5, max=1000",
        "Cache-Control": "no-store",
        Connection: "Keep-Alive",
      },
    },
    validateStatus: (status: number) => status < 400,
  });

  const middlewares = [
    //
    isClient && process.env.NODE_ENV !== "production" && reduxActionTiming(),
    reduxEffectsSteps,
    reduxEffectsSpecterCache({
      cacheOption,
      middlewareOption: cacheMiddlewareConfig,
    }),
    reduxEffectsSpecter(client),
    isClient && reduxEffectsUploader(uploaderConfig),
  ].filter(Boolean);

  const store = createReduxStore(
    reducer,
    initialState,
    enhancedCompose(applyMiddleware(...middlewares))
  );

  return store;
}

const __NEXT_REDUX_STORE_STATE__ = "__NEXT_REDUX_STORE_STATE__";

let serverSideStore: ReturnType<typeof createStore>;

export function getOrCreateStore(initialReduxState: RootState = INITIAL_STATE) {
  if (isServer) {
    if (!serverSideStore) {
      serverSideStore = createStore(initialReduxState);
    }
    return serverSideStore;
  } else if (!window[__NEXT_REDUX_STORE_STATE__]) {
    window[__NEXT_REDUX_STORE_STATE__] = createStore(initialReduxState);
  }
  return window[__NEXT_REDUX_STORE_STATE__];
}
