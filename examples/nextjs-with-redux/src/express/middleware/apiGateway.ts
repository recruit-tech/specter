import { RequestHandler } from "express";
import Specter from "@specter/specter";

export const apiGateway: RequestHandler = (req, res, next) => {
  const middleware = Specter.createMiddleware({});
  middleware(req, res, next);
};
