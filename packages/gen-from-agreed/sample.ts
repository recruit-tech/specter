import { APIDef, GET, Success200, ResponseDef } from "@agreed/typed";

type Sample = APIDef<
  GET,
  ["api", "master", "corporation_kinds"],
  {},
  {},
  undefined,
  {},
  ResponseDef<
    Success200,
    {
      ok: number;
    }
  >
>;

const api: Array<Sample> = [
  {
    request: {
      path: ["api", "master", "corporation_kinds"],
      method: "GET",
      body: undefined
    },
    response: {
      status: 200,
      body: {
        ok: 1
      }
    }
  }
];

module.exports = api;
