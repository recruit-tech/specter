/* eslint-disable @typescript-eslint/explicit-function-return-type */
// This Storage uses lru cache algorithm.
import { LinkedList, Entry } from "./linkedlist";
import { Cacheable } from "../cache";

export class LRUCache<K, V> implements Cacheable<K, V> {
  lruCacheList: LinkedList<{ key: string; value: V }>;
  lruCacheMap: Map<string, Entry<{ key: string; value: V }>>;
  timers: Map<string, number>;
  limit: number;
  identify?: (key: K) => string;
  serialize?: (value: V) => string;
  deserialize?: (value: string) => V;

  constructor(opts?: {
    limit?: number;
    identify?: (key: K) => string;
    serialize?: (value: V) => string;
    deserialize?: (value: string) => V;
  }) {
    this.lruCacheList = new LinkedList();
    this.lruCacheMap = new Map();
    this.timers = new Map();
    this.limit = opts?.limit || 100;
    this.identify = opts?.identify;
    this.serialize = opts?.serialize;
  }
  put(
    key: K,
    value: V,
    options?: {
      identify?: (key: K) => string;
      ttl?: number;
    }
  ) {
    const identify = options?.identify || this.identify;

    const k = identify ? identify(key) : key + "";

    const entry = this.lruCacheMap.get(k);
    if (entry) {
      this.lruCacheList.remove(entry);
    }
    const newEntry = this.lruCacheList.unshift({ key: k, value });
    this.lruCacheMap.set(k, newEntry);
    if (this.lruCacheList.length > this.limit) {
      const entry = this.lruCacheList.pop();
      if (entry) {
        this.lruCacheMap.delete(entry.data.key);
      }
    }
    const ttl = options?.ttl || Infinity;
    if (ttl !== Infinity) {
      const timer = setTimeout(
        (k: K) => {
          this.delete(k);
        },
        ttl,
        k
      );
      this.timers.set(k, timer);
    }
    return Promise.resolve(null);
  }
  get(
    key: K,
    options?: {
      identify?: (key: K) => string;
    }
  ) {
    const identify = options?.identify || this.identify;

    const k = identify ? identify(key) : key + "";
    const entry = this.lruCacheMap.get(k);
    if (!entry) {
      return Promise.resolve(null);
    }
    this.lruCacheList.remove(entry);
    const newEntry = this.lruCacheList.unshift(entry.data);
    this.lruCacheMap.set(k, newEntry);
    return Promise.resolve(entry.data.value);
  }
  delete(
    key: K,
    options?: {
      identify?: (key: K) => string;
    }
  ) {
    const identify = options?.identify || this.identify;
    const k = identify ? identify(key) : key + "";
    this._delete(k);
    return Promise.resolve(null);
  }

  private _delete(k: string) {
    const entry = this.lruCacheMap.get(k);
    if (!entry) {
      return Promise.resolve(entry);
    }
    this.lruCacheList.remove(entry);
    this.lruCacheMap.delete(k);

    const timeout = this.timers.get(k);
    if (timeout) {
      clearTimeout(timeout);
    }
    this.timers.delete(k);
  }

  clearAll() {
    const keys = Array.from(this.lruCacheMap.keys());
    keys.forEach((key) => {
      this._delete(key);
    });
    return Promise.resolve(null);
  }
}
