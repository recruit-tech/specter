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
enum SpecterErrorType { NotImplemented = 1, NotSupportedMethod = 2 }

export const NotImplemented = new SpecterError(SpecterErrorType.NotImplemented, "not implemented");
export const NotSupportedMethod = new SpecterError(SpecterErrorType.NotSupportedMethod, "not supported method");
