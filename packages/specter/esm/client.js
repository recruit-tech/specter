import Specter from "./specter";
export default class SpecterClient {
    constructor(options) {
        this.options = options;
    }
    execute(request, restype) {
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
    create(request) {
        request.method = "POST";
        return this.execute(request);
    }
    read(request) {
        request.method = "GET";
        return this.execute(request);
    }
    update(request) {
        request.method = "PUT";
        return this.execute(request);
    }
    delete(request) {
        request.method = "DELETE";
        return this.execute(request);
    }
    exists(request) {
        request.method = "HEAD";
        return this.execute(request);
    }
}
