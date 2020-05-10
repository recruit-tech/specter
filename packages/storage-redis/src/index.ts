/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Redis, { RedisOptions } from "ioredis";
import { Cacheable } from "@specter/storage";

export class RedisCache<K, V> implements Cacheable<K, V> {
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
  ) {
    this.redis = new Redis(opts);
    this.identify = opts.identify;
    this.serialize = opts.serialize;
    this.deserialize = opts.deserialize;
  }

  put(
    key: K,
    value: V,
    options?: {
      identify?: (key: K) => Redis.KeyType;
      serialize?: (value: V) => string;
      expireyMode?: string | unknown[];
      setMode?: number | string;
      time?: number | string;
    }
  ) {
    const identify = options?.identify || this.identify;
    const serialize = options?.serialize || this.serialize;
    const expireyMode = options?.expireyMode;
    const setMode = options?.setMode;
    const time = options?.time;

    const k = identify ? identify(key) : key + "";
    const v = serialize ? serialize(value) : value + "";
    return this.redis.set(k, v, expireyMode, time, setMode);
  }
  async get(
    key: K,
    options?: {
      identify?: (key: K) => Redis.KeyType;
      deserialize?: (v: string) => V;
    }
  ) {
    const identify = options?.identify || this.identify;
    const k = identify ? identify(key) : key + "";
    const v = await this.redis.get(k);
    if (v == null) {
      return v;
    }
    const deserialize = options?.deserialize || this.deserialize;
    const value = deserialize ? deserialize(v) : ((v as unknown) as V);
    return value;
  }
  delete(
    key: K,
    options?: {
      identify?: (key: K) => Redis.KeyType;
    }
  ) {
    const identify = options?.identify || this.identify;
    const k = identify ? identify(key) : key + "";
    return this.redis.del(k);
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
