import SpecterRequest from "./request";
import SpecterResponse from "./response";
export declare class SpecterError extends Error {
    isSpecterError: boolean;
    status: number;
    statusText: string;
    req: SpecterRequest<any, any, any>;
    res: SpecterResponse<any, any>;
    constructor(message: string, status: number, statusText: string, request: SpecterRequest<any, any, any>, response: SpecterResponse<any, any>);
}
export declare function isSpecterError(err: any): err is SpecterError;
