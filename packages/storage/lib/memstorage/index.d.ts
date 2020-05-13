import { Cacheable } from "./cache";
import { LRUCache, TimerCache } from "../storage";
export declare class MemStorage<K, V> implements Cacheable<K, V> {
  shortlife: LRUCache<K, V>;
  longlife: TimerCache<K, V>;
  constructor(opts: {
    shortlife?: {
      limit: number;
    };
    longlife?: {
      limit: number;
    };
  });
  put(
    key: K,
    value: V,
    options?: {
      life?: "shortlife" | "longlife";
      expiredSec?: number;
    }
  ): void;
  get(
    key: K,
    options?: {
      life: "shortlife" | "longlife";
    }
  ): V | null;
  delete(key: K): void;
  clearAll(): void;
}
