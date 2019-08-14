declare class SpecterError {
    code: SpecterErrorType;
    message: string;
    error?: Error;
    constructor(code: SpecterErrorType, message: string, error?: Error);
}
declare enum SpecterErrorType {
    NotImplemented = 1,
    NotSupportedMethod = 2
}
export declare const NotImplemented: SpecterError;
export declare const NotSupportedMethod: SpecterError;
export {};
