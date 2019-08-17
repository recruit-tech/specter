import SpecterRequest from "./request";
export declare type AnyResponse = SpecterResponse<{}, {}>;
export default class SpecterResponse<H extends any, B extends any> {
    status?: number;
    header: H;
    body: B;
    error?: any;
    constructor(header: H, body: B);
    setStatus(status: number): void;
    setNextReqs(...reqs: SpecterRequest<any, any, any>[]): void;
    setError(error: any): void;
}
