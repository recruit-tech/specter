"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lrucache_1 = require("../lrucache");
var max = 10000;
var arr = [];
for (var i = 1; i <= max; i++) {
  arr.push("" + i);
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
  var start = process.memoryUsage().heapUsed;
  console.log(process.memoryUsage());
  var lrucache = new lrucache_1.LRUCache({ limit: max });
  for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
    var a = arr_1[_i];
    lrucache.put(a, a);
  }
  lrucache.clearAll();
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  global.gc();
  var end = process.memoryUsage().heapUsed;
  console.log(end - start);
  console.log(process.memoryUsage());
  global.gc();
  end = process.memoryUsage().heapUsed;
  console.log(end - start);
  console.log(process.memoryUsage());
  global.gc();
}
main();
