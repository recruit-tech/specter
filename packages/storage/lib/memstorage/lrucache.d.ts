/// <reference types="node" />
import { LinkedList, Entry } from "./linkedlist";
import { Cacheable } from "../cache";
export declare class LRUCache<K, V> implements Cacheable<K, V> {
    lruCacheList: LinkedList<{
        key: K;
        value: V;
    }>;
    lruCacheMap: Map<K, Entry<{
        key: K;
        value: V;
    }>>;
    timers: Map<K, NodeJS.Timeout>;
    limit: number;
    constructor(opts?: {
        limit?: number;
    });
    put(key: K, value: V, options?: {
        expiredSec?: number;
    }): void;
    get(key: K): V | null;
    delete(key: K): undefined;
    clearAll(): void;
}
