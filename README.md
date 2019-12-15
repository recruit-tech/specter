# Specter

Specter is a data fetch layer using speculative execution. Specter could support the following features.

- Speculative Execution (for API fetch)
- Universal data fetch (in server side, specter executes function call instead of http request)
- TypeScript friendly
- Lightweight (2.2kB gzipped, minified)

# How to setup Specter

## 0. Install

```
$ npm i @specter/specter
$ npm i @specter/client
```

## 1. Setup Server

Specter has an interface for express middleware.
Specter middleware expects `body-parser` express middleware, and register Specter endpoints.

```javascript
import bodyParser from "body-parser";
import express from "express";

const app = express();
app.use(bodyParser.json());
// Specter Endpoint
app.use("/xhr", Specter.createMiddleware({}));
```

## 2. Setup Client

On the client side, it is necessary for the `base` option to setup client.

```javascript
import Client from "@specter/client";

const client = new Client({
  // Specter Endpoint
  base: "/xhr",
  // fetch options
  fetchOption: {}
});
```

## 3. Register Specter Data Service

User field services need to extend `Service`. And they need to implement `read`, `create`, `update` or `delete` methods.

```javascript
import Specter, { Service } from "@specter/specter";
import Client, { Request, Response } from "@specter/client";

type RequestHeader = { }
type ResponseHeader = { }
type Query = { }
type RequestBody = {}
type ResponseBody = { count: number }

export default class Counter extends Service {
  count: number;
  constructor(config: any) {
    super("counter", config);
    this.count = 0;
  }
  async update(request: Request<RequestHeader, Query, RequestBody>): Promise<Response<ResponseHeader, ResponseBody>> {
    this.count++;
    const response = new Response<ResponseHeader, ResponseBody>({}, {
      count: this.count,
    })
    return response;
  }
  async read(request: Request<RequestHeader, Query, RequestBody>): Promise<Response<ResponseHeader, ResponseBody>> {
    const response = new Response<ResponseHeader, ResponseBody>({}, {
      count: this.count,
    })
    return response;
  }
}
```

## 4. Call Client request from both server and client

```javascript
import React from "react";
import Client, { Request, Response } from "@specter/client";

const client = new Client({
  base: "/xhr",
  fetchOption: {},
});

export default class Hello extends React.Component<{count: number}, {count: number}> {
  constructor(props: {count: number}) {
    super(props);
    this.state = {
      count: props.count,
    };
  }

  static async countup(): Promise<number> {
    // create specter request.
    const request = new Request<{}, {}, null>("counter", {
       headers: {},
       query: {},
       body: null,
    });
    // Universal Data fetch request, if this code runs on server, just function call, if this code runs on browser, call fetch.
    const count = (await client.update<Response<{}, { count: number }>>(request)).body.count;
    return count;
  }

  async onClick() {
    const count = await Hello.countup();
    this.setState({ count });
  }

  render() {
    return (<div>Hello world {this.state.count}<input type="button" value="countup" onClick={this.onClick.bind(this)}/></div>);
  }

}
```
