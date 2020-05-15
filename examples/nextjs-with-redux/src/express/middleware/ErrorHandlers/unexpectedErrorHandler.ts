import { ErrorHandler, ErrorPayload } from "./interface";
import { log } from "../../utils/log";

export const unexpectedErrorHandler: ErrorHandler = [
  () => true,
  (err, _req, res) => {
    // このログが kibana に出たら，新しく ErrorHandler を実装すべき
    const error: { stack: string; name: string; message: string } =
      err instanceof Error
        ? { stack: err.stack, name: err.name, message: err.message }
        : err;
    const payload: ErrorPayload = {
      ...error,
      handler: "unexpectedErrorHandler",
      extendMessage:
        "unhandled error in bff, you should implements a new ErrorHandler",
    };
    log.error(payload);
    if (process.env.NODE_ENV !== "production" && err instanceof Error) {
      // 開発時はスタックトレースをコンソールで見やすくする
      log.debug(err.stack);
    }
    res.status(500);
    res.send(payload).json();
  },
];
