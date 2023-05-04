let Link = /** @class */ (function () {
    function Link(value, next) {
        this.value = value;
        this.next = next;
    }
    return Node;
}
());

let doublyLinked = /** @class */ (function () {
    function doublyLinked(head, value, tail) {
        this.head = head;
        this.value = value
        this.tail = tail;
    }
    return doublyLinked;
}
());
