/* eslint-disable @typescript-eslint/explicit-function-return-type */
// This Storage keeps cache in expiredAt time.
import { Cacheable } from "../cache";

export class Entry<V> {
  expiredAt: number;
  data: V;
  constructor(data: V, expiredSec: number) {
    this.expiredAt = Date.now() + expiredSec * 1000;
    this.data = data;
  }
  get(): V | null {
    if (this.expiredAt > Date.now()) {
      return this.data;
    }
    return null;
  }
}

export class TimerCache<K, V> implements Cacheable<K, V> {
  cache: Map<K, Entry<V>>;
  limit: number;
  timers: Map<K, NodeJS.Timeout>;

  constructor(opts?: { limit?: number }) {
    this.cache = new Map();
    this.limit = opts?.limit || 100;
    this.timers = new Map();
  }
  put(key: K, value: V, options?: { expiredSec?: number }) {
    const expiredSec = options?.expiredSec || Infinity;
    const entry = new Entry(value, expiredSec);
    if (expiredSec !== Infinity) {
      const timer = setTimeout(
        key => {
          this.delete(key);
        },
        expiredSec,
        key
      );
      this.timers.set(key, timer);
    }
    this.cache.set(key, entry);
    if (this.limit < this.cache.size) {
      const head = this.cache.keys().next().value;
      this.cache.delete(head);
    }
    return Promise.resolve(null);
  }
  get(key: K) {
    const entry = this.cache.get(key);
    if (entry == null) {
      return Promise.resolve(null);
    }
    return Promise.resolve(entry.get());
  }
  delete(key: K) {
    this.cache.delete(key);
    const timeout = this.timers.get(key);
    if (timeout) {
      clearTimeout(timeout);
    }
    this.timers.delete(key);
    return Promise.resolve(null);
  }
  clearAll() {
    const keys = Array.from(this.cache.keys());
    keys.forEach(key => {
      this.delete(key);
    });
    return Promise.resolve(null);
  }
}
