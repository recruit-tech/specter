import SpecterRequest from "@specter/specter/lib/request";
export default class SpecterResponse<H extends {
    "x-specter-next-reqs": string;
}, B extends any> {
    headers: H;
    body: B;
    constructor(headers: H, body: B);
    getNextReqs(): SpecterRequest<any, any, any>[];
}
