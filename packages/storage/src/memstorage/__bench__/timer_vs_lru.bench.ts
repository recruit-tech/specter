import { LRUCache } from "../lrucache";
import { TimerCache } from "../timercache";
const max = 100000;
const arr: Array<string> = [];
const disc = [];
for (let i = 1; i <= max; i++) {
  arr.push(`${i}`);
}

function benchLRUCache() {
  const lrucache: LRUCache<any, any> | null = new LRUCache({ limit: 10});
  for (const a of arr) {
    lrucache!.put(a, a, { expiredSec: 10 });
  }
  for (const a of arr) {
    disc.push(lrucache!.get(a));
  }
}

function benchTimerCache() {
  const cache: TimerCache<any, any> | null = new TimerCache({ limit: 10 });
  for (const a of arr) {
    cache!.put(a, a, { expiredSec: 10 });
  }
  for (const a of arr) {
    disc.push(cache!.get(a));
  }
}

function main() {
  global.gc();
  console.time("timer")
  for (let i = 0; i < 100; i++) {
    benchTimerCache();
  }
  console.log(process.memoryUsage().heapUsed / (1024 * 1024));
  console.timeEnd("timer")
  global.gc();

  global.gc();
  console.time("lru")
  for (let i = 0; i < 100; i++) {
    benchLRUCache();
  }
  console.log(process.memoryUsage().heapUsed / (1024 * 1024));
  console.timeEnd("lru")
  global.gc();

}


// timer: 5.484s
// lru: 1.154s
main();