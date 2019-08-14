export default class SpecterResponse<H extends any, B extends any> {
    status?: number;
    header: H;
    body: B;
    constructor(header: H, body: B);
    setStatus(status: number): void;
}
