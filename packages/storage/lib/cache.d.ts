export interface Cacheable<K, V> {
    put(key: K, value: V, options?: {}): Promise<unknown>;
    get(key: K, options?: {}): Promise<V | null>;
    delete(key: K, options?: {}): Promise<unknown>;
    clearAll(): Promise<unknown>;
}
