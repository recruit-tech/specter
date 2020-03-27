type SharedRequest = {
  headers: Record<string, string>;
  query: Record<string, string>;
  body?: Record<string, any>;
  method?: string;
};
type SharedResponse = {
  header: Record<string, string>;
  body: Record<string, string>;
};

export class SpecterNetworkError extends Error {
  public isSpecterError = true;
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

export function isSpecterError(err: any): err is SpecterNetworkError {
  if (err && typeof err === "object") return !!err.isSpecterError || false;
  return false;
}

class SpecterError {
  code: SpecterErrorType;
  message: string;
  error?: Error;

  constructor(code: SpecterErrorType, message: string, error?: Error) {
    this.code = code;
    this.message = message;
    this.error = error;
  }
}
enum SpecterErrorType {
  NotImplemented = 1,
  NotSupportedMethod = 2,
}

export const NotImplemented = new SpecterError(
  SpecterErrorType.NotImplemented,
  "not implemented"
);
export const NotSupportedMethod = new SpecterError(
  SpecterErrorType.NotSupportedMethod,
  "not supported method"
);
