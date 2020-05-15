export declare class Entry<E> {
    prev: Entry<E> | null;
    data: E;
    next: Entry<E> | null;
    constructor(data: E, prev: Entry<E> | null, next: Entry<E> | null);
}
export declare class LinkedList<E> {
    head: Entry<E> | null;
    tail: Entry<E> | null;
    length: number;
    constructor(...entries: Array<E>);
    push(data: E): Entry<E>;
    pop(): Entry<E> | null;
    unshift(data: E): Entry<E>;
    get(index: number): Entry<E> | null;
    remove(entry: Entry<E>): this;
}
