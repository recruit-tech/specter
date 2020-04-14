import SpecterRequest from "./request";
export declare type AnyResponse = SpecterResponse<{}, {}>;
export default class SpecterResponse<H extends any, B extends any> {
    status?: number;
    headers: H;
    body: B;
    error?: any;
    nextReqs?: SpecterRequest<any, any, any>[];
    constructor(headers: H, body: B);
    setStatus(status: number): void;
    setNextReqs(...reqs: SpecterRequest<any, any, any>[]): void;
    setError(error: any): void;
    getNextReqs(): SpecterRequest<any, any, any>[] | undefined;
}
