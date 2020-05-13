import assert from "assert";
import { createErrorHandler } from "../../ErrorHandler";

describe("ErrorHandler", () => {
  let middleware: ReturnType<typeof createErrorHandler>;

  beforeEach(() => {
    middleware = createErrorHandler();
  });

  it("works", () => {
    const response = {
      /* eslint @typescript-eslint/no-empty-function: [0] */
      status: () => {},
      send: (object: any) => ({
        json: () => {
          assert.ok(typeof object.message === "string");
        },
      }),
    };
    /* eslint @typescript-eslint/no-empty-function: [0] */
    middleware(new Error("a"), {} as any, response as any, () => {});
  });
});
