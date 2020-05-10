/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Redis, { RedisOptions } from "ioredis";
import { Cacheable } from "@specter/storage";

export class RedisCache<K extends Redis.KeyType, V> implements Cacheable<K, V> {
  redis: Redis.Redis;
  constructor(opts: RedisOptions) {
    this.redis = new Redis(opts);
  }

  put(
    key: K,
    value: V,
    options: {
      serialize: (value: V) => string;
      expireyMode?: string | unknown[];
      setMode?: number | string;
      time?: number | string;
    }
  ) {
    const { serialize, expireyMode, setMode, time } = options;

    const v = serialize(value);
    return this.redis.set(key, v, expireyMode, time, setMode);
  }
  async get(key: K, options: { deserialize: (v: string) => V }) {
    const v = await this.redis.get(key);
    if (v == null) {
      return v;
    }
    return options.deserialize(v);
  }
  delete(key: K) {
    return this.redis.del(key);
  }
  async clearAll() {
    const keys = await this.redis.keys("*");
    const dels = [];
    for (const key of keys) {
      dels.push(this.redis.del(key));
    }
    return Promise.all(dels);
  }
  close() {
    return this.redis.quit();
  }
}
