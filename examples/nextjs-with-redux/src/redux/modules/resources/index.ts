import { combineReducers } from "redux";
import { INITIAL_STATE as SAMPLE_STATE, reducer as sample } from "./sample";
import { INITIAL_STATE as COUNT_STATE, reducer as count } from "./counter";

export const INITIAL_STATE = {
  sample: SAMPLE_STATE,
  count: COUNT_STATE,
};

export const reducer = combineReducers({
  sample,
  count,
});

export type ResourceRootState = ReturnType<typeof reducer>;
