"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = exports.Entry = void 0;
var Entry = /** @class */ (function () {
    function Entry(data, prev, next) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
    return Entry;
}());
exports.Entry = Entry;
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        var _this = this;
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
        }
        this.head = null;
        this.tail = null;
        this.length = 0;
        entries.forEach(function (e) { return _this.push(e); });
    }
    // add to tail
    LinkedList.prototype.push = function (data) {
        if (this.tail === null) {
            var e_1 = new Entry(data, null, null);
            this.head = e_1;
            this.tail = e_1;
            this.length++;
            return e_1;
        }
        var e = new Entry(data, this.tail, null);
        this.tail.next = e;
        this.tail = e;
        this.length++;
        return e;
    };
    // get and remove from tail
    LinkedList.prototype.pop = function () {
        var t = this.tail;
        this.tail = (t === null || t === void 0 ? void 0 : t.prev) || null;
        if (this.tail !== null) {
            this.tail.next = null;
        }
        this.length--;
        return t;
    };
    // insert at top
    LinkedList.prototype.unshift = function (data) {
        if (this.head === null) {
            var e_2 = new Entry(data, null, null);
            this.head = e_2;
            this.tail = e_2;
            this.length++;
            return e_2;
        }
        var e = new Entry(data, null, this.head);
        this.head.prev = e;
        this.head = e;
        this.length++;
        return e;
    };
    LinkedList.prototype.get = function (index) {
        var h = this.head;
        for (var i = 0; i < index; i++) {
            h = (h === null || h === void 0 ? void 0 : h.next) || null;
        }
        return h;
    };
    LinkedList.prototype.remove = function (entry) {
        var prev = entry.prev, next = entry.next;
        if (this.head === entry) {
            this.head = entry.next;
        }
        if (this.tail === entry) {
            this.tail = entry.prev;
        }
        if (prev !== null) {
            prev.next = next;
        }
        if (next !== null) {
            next.prev = prev;
        }
        this.length--;
        return this;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
