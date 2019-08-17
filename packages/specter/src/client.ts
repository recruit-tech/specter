import SpecterRequest from "./request";
import SpecterResponse from "./response";
import { NotImplemented, NotSupportedMethod } from "./errors";
import Specter from "./specter";
import { IncomingHttpHeaders } from "http";

type DefaultRequest = SpecterRequest<IncomingHttpHeaders, any, any>;
type DefaultResponse = SpecterResponse<any, any>;
export default class SpecterClient {
    options?: object;
    constructor(options?: any) {
        this.options = options;
    }

    execute<Res extends DefaultResponse>(
        request: DefaultRequest
    ): Promise<Res | DefaultResponse> {
        if (!request.method) {
            throw new Error("Request method not found");
        }
        if (!Specter.isRegistered(request.resource)) {
            throw new Error(`Service is not registered ${request.resource}`);
        }
        const service = Specter.getService(request.resource);
        const response = service.execute(request);
        return response;
    }

    create<Res extends DefaultResponse>(
        request: DefaultRequest
    ): Promise<Res | DefaultResponse> {
        request.method = "POST";
        return this.execute(request);
    }

    read<Res extends DefaultResponse>(
        request: DefaultRequest
    ): Promise<Res | DefaultResponse> {
        request.method = "GET";
        return this.execute(request);
    }

    update<Res extends DefaultResponse>(
        request: DefaultRequest
    ): Promise<Res | DefaultResponse> {
        request.method = "PUT";
        return this.execute(request);
    }

    delete<Res extends DefaultResponse>(
        request: DefaultRequest
    ): Promise<Res | DefaultResponse> {
        request.method = "DELETE";
        return this.execute(request);
    }

    exists<Res extends DefaultResponse>(
        request: DefaultRequest
    ): Promise<Res | DefaultResponse> {
        request.method = "HEAD";
        return this.execute(request);
    }
}
