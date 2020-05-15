import { ErrorRequestHandler } from "express";

export type ErrorHandler = [
  (err: any /* express middleware の err型 はany */) => boolean,
  ErrorRequestHandler
];

export type ErrorPayload = {
  handler: string;
  [k: string]: any;
};
