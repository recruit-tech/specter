import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import Specter from "@specter/specter";
import Counter from "./services/Counter";
import Hello from "../shared/components/hello";
import bodyParser from "body-parser";
import path from "path";
Specter.registerService(new Counter({}));
const app = express();

app.use("/public", express.static(path.resolve(process.cwd(), "./webpack/dist/client")));
app.use(bodyParser.json());
app.get("/ssr", async (req, res, next) => {
  const count = await Hello.countup();
  const str = renderToString(React.createElement(Hello, { count }));
  res.send(`<html><head><meta id="initial-data" data-count="${count}" /></head><body><div id="root">${str}</div><script src="/public/bundle.js"></script></body></html>`);
});
app.use("/xhr", Specter.createMiddleware({}));
app.listen(3000);
