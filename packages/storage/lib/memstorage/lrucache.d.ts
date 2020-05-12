/// <reference types="node" />
import { LinkedList, Entry } from "./linkedlist";
import { Cacheable } from "../cache";
export declare class LRUCache<K, V> implements Cacheable<K, V> {
    lruCacheList: LinkedList<{
        key: string;
        value: V;
    }>;
    lruCacheMap: Map<string, Entry<{
        key: string;
        value: V;
    }>>;
    timers: Map<string, NodeJS.Timeout>;
    limit: number;
    identify?: (key: K) => string;
    serialize?: (value: V) => string;
    deserialize?: (value: string) => V;
    constructor(opts?: {
        limit?: number;
        identify?: (key: K) => string;
        serialize?: (value: V) => string;
        deserialize?: (value: string) => V;
    });
    put(key: K, value: V, options?: {
        identify?: (key: K) => string;
        ttl?: number;
    }): Promise<null>;
    get(key: K, options?: {
        identify?: (key: K) => string;
    }): Promise<null> | Promise<V>;
    delete(key: K, options?: {
        identify?: (key: K) => string;
    }): Promise<null>;
    private _delete;
    clearAll(): Promise<null>;
}
