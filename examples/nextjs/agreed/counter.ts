import {
  APIDef,
  PUT,
  Success200,
  ResponseDef,
  Error404,
  Capture,
} from "@agreed/typed";

export type RequestBody = { count: Capture<"count", number> };
export type ResponseBody = { results: { count: Capture<"count", number> } };

export type AgreedSampleGetAPI = APIDef<
  PUT, // HTTP Method
  ["counter"],
  {}, // request header
  {}, // request query
  RequestBody, // request body
  {}, // response header
  ResponseDef<Success200, ResponseBody> | ResponseDef<Error404, ResponseBody> // response
>;

const api: AgreedSampleGetAPI = {
  request: {
    path: ["counter"],
    method: "PUT",
    body: {
      count: "{:count}",
    },
  },
  response: {
    status: 200,
    body: {
      results: {
        count: "{:count}",
      },
    },
    values: {
      count: 123,
    },
  },
};

module.exports = api;
