import { RequestHandler } from "express";
import Service from "./service";
export default class Specter {
    private static services;
    private static collect?;
    private static guess?;
    private static guessOption?;
    static registerService(service: Service): void;
    static getService(name: string): Service;
    static isRegistered(name: string): boolean;
    static createMiddleware(options: {
        collect?: Function;
        guess?: Function;
        guessOptions?: object;
    }): RequestHandler;
}
