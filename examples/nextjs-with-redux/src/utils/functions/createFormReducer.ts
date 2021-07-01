import { FormStateType, ValidationResultType } from "../types/StateType";

// 引数2つでこの関数を使うときは，3つめの型引数を使わないので default を any としておく
export const createFormReducer = <
  S extends FormStateType<Record<string, any>, any>,
  V,
  P = any
>(
  keyName: string,
  decideNextValue: (stateAndPayload: { state: S; payload: P }) => {
    state: S;
    payload: V;
  },
  validator?: (args: S["form"]["value"]) => ValidationResultType
): ((state: S, payload: P) => S) => {
  return (state: S, payload: P) => {
    const nextValue = {
      ...state.form.value,
      [keyName]: decideNextValue({ state, payload }).payload,
    };
    const nextForm = {
      value: nextValue,
      validationResults:
        typeof validator !== "undefined"
          ? {
              ...state.form.validationResults,
              [keyName]: validator(nextValue),
            }
          : state.form.validationResults,
    };
    return {
      ...state,
      form: nextForm,
    };
  };
};

/**
 * decideNextValueのヘルパー
 * 指定した長さより大きい入力は入力不可とする
 * @param maxLength
 */
export const decideNextValueWithMaxLength =
  (maxLength: number) =>
  ({ state, payload }: { state: any; payload: any }) => {
    if (payload && payload.length > maxLength) {
      return { state, payload: payload.slice(0, maxLength) };
    } else {
      return { state, payload: payload };
    }
  };

/**
 * decideNextValueのヘルパー
 * 半角数字以外は入力できない
 */
export const decideNextValueOnlyNumber = ({
  state,
  payload,
}: {
  state: any;
  payload: any;
}) => {
  return { state, payload: payload.replace(/\D/g, "") };
};
