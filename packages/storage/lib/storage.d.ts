import { Cacheable } from "./memstorage/cache";
import { LRUCache } from "./memstorage/lrucache";
import { TimerCache } from "./memstorage/timercache";
import { MemStorage } from "./memstorage";
export declare class Storage<K, V> {
    storage: Cacheable<K, V>;
    constructor(opts: {
        storage?: Cacheable<K, V>;
    });
    store(key: K, value: V, opts?: {}): void;
    get(key: K, opts?: {}): V | null;
    purge(key: K): void;
    purgeAll(): void;
}
export { LRUCache, Cacheable, TimerCache, MemStorage };
