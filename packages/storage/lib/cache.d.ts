export interface SpecterCache<K, V> {
    put(key: K, value: V): void;
    get(key: K): V | null;
    delete(key: K): void;
    clearAll(): void;
}
