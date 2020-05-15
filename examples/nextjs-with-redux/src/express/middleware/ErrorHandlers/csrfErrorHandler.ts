import { ErrorHandler, ErrorPayload } from "./interface";
import { log } from "../../utils/log";

interface CSRFError extends Error {
  code: string;
}

export const EBADCSRFTOKEN = "EBADCSRFTOKEN" as const;

function isCSRFError(err: any): err is CSRFError {
  if (err && err.code === EBADCSRFTOKEN) return true;
  return false;
}

export const csrfErrorHandler: ErrorHandler = [
  isCSRFError,
  (error: CSRFError, req, res) => {
    const payload: ErrorPayload = {
      error,
      message: "bad csrf token",
      code: "EBADCSRFTOKEN",
      status: 403,
      statusText: "Forbidden",
      handler: "csrfErrorHandler",
      ...{
        ip: req.ip,
        originalUrl: req.originalUrl,
        method: req.method,
        url: req.url,
      },
    };
    log.warn(payload);
    res.status(403);
    res.send(payload).json();
  },
];
