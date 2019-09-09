import { Request, Client } from "@specter/specter";
import { Middleware } from "redux";

export const SPECTER: "SPECTER" = "SPECTER";

const SPECTER_READ: "read" = "read";
const SPECTER_DELETE: "delete" = "delete";
const SPECTER_UPDATE: "update" = "update";
const SPECTER_CREATE: "create" = "create";

type Payload<H, Q, B = object | undefined> =
  | {
      type: typeof SPECTER_READ;
      service: string;
      headers: H;
      query: Q;
    }
  | {
      type: typeof SPECTER_DELETE;
      service: string;
      headers: H;
      query: Q;
    }
  | {
      type: typeof SPECTER_UPDATE;
      service: string;
      headers: object;
      query: H;
      body: Q;
    }
  | {
      type: typeof SPECTER_CREATE;
      service: string;
      headers: H;
      query: Q;
      body: B;
    };

type SpecterAction = {
  type: typeof SPECTER;
  payload: Payload<any, any, any>;
};

const createFetchAction = <H, Q, B = object>(
  payload: Payload<H, Q, B>
): SpecterAction => ({
  type: SPECTER,
  payload
});

export const specterRead = <H = object, Q = object>(
  service: string,
  args: { query?: Q; headers?: H } = {}
) =>
  createFetchAction({
    type: SPECTER_READ,
    service,
    headers: args.headers || {},
    query: args.query || {}
  });

export const specterDelete = <H = object, Q = object>(
  service: string,
  args: { query?: Q; headers?: H } = {}
) =>
  createFetchAction({
    type: SPECTER_DELETE,
    service,
    headers: args.headers || {},
    query: args.query || {}
  });

export const specterCreate = <H = object, Q = object, B = object>(
  service: string,
  args: { query?: Q; body?: B; headers?: H } = {}
) =>
  createFetchAction({
    type: SPECTER_CREATE,
    service,
    headers: args.headers || {},
    body: args.body || {},
    query: args.query || {}
  });

export const specterUpdate = <H = object, Q = object, B = object>(
  service: string,
  args: { headers?: H; query?: Q; body?: B } = {}
) =>
  createFetchAction({
    type: SPECTER_UPDATE,
    service,
    headers: args.headers || {},
    body: args.body || {},
    query: args.query || {}
  });

type Actions = SpecterAction | never;

export default function reduxEffectsSpector(client: Client): Middleware {
  return () => next => (action: Actions) => {
    const { type, payload } = action;
    if (type !== SPECTER) return next(action);
    const { service, query, headers } = payload;
    switch (payload.type) {
      case SPECTER_READ: {
        const req = new Request(service, {
          headers,
          query,
          body: {}
        });
        return client.read(req).then(res => res.body);
      }
      case SPECTER_DELETE: {
        const req = new Request(service, {
          headers,
          query,
          body: {}
        });
        return client.delete(req).then(res => res.body);
      }
      case SPECTER_CREATE: {
        const req = new Request(service, {
          headers,
          query,
          body: payload.body
        });
        return client.create(req).then(res => res.body);
      }
      case SPECTER_UPDATE: {
        const req = new Request(service, {
          headers,
          query,
          body: payload.body
        });
        return client.update(req).then(res => res.body);
      }
      default: {
        throw new Error("Unexpected spector types");
      }
    }
  };
}
