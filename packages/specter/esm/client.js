import Specter from "./specter";
var SpecterClient = /** @class */ (function () {
    function SpecterClient(options) {
        this.options = options;
    }
    SpecterClient.prototype.execute = function (request, restype) {
        if (!request.method) {
            throw new Error("Request method not found");
        }
        if (!Specter.isRegistered(request.resource)) {
            throw new Error("Service is not registered " + request.resource);
        }
        var service = Specter.getService(request.resource);
        var response = service.execute(request);
        return response;
    };
    SpecterClient.prototype.create = function (request) {
        request.method = "POST";
        return this.execute(request);
    };
    SpecterClient.prototype.read = function (request) {
        request.method = "GET";
        return this.execute(request);
    };
    SpecterClient.prototype.update = function (request) {
        request.method = "PUT";
        return this.execute(request);
    };
    SpecterClient.prototype.delete = function (request) {
        request.method = "DELETE";
        return this.execute(request);
    };
    SpecterClient.prototype.exists = function (request) {
        request.method = "HEAD";
        return this.execute(request);
    };
    return SpecterClient;
}());
export default SpecterClient;
