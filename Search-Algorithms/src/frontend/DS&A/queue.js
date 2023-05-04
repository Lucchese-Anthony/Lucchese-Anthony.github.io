let Queue = /** @class */ (function () {
	function Queue() {
		this.queue = [];
	}
	Queue.prototype.enqueue = function (item) {
		this.queue.push(item);
	};
	Queue.prototype.dequeue = function () {
		return this.queue.shift();
	};
	Queue.prototype.isEmpty = function () {
		return this.queue.length === 0;
	};
	Queue.prototype.peek = function () {
		return this.queue[0];
	};
	Queue.prototype.size = function () {
		return this.queue.length;
	};
	Queue.prototype.print = function () {
		console.log(this.queue);
	};
	Queue.prototype.exportToJSON = function () {
		let q = {"Queue": this.queue}
		return JSON.stringify(q);
	};
	Queue.prototype.importFromJSON = function (json) {
		let q = JSON.parse(json);
		this.queue = q["Queue"];
	};
	Queue.prototype.in = function (node) {
		for (let i = 0; i < this.queue.length; i++) {
			if (this.queue[i].node.id == node.id) {
				return true;
			}
		}
		return false;
	};
	return Queue;
}());

let PriorityQueue = /** @class */ (function () {
	function PriorityQueue() {
		this.queue = [];
	}
	PriorityQueue.prototype.enqueue = function (item, priority) {
		this.queue.push({ item: item, priority: priority });
		this.queue.sort(function (a, b) {
			return a.priority - b.priority;
		});
	};
	PriorityQueue.prototype.dequeue = function () {
		return this.queue.shift().item;
	};
	PriorityQueue.prototype.isEmpty = function () {
		return this.queue.length === 0;
	};
	PriorityQueue.prototype.peek = function () {
		return this.queue[0];
	};
	PriorityQueue.prototype.size = function () {
		return this.queue.length;
	};
	PriorityQueue.prototype.print = function () {
		console.log(this.queue);
	};
	PriorityQueue.prototype.in = function (node) {
		for (let i = 0; i < this.queue.length; i++) {
			if (this.queue[i].node.id == node.id) {
				return true;
			}
		}
		return false;
	};
	return PriorityQueue;
}());