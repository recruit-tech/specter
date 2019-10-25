import { Middleware, AnyAction } from "redux";
import LRUCache from "lru-cache";
export interface CacheResolver<S extends Record<string, any>> {
    (action: AnyAction, state: S): boolean;
}
export declare type MiddlewareOption<S> = {
    excludes?: string[];
    fromCache?: string[];
    toCache?: CacheResolver<S>;
    resetCache?: CacheResolver<S>;
};
export default function reduxEffectsSpecterCache<S = any>({ middlewareOption, cacheOption, }: {
    middlewareOption?: MiddlewareOption<S>;
    cacheOption?: LRUCache.Options<string, Record<string, any>>;
}): Middleware;
