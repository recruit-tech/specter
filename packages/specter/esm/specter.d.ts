import { RequestHandler } from "express";
import Service from "./service";
export default class Specter {
  private static services;
  static registerService(service: Service): void;
  static getService(name: string): Service;
  static isRegistered(name: string): boolean;
  static createMiddleware(options: any): RequestHandler;
}
