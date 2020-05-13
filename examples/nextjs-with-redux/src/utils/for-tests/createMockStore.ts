import {
  Middleware,
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from "redux";
import reduxEffectsSteps from "redux-effects-steps";
import { INITIAL_STATE, reducer } from "../../redux/modules";

export function createMockStore(...tester: Middleware[]) {
  const middlewares = [
    //
    reduxEffectsSteps,
    ...tester,
  ].filter(Boolean);

  const store = createReduxStore(
    reducer,
    INITIAL_STATE,
    compose(applyMiddleware(...middlewares))
  );

  return store;
}
