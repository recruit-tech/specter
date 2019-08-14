import Specter, { Service } from "../../src";
import express from "express";
import bodyParser from "body-parser";
export default function createApp(service: Service, ...services: Service[]) {
  Specter.registerService(service);
  services.forEach((service) => {
    Specter.registerService(service);
  })
  const app = express();
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.json());
  app.use("/xhr", Specter.createMiddleware({}));
  const server = app.listen(0);
  return {app, server};
}