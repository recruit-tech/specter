import { parseFromPath, buildFromAST } from "../src/";

console.log(process.argv[2]);

const a = parseFromPath(process.argv[2]);

if (a) {
  console.log(a.requestBody)
}

buildFromAST()
