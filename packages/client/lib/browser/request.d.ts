export default class SpecterRequest<H extends any, Q extends any, B extends any> {
    resource: string;
    headers: H;
    query: Q;
    body?: B;
    req: object;
    constructor(resource: string, request: {
        headers: H;
        query: Q;
        body?: B;
    });
}
