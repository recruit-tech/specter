"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var specter_1 = require("@specter/specter");
exports.SPECTER = "SPECTER";
var SPECTER_READ = "read";
var SPECTER_DELETE = "delete";
var SPECTER_UPDATE = "update";
var SPECTER_CREATE = "create";
var createFetchAction = function (payload) { return ({
    type: exports.SPECTER,
    payload: payload,
}); };
exports.specterRead = function (service, args) {
    if (args === void 0) { args = {}; }
    return createFetchAction({
        type: SPECTER_READ,
        service: service,
        headers: args.headers || {},
        query: args.query || {},
    });
};
exports.specterDelete = function (service, args) {
    if (args === void 0) { args = {}; }
    return createFetchAction({
        type: SPECTER_DELETE,
        service: service,
        headers: args.headers || {},
        query: args.query || {},
    });
};
exports.specterCreate = function (service, args) {
    if (args === void 0) { args = {}; }
    return createFetchAction({
        type: SPECTER_CREATE,
        service: service,
        headers: args.headers || {},
        body: args.body || {},
        query: args.query || {},
    });
};
exports.specterUpdate = function (service, args) {
    if (args === void 0) { args = {}; }
    return createFetchAction({
        type: SPECTER_UPDATE,
        service: service,
        headers: args.headers || {},
        body: args.body || {},
        query: args.query || {},
    });
};
function reduxEffectsSpector(client) {
    return function () { return function (next) { return function (action) {
        var type = action.type, payload = action.payload;
        if (type !== exports.SPECTER)
            return next(action);
        var service = payload.service, query = payload.query, headers = payload.headers;
        switch (payload.type) {
            case SPECTER_READ: {
                var req = new specter_1.Request(service, {
                    headers: headers,
                    query: query,
                    body: {},
                });
                return client.read(req).then(function (res) { return res.body; });
            }
            case SPECTER_DELETE: {
                var req = new specter_1.Request(service, {
                    headers: headers,
                    query: query,
                    body: {},
                });
                return client.delete(req).then(function (res) { return res.body; });
            }
            case SPECTER_CREATE: {
                var req = new specter_1.Request(service, {
                    headers: headers,
                    query: query,
                    body: payload.body,
                });
                return client.create(req).then(function (res) { return res.body; });
            }
            case SPECTER_UPDATE: {
                var req = new specter_1.Request(service, {
                    headers: headers,
                    query: query,
                    body: payload.body,
                });
                return client.update(req).then(function (res) { return res.body; });
            }
            default: {
                throw new Error("Unexpected spector types");
            }
        }
    }; }; };
}
exports.default = reduxEffectsSpector;
