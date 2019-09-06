import SpecterRequest from "./request";
import SpecterResponse from "./response";
import { stringify } from "querystring";
import { pathToFileURL } from "url";
import fetch from "unfetch";

type DefaultRequest = SpecterRequest<any, any, any>;
type DefaultResponse = SpecterResponse<any, any>;
const DefaultContentType = "application/json; charset=utf-8";
export default class SpecterClient {
  base: string;
  fetchOptions: object;
  constructor(options: { base: string; fetchOptions: object }) {
    this.base = options.base;
    this.fetchOptions = options.fetchOptions;
  }

  private createPath(request: DefaultRequest): string {
    const q = stringify(request.query);
    const query = q ? `?${q}` : "";
    const path = `${this.base}/${request.resource}${query}`;
    return path;
  }

  private async executeRequest<Res extends DefaultResponse>(
    method: string,
    request: DefaultRequest
  ): Promise<Res> {
    const path = this.createPath(request);
    const body = request.body ? JSON.stringify(request.body) : null;
    const head = {
      ...request.headers
    };
    if (body && !head["Content-Type"]) {
      head["Content-Type"] = DefaultContentType;
    }
    const response = await fetch(path, {
      method,
      headers: head,
      body,
      ...this.fetchOptions
    });

    const json = await response.json();
    const h = response.headers as Headers & {
      entries: () => ReadonlyArray<[string, string]>;
    };
    const headers: { [key: string]: string } = {};
    for (const [key, value] of h.entries()) {
      headers[key] = value;
    }
    const result = new SpecterResponse<any, any>(headers, json);
    return result as Res;
  }

  async execute<Response extends DefaultResponse>(
    request: DefaultRequest
  ): Promise<Response> {
    if (!request.method) {
      throw new Error("Request method is not found.");
    }
    return this.executeRequest(request.method, request);
  }

  async create<Response extends DefaultResponse>(
    request: DefaultRequest
  ): Promise<Response> {
    return this.executeRequest("POST", request);
  }

  async read<Response extends DefaultResponse>(
    request: DefaultRequest
  ): Promise<Response> {
    return this.executeRequest("GET", request);
  }

  async update<Response extends DefaultResponse>(
    request: DefaultRequest
  ): Promise<Response> {
    return this.executeRequest("PUT", request);
  }

  async delete<Response extends DefaultResponse>(
    request: DefaultRequest
  ): Promise<Response> {
    return this.executeRequest("DELETE", request);
  }

  async exists(request: DefaultRequest): Promise<boolean> {
    const path = this.createPath(request);
    const response = await fetch(path, {
      method: "HEAD",
      headers: request.headers,
      body: JSON.stringify(request.body),
      ...this.fetchOptions
    });
    return response.ok;
  }
}
