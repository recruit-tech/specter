import { useDispatch } from "react-redux";
import { useCallback } from "react";
import throttle from "lodash.throttle";

/**
 * useStep - steps を Container で 使うときのヘルパ
 * @param steps - {T => any}
 * @param payload - {T} steps の引数 かつ useCallback の deps
 * @example
 *
 * import { fetchToServer } from 'path/to/redux/modules/someModule'
 *
 * const useStateAndHandlers = () => {
 *   const value = useSelector(state => state.path.to.value)
 *
 * // 第2引数は stepsの引数 + useCallback の deps //~~~~~//
 *   const doSomeThing = useStep(fetchToServer, value)
 *                    //~~~~~~~~// useStep は useDispatch + useCallback
 *
 *   ・・・ 省略 ・・・
 * }
 *
 * // someModule.ts - - -
 *
 * export function fetchToServerSteps(args: string) {
 *   return steps(
 *     ready,
 *     specterCreate('service', { body: args }),
 *     [success, failure],
 *   )
 * }
 */
export function useStep<T extends Record<string, any>>(
  steps: (args: T) => any,
  payload?: T
) {
  const dispatch = useDispatch();
  const stepWithDispatch = throttle(() => {
    dispatch(steps(payload));
  }, 100);
  return useCallback(stepWithDispatch, Object.values(payload));
}
