import * as express from "express";
import bodyParser from "body-parser";
import next from "next";
import Specter from "@specter/specter";
import HackerNewsItem from "../services/HackerNewsItem";
import HackerNewsList from "../services/HackerNewsList";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express.default();
  Specter.registerService(new HackerNewsItem({}));
  Specter.registerService(new HackerNewsList({}));
  server.use(bodyParser.json());
  server.use("/xhr", Specter.createMiddleware({}));
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  const sv = server.listen(3000, err => {
    if (err) throw err;
    const address = sv.address();
    if (!address || typeof address === "string") {
      return;
    }
    console.log(`> Ready on http://localhost:${address.port}`);
  });
});
