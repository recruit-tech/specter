import Specter, { Client, Request, Response, Service } from "../src";
import express from "express";
import { AddressInfo } from "net";
import assert from "assert";
import getPort from "./lib/getPort";
import fetch from "isomorphic-unfetch";
import createApp from "./lib/createApp";
import Todo from "./fixtures/Todo";

test("CRUD situation", async () => {
  class CRUD extends Service {
    data: Array<{
      id: number;
      foo: string;
    }>;
    constructor() {
      super("echo", {});
      this.data = [];
    }
    async create(
      request: Request<{}, {}, { foo: string }>
    ): Promise<
      Response<
        {},
        {
          message: string;
          id: number;
          foo: string;
        }
      >
    > {
      const id = this.data.length + 1;
      this.data.push({ id, foo: request.body.foo });
      return new Response(
        {},
        {
          message: "created",
          id,
          foo: request.body.foo,
        }
      );
    }
    async read(
      request: Request<{}, { id: number; foo: string }, {}>
    ): Promise<
      Response<
        {},
        {
          message: string;
          id: number;
          foo: string;
        }
      >
    > {
      const result = this.data.find(
        (d) => d.id === +request.query.id || d.foo === request.query.foo
      );
      if (!result) {
        const response = new Response(
          {},
          {
            message: "not found",
            id: 0,
            foo: "",
          }
        );
        response.setStatus(404);
        return response;
      }
      return new Response(
        {},
        {
          message: "found",
          ...result,
        }
      );
    }
    async update(
      request: Request<{}, { id: number; foo: string }, { foo: string }>
    ): Promise<
      Response<
        {},
        {
          message: string;
          id: number;
          foo: string;
        }
      >
    > {
      const index = this.data.findIndex(
        (d) => d.id === +request.query.id || d.foo === request.query.foo
      );
      const result = this.data[index];
      if (!result) {
        const response = new Response(
          {},
          {
            message: "not found",
            id: 0,
            foo: "",
          }
        );
        response.setStatus(404);
        return response;
      }
      this.data[index] = {
        id: +request.query.id,
        foo: request.body.foo,
      };
      return new Response(
        {},
        {
          message: "updated",
          ...this.data[index],
        }
      );
    }
    async delete(
      request: Request<{}, { id: number; foo: string }, {}>
    ): Promise<Response<{}, { message: string }>> {
      const index = this.data.findIndex(
        (d) => d.id === +request.query.id || d.foo === request.query.foo
      );
      const result = this.data[index];
      if (!result) {
        const response = new Response(
          {},
          {
            message: "not found",
            id: 0,
            foo: "",
          }
        );
        response.setStatus(404);
        return response;
      }
      this.data.splice(index, 1);
      return new Response(
        {},
        {
          message: "deleted",
        }
      );
    }
  }
  const crud = new CRUD();
  const { server } = createApp(crud);
  const { port } = await getPort(server);
  const create = await fetch(`http://localhost:${port}/xhr/echo`, {
    method: "POST",
    body: JSON.stringify({
      foo: "test",
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const createData = await create.json();
  assert.deepStrictEqual(createData, {
    message: "created",
    id: 1,
    foo: "test",
  });
  const read = await fetch(`http://localhost:${port}/xhr/echo?foo=test`);
  const readData = await read.json();
  assert.deepStrictEqual(readData, {
    message: "found",
    id: 1,
    foo: "test",
  });
  const id = await fetch(`http://localhost:${port}/xhr/echo?id=1`);
  const idData = await id.json();
  assert.deepStrictEqual(idData, {
    message: "found",
    id: 1,
    foo: "test",
  });
  const update = await fetch(`http://localhost:${port}/xhr/echo?id=1`, {
    method: "PUT",
    body: JSON.stringify({
      foo: "test2",
    }),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const updateData = await update.json();
  assert.deepStrictEqual(updateData, {
    message: "updated",
    id: 1,
    foo: "test2",
  });
  const del = await fetch(`http://localhost:${port}/xhr/echo?id=1`, {
    method: "DELETE",
  });
  const deletedData = await del.json();
  assert.deepStrictEqual(deletedData, {
    message: "deleted",
  });
  assert.deepStrictEqual(crud.data, []);
  server.close();
});
