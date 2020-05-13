import assert from "assert";
import { unexpectedErrorHandler } from "../unexpectedErrorHandler";

describe("unexpectedErrorHandler", () => {
  it("matcher works", () => {
    const matcher = unexpectedErrorHandler[0];
    const actual = matcher(new Error("foo"));
    assert.ok(actual);
  });

  it("handler works when got instanceof Error", (done) => {
    const handler = unexpectedErrorHandler[1];
    const error = new Error("foo");
    const mockResponse = {
      /* @typescript-eslint/no-empty-function: [0] */
      status: () => {},
      send: (object: any) => ({
        json: () => {
          assert.ok(typeof object.name === "string");
          assert.ok(typeof object.stack === "string");
          assert.ok(typeof object.message === "string");
          assert.equal(object.handler, "unexpectedErrorHandler");
          done();
        },
      }),
    };
    /* @typescript-eslint/no-empty-function: [0] */
    handler(error, {} as any, mockResponse as any, () => {});
  });

  it("handler works when got any object", (done) => {
    const handler = unexpectedErrorHandler[1];
    const error = { foo: "foo" };
    const mockResponse = {
      /* @typescript-eslint/no-empty-function: [0] */
      status: () => {},
      send: (object: any) => ({
        json: () => {
          assert.deepStrictEqual(object, {
            foo: "foo",
            extendMessage:
              "unhandled error in bff, you should implements a new ErrorHandler",
            handler: "unexpectedErrorHandler",
          });
          done();
        },
      }),
    };
    /* @typescript-eslint/no-empty-function: [0] */
    handler(error, {} as any, mockResponse as any, () => {});
  });
});
