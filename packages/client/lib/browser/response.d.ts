import SpecterRequest from "@specter/specter/lib/request";
export default class SpecterResponse<H extends {
    "x-specter-next-reqs": string;
}, B extends any> {
    header: H;
    body: B;
    constructor(header: H, body: B);
    getNextReqs(): SpecterRequest<any, any, any>[];
}
