import Redis, { RedisOptions } from "ioredis";
import { Cacheable } from "@specter/storage";
export declare class RedisCache<K, V> implements Cacheable<K, V> {
  redis: Redis.Redis;
  identify?: (key: K) => Redis.KeyType;
  serialize?: (value: V) => string;
  deserialize?: (value: string) => V;
  constructor(
    opts: RedisOptions & {
      identify?: (key: K) => Redis.KeyType;
      serialize?: (value: V) => string;
      deserialize?: (value: string) => V;
    }
  );
  put(
    key: K,
    value: V,
    options?: {
      identify?: (key: K) => Redis.KeyType;
      serialize?: (value: V) => string;
      ttl?: number;
    }
  ): Promise<"OK">;
  get(
    key: K,
    options?: {
      identify?: (key: K) => Redis.KeyType;
      deserialize?: (v: string) => V;
    }
  ): Promise<V | null>;
  delete(
    key: K,
    options?: {
      identify?: (key: K) => Redis.KeyType;
    }
  ): Promise<number>;
  clearAll(): Promise<number[]>;
  close(): Promise<"OK">;
}
