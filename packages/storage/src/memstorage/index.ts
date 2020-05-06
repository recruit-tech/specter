/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Cacheable } from "./cache";
import { LRUCache, TimerCache } from "../storage";

export class MemStorage<K, V> implements Cacheable<K, V> {
  shortlife: LRUCache<K, V>;
  longlife: TimerCache<K, V>;
  constructor(opts: {
    shortlife?: { limit: number };
    longlife?: { limit: number };
  }) {
    this.shortlife = new LRUCache(opts.shortlife);
    this.longlife = new TimerCache(opts.longlife);
  }
  put(
    key: K,
    value: V,
    options?: {
      life?: "shortlife" | "longlife";
      expiredSec?: number;
    }
  ) {
    const life = options?.life || "shortlife";
    if (life === "shortlife") {
      return this.shortlife.put(key, value, options);
    }
    return this.longlife.put(key, value, options);
  }
  get(
    key: K,
    options?: {
      life: "shortlife" | "longlife";
    }
  ) {
    const life = options?.life || "shortlife";
    if (life === "shortlife") {
      return this.shortlife.get(key);
    }
    return this.longlife.get(key);
  }
  delete(key: K) {
    this.shortlife.delete(key);
    this.longlife.delete(key);
  }
  clearAll() {
    this.shortlife.clearAll();
    this.longlife.clearAll();
  }
}
