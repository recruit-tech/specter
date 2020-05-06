/* eslint-disable @typescript-eslint/explicit-function-return-type */
// This Storage uses lru cache algorithm.
import { LinkedList, Entry } from "./linkedlist";
import { Cacheable } from "./cache";

export class LRUCache<K, V> implements Cacheable<K, V> {
  lruCacheList: LinkedList<{ key: K; value: V }>;
  lruCacheMap: Map<K, Entry<{ key: K; value: V }>>;
  timers: Map<K, NodeJS.Timeout>;
  limit: number;

  constructor(opts?: { limit?: number }) {
    this.lruCacheList = new LinkedList();
    this.lruCacheMap = new Map();
    this.timers = new Map();
    this.limit = opts?.limit || 100;
  }
  put(key: K, value: V, options?: { expiredSec?: number }) {
    const entry = this.lruCacheMap.get(key);
    if (entry) {
      this.lruCacheList.remove(entry);
    }
    const newEntry = this.lruCacheList.unshift({ key, value });
    this.lruCacheMap.set(key, newEntry);
    if (this.lruCacheList.length > this.limit) {
      const entry = this.lruCacheList.pop();
      if (entry) {
        this.lruCacheMap.delete(entry.data.key);
      }
    }
    const expiredSec = options?.expiredSec || Infinity;
    if (expiredSec !== Infinity) {
      const timer = setTimeout(
        key => {
          this.delete(key);
        },
        expiredSec * 1000,
        key
      );
      this.timers.set(key, timer);
    }
  }
  get(key: K) {
    const entry = this.lruCacheMap.get(key);
    if (!entry) {
      return null;
    }
    this.lruCacheList.remove(entry);
    this.lruCacheList.unshift(entry.data);
    return entry.data.value;
  }
  delete(key: K) {
    const entry = this.lruCacheMap.get(key);
    if (!entry) {
      return entry;
    }
    this.lruCacheList.remove(entry);
    this.lruCacheMap.delete(key);

    const timeout = this.timers.get(key);
    if (timeout) {
      clearTimeout(timeout);
    }
    this.timers.delete(key);
  }
  clearAll() {
    const keys = Array.from(this.lruCacheMap.keys());
    keys.forEach(key => {
      this.delete(key);
    });
  }
}
