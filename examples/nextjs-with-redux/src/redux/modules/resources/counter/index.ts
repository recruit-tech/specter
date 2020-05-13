import { steps } from "redux-effects-steps";
import { actionCreatorFactory } from "typescript-fsa";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { specterRead, specterUpdate } from "@specter/redux-effects-specter";
import { ResourceStateType } from "../../../../utils/types/StateType";
import { FixMe } from "../../../../utils/types/FixMe";

/**
 * actions
 */
const actionCreator = actionCreatorFactory("COUNTER");

const ready = actionCreator("READY");
const success = actionCreator<{ count: number }>("SUCCESS");
const failure = actionCreator<FixMe>("FAILURE", {}, true);

/**
 * steps
 */
export function readCount() {
  return steps(
    //
    ready(),
    specterRead("counter"),
    [success, failure]
  );
}

export function updateCount() {
  return steps(
    //
    ready(),
    specterUpdate("counter"),
    [success, failure]
  );
}

/**
 * state
 */
export type State = ResourceStateType<{
  count: number;
}>;

export const INITIAL_STATE: State = {
  data: {
    count: 0,
  },
  meta: {
    loading: false,
    errors: [],
  },
};

/**
 * reducer
 */
export const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(ready, (state) => ({
    ...state,
    meta: {
      ...state.meta,
      loading: true,
    },
  }))
  .case(success, (state, data) => ({
    ...state,
    data,
    meta: {
      ...state.meta,
      loading: false,
    },
  }))
  .case(failure, (state, { errors }) => ({
    ...state,
    meta: {
      loading: false,
      errors,
    },
  }));
