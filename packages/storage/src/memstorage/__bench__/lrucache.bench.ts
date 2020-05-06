import { LRUCache } from "../lrucache";
import { performance, PerformanceObserver } from "perf_hooks";
const max = 10000;
const arr: Array<string> = [];
for (let i = 1; i <= max; i++) {
  arr.push(`${i}`);
}

function main() {
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  const start = process.memoryUsage().heapUsed;
  console.log(process.memoryUsage());
  const lrucache: LRUCache<any, any> | null = new LRUCache({ limit: max });
  for (const a of arr) {
    lrucache!.put(a, a);
  }
  lrucache.clearAll();
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  let end = process.memoryUsage().heapUsed;
  console.log(end - start);
  console.log(process.memoryUsage());
  global.gc();
  end = process.memoryUsage().heapUsed;
  console.log(end - start);
  console.log(process.memoryUsage());
  global.gc();
}
main();