import { reducerWithInitialState } from "typescript-fsa-reducers";

export type State = {
  _csrf: string;
};

/**
 * CAUTION:
 * config は 常に BFF から hydrate されるべき．
 * クライアントから操作することはしないこと
 */
export const INITIAL_STATE: State = {
  _csrf: "",
};

export const reducer = reducerWithInitialState(INITIAL_STATE);
