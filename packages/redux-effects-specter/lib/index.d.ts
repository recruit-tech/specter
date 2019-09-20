import { Client } from "@specter/specter";
import { Middleware } from "redux";
export declare const SPECTER: "SPECTER";
declare const SPECTER_READ: "read";
declare const SPECTER_DELETE: "delete";
declare const SPECTER_UPDATE: "update";
declare const SPECTER_CREATE: "create";
declare type Payload<H, Q, B = object | undefined> = {
    type: typeof SPECTER_READ;
    service: string;
    headers: H;
    query: Q;
} | {
    type: typeof SPECTER_DELETE;
    service: string;
    headers: H;
    query: Q;
} | {
    type: typeof SPECTER_UPDATE;
    service: string;
    headers: H;
    query: Q;
    body: B;
} | {
    type: typeof SPECTER_CREATE;
    service: string;
    headers: H;
    query: Q;
    body: B;
};
declare type SpecterAction = {
    type: typeof SPECTER;
    payload: Payload<any, any, any>;
};
export declare const specterRead: <H = object, Q = object>(service: string, args?: {
    query?: Q | undefined;
    headers?: H | undefined;
}) => SpecterAction;
export declare const specterDelete: <H = object, Q = object>(service: string, args?: {
    query?: Q | undefined;
    headers?: H | undefined;
}) => SpecterAction;
export declare const specterCreate: <H = object, Q = object, B = object>(service: string, args?: {
    query?: Q | undefined;
    body?: B | undefined;
    headers?: H | undefined;
}) => SpecterAction;
export declare const specterUpdate: <H = object, Q = object, B = object>(service: string, args?: {
    headers?: H | undefined;
    query?: Q | undefined;
    body?: B | undefined;
}) => SpecterAction;
export default function reduxEffectsSpector(client: Client): Middleware;
export {};
