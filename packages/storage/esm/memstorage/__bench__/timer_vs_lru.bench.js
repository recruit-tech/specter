import { LRUCache } from "../lrucache";
import { TimerCache } from "../timercache";
var max = 1000;
var arr = [];
var disc = [];
for (var i = 1; i <= max; i++) {
    arr.push("" + i);
}
function benchLRUCache() {
    var lrucache = new LRUCache({ limit: 1000 });
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var a = arr_1[_i];
        lrucache.put(a, a);
    }
    for (var _a = 0, arr_2 = arr; _a < arr_2.length; _a++) {
        var a = arr_2[_a];
        disc.push(lrucache.get(a));
    }
}
function benchTimerCache() {
    var cache = new TimerCache({ limit: 1000 });
    for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
        var a = arr_3[_i];
        cache.put(a, a);
    }
    for (var _a = 0, arr_4 = arr; _a < arr_4.length; _a++) {
        var a = arr_4[_a];
        disc.push(cache.get(a));
    }
}
function main() {
    global.gc();
    console.time("timer");
    for (var i = 0; i < 100; i++) {
        benchTimerCache();
    }
    console.log(process.memoryUsage().heapUsed / (1024 * 1024));
    console.timeEnd("timer");
    global.gc();
    global.gc();
    console.time("lru");
    for (var i = 0; i < 100; i++) {
        benchLRUCache();
    }
    console.log(process.memoryUsage().heapUsed / (1024 * 1024));
    console.timeEnd("lru");
    global.gc();
}
// timer: 5.484s
// lru: 1.154s
main();
