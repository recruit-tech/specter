import { Cacheable } from "./cache";
import { LRUCache } from "./memstorage/lrucache";
import { TimerCache } from "./memstorage/timercache";
export declare class Storage<K, V> {
    storage: Cacheable<K, V>;
    constructor(opts: {
        storage?: Cacheable<K, V>;
    });
    store(key: K, value: V, opts?: {}): void;
    get(key: K, opts?: {}): Promise<V | null>;
    purge(key: K): void;
    purgeAll(): void;
}
export { LRUCache, Cacheable, TimerCache };
