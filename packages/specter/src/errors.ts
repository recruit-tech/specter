type SharedRequest = {
  headers: Record<string, string>;
  query: Record<string, string>;
  body?: Record<string, any>;
  method?: string;
};
type SharedResponse = {
  headers: Record<string, string>;
  body: Record<string, string>;
};

export class SpecterNetworkError extends Error {
  public isSpecterNetworkError = true;
  public status: number;
  public statusText: string;
  public req: SharedRequest;
  public res: SharedResponse;

  constructor(
    message: string,
    status: number,
    statusText: string,
    request: SharedRequest,
    response: SharedResponse
  ) {
    super(`Specter Error: ${message}`);
    this.req = request;
    this.res = response;
    this.status = status;
    this.statusText = statusText;
  }
}

export function isSpecterNetworkError(err: any): err is SpecterNetworkError {
  if (err && typeof err === "object") return !!err.isSpecterNetworkError;
  return false;
}

class SpecterError {
  code: SpecterErrorType;
  message: string;
  error?: Error;
  statusCode?: number;

  constructor(
    code: SpecterErrorType,
    message: string,
    statusCode?: number,
    error?: Error
  ) {
    this.code = code;
    this.message = message;
    this.error = error;
    this.statusCode = statusCode;
  }
}
enum SpecterErrorType {
  NotImplemented = 1,
  NotSupportedMethod = 2,
}

export const NotImplemented = new SpecterError(
  SpecterErrorType.NotImplemented,
  "not implemented",
  400
);
export const NotSupportedMethod = new SpecterError(
  SpecterErrorType.NotSupportedMethod,
  "not supported method",
  400
);
