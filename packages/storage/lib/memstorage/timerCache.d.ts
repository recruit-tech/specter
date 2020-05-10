/// <reference types="node" />
import { Cacheable } from "../cache";
export declare class Entry<V> {
    expiredAt: number;
    data: V;
    constructor(data: V, expiredSec: number);
    get(): V | null;
}
export declare class TimerCache<K, V> implements Cacheable<K, V> {
    cache: Map<K, Entry<V>>;
    limit: number;
    timers: Map<K, NodeJS.Timeout>;
    constructor(opts?: {
        limit?: number;
    });
    put(key: K, value: V, options?: {
        expiredSec?: number;
    }): Promise<null>;
    get(key: K): Promise<V | null>;
    delete(key: K): Promise<null>;
    clearAll(): Promise<null>;
}
