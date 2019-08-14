export default class SpecterResponse<H extends any, B extends any> {
  header: H;
  body: B;
  constructor(header: H, body: B) {
    this.header = header;
    this.body = body;
  }
}