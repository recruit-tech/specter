import { ErrorRequestHandler } from "express";
import { ErrorHandler } from "./ErrorHandlers/interface";
import { axiosErrorHandler } from "./ErrorHandlers/aixosErrorHandler";
import { csrfErrorHandler } from "./ErrorHandlers/csrfErrorHandler";
import { unexpectedErrorHandler } from "./ErrorHandlers/unexpectedErrorHandler";

const patternMatcher = (
  ...patterns: Array<ErrorHandler>
): ErrorRequestHandler => {
  return (err, req, res, next) => {
    for (const pattern of patterns) {
      if (pattern[0](err)) {
        return pattern[1](err, req, res, next);
      }
    }
    return next(err);
  };
};

export function createErrorHandler(): ErrorRequestHandler {
  return patternMatcher(
    axiosErrorHandler,
    csrfErrorHandler,

    // unexpectedErrorHandler
    // NOTE: ハンドルされなかったエラーはここに来る
    // CAUTION: このエラーハンドラーは常に最後に追加すべき
    unexpectedErrorHandler
  );
}
