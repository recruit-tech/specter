import { Dispatch } from "redux";
import { NextPageContext } from "next";
import { getOrCreateStore } from "../redux/createStore";
import { isServer } from "./constants/runtimeCondition";

export function initialSteps(...actions: Array<Function>) {
  return async ({ dispatch }: { dispatch: Dispatch }) => {
    const promises = [];
    for (const act of actions) {
      const p = dispatch(act());
      promises.push(p);
    }
    if (isServer) await Promise.all(promises);
    return { pageLoaded: true };
  };
}

export function initialServerOnlySteps(...actions: Array<Function>) {
  return async () => {
    if (!isServer)
      throw new Error("this function should call from server as bff");
    const promises = [];
    const store = getOrCreateStore();
    for (const act of actions) {
      const p = store.dispatch(act());
      promises.push(p);
    }
    await Promise.all(promises);
    return { props: { pageLoaded: true } };
  };
}

/**
 * URL直リンなどしてきた時に任意のURLにリダイレクトさせる
 * getInitialPropsで使うことを期待した関数
 * @param redirectPath
 */
export const redirectOnServer =
  (redirectPath: string) => (ctx: NextPageContext) => {
    if (isServer) {
      ctx.res.writeHead(301, { Location: redirectPath });
      ctx.res.end();
      return { redirected: true };
    } else {
      return { redirected: false };
    }
  };
