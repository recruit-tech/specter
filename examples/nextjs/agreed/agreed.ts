import { convert } from "agreed-typed";
import { flatten } from "lodash";

module.exports = convert(
  ...flatten([
    require("./counter.ts"),
  ]),
);