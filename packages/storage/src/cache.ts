export interface Cacheable<K, V> {
  put(key: K, value: V, options?: {}): void;
  get(key: K, options?: {}): V | null;
  delete(key: K, options?: {}): void;
  clearAll(): void;
}
