declare type SharedRequest = {
    headers: Record<string, string>;
    query: Record<string, string>;
    body?: Record<string, any>;
    method?: string;
};
declare type SharedResponse = {
    header: Record<string, string>;
    body: Record<string, string>;
};
export declare class SpecterNetworkError extends Error {
    isSpecterError: boolean;
    status: number;
    statusText: string;
    req: SharedRequest;
    res: SharedResponse;
    constructor(message: string, status: number, statusText: string, request: SharedRequest, response: SharedResponse);
}
export declare function isSpecterError(err: any): err is SpecterNetworkError;
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
