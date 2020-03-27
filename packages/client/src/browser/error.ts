import SpecterRequest from "./request";
import SpecterResponse from "./response";

export class SpecterError extends Error {
  public isSpecterError = true;
  public status: number;
  public statusText: string;
  public req: SpecterRequest<any, any, any>;
  public res: SpecterResponse<any, any>;

  constructor(
    message: string,
    status: number,
    statusText: string,
    request: SpecterRequest<any, any, any>,
    response: SpecterResponse<any, any>
  ) {
    super(`Specter Error: ${message}`);
    this.req = request;
    this.res = response;
    this.status = status;
    this.statusText = statusText;
  }
}

export function isSpecterError(err: any): err is SpecterError {
  if (err && typeof err === "object") return !!err.isSpecterError || false;
  return false;
}
