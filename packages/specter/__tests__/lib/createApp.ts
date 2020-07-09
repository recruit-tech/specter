import Specter, { Service } from "../../src";
import express from "express";
import bodyParser from "body-parser";
export default function createApp(service: Service, ...services: Service[]) {
  Specter.registerService(service);
  services.forEach(service => {
    Specter.registerService(service);
  });
  const app = express();
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,XCSRF-Token,Authorization,X-Specter-Method"
    );
    next();
  });
  // for preflight (has cause preflight request when was append custom header)
  app.options("*", function(_req, res) {
    res.sendStatus(200);
  });
  app.use(bodyParser.json());
  app.use("/xhr", Specter.createMiddleware({}));
  app.use((err: any, _req: any, res: any, next: Function) => {
    if (err.statusCode) {
      res.status(err.statusCode);
      res.send(err);
    }
    next(err);
  });
  const server = app.listen(0);
  return { app, server };
}
