export class Entry<E> {
  prev: Entry<E> | null;
  data: E;
  next: Entry<E> | null;
  constructor(data: E, prev: Entry<E> | null, next: Entry<E> | null) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

export class LinkedList<E> {
  head: Entry<E> | null;
  tail: Entry<E> | null;
  length: number;
  constructor(...entries: Array<E>) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    entries.forEach((e) => this.push(e));
  }

  // add to tail
  push(data: E) {
    if (this.tail === null) {
      const e = new Entry(data, null, null);
      this.head = e;
      this.tail = e;
      this.length++;
      return e;
    }

    const e = new Entry(data, this.tail, null);
    this.tail.next = e;
    this.tail = e;
    this.length++;
    return e;
  }

  // get and remove from tail
  pop() {
    const t = this.tail;
    this.tail = t?.prev || null;
    if (this.tail !== null) {
      this.tail.next = null;
    }
    this.length--;
    return t;
  }

  // insert at top
  unshift(data: E) {
    if (this.head === null) {
      const e = new Entry(data, null, null);
      this.head = e;
      this.tail = e;
      this.length++;
      return e;
    }

    const e = new Entry(data, null, this.head);
    this.head.prev = e;
    this.head = e;
    this.length++;
    return e;
  }

  get(index: number) {
    let h = this.head;
    for (let i = 0; i < index; i++) {
      h = h?.next || null;
    }
    return h;
  }

  remove(entry: Entry<E>) {
    const { prev, next } = entry;
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
  }
}
