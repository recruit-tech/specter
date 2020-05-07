/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Cacheable } from "./cache";
import { LRUCache } from "./memstorage/lrucache";
import { TimerCache } from "./memstorage/timercache";

export class Storage<K, V> {
  storage: Cacheable<K, V>;
  constructor(opts: { storage?: Cacheable<K, V> }) {
    this.storage = opts.storage || new LRUCache<K, V>({});
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

export { LRUCache, Cacheable, TimerCache };
