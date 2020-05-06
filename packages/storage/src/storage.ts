/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Cacheable } from "./memstorage/cache";
import { LRUCache } from "./memstorage/lrucache";
import { TimerCache } from "./memstorage/timercache";
import { MemStorage } from "./memstorage";

export class Storage<K, V> {
  storage: Cacheable<K, V>;
  constructor(opts: { storage?: Cacheable<K, V> }) {
    this.storage =
      opts.storage ||
      new MemStorage<K, V>({
        shortlife: { limit: 100 },
        longlife: { limit: 10 }
      });
  }

  store(key: K, value: V, opts?: {}) {
    this.storage.put(key, value, opts);
  }

  get(key: K, opts?: {}) {
    return this.storage.get(key, opts);
  }

  purge(key: K) {
    this.storage.delete(key);
  }

  purgeAll() {
    this.storage.clearAll();
  }
}

export { LRUCache, Cacheable, TimerCache, MemStorage };
