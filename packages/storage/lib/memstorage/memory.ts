// This Storage uses lru cache algorithm.
import { LinkedList, Entry } from "./linkedlist";
export class MemoryStorage<K, V> {
  cacheList: LinkedList<{key: K, value: V}>;
  cacheMap: Map<K, Entry<{key: K, value: V}>>;
  limit: number;

  constructor(opts: { limit?: number }) {
    this.cacheList = new LinkedList();
    this.cacheMap = new Map();
    this.limit = opts.limit || 100;
  }
  put(key: K, value: V) {
    const entry = this.cacheList.unshift({key, value});
    this.cacheMap.set(key, entry);
    if (this.cacheList.length > this.limit) {
      const entry = this.cacheList.pop();
      if (entry) {
        this.cacheMap.delete(entry.data.key);
      }
    }
  }
  get(key: K) {
    const entry = this.cacheMap.get(key);
    if (!entry) {
      return entry;
    }
    this.cacheList.remove(entry);
    this.cacheList.unshift(entry.data);
  }
}
