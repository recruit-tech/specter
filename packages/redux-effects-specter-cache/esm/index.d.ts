import { Middleware } from "redux";
import { SPECTER, Payload } from "@specter/redux-effects-specter";
declare type SpecterAction = {
  type: typeof SPECTER;
  payload: Payload<any, any, any>;
  meta?: Record<string, any>;
  error?: boolean;
};
export interface CacheResolver<S extends Record<string, any>> {
  (action: SpecterAction, state: S): boolean;
}
export declare type MiddlewareOption<S> = {
  excludes?: Array<string>;
  fromCache?: CacheResolver<S>;
  toCache?: CacheResolver<S>;
  resetCache?: CacheResolver<S>;
};
export declare function resetCacheData(): void;
export default function reduxEffectsSpecterCache<S = any>({
  middlewareOption,
  cacheOption,
}: {
  middlewareOption?: MiddlewareOption<S>;
  cacheOption?: Record<string, any>;
}): Middleware;
export {};
