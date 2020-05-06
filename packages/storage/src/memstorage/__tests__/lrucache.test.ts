import assert from "assert";
import { LRUCache } from "../lrucache";

describe.each([
  [
    [[1, 2], [2, 3], [3, 4]], // initial data
    { limit: 3 }, // option
    [[5, 6]], // new data
    [[2, 3], [3, 4], [5, 6]] // result
  ],
])("lrucache", () => {
});
