let Stack = /** @class */ (function () {
	function Stack() {
		this.stack = [];
	}
	Stack.prototype.push = function (item) {
		this.stack.push(item);
	};
	Stack.prototype.pop = function () {
		return this.stack.pop();
	};
	Stack.prototype.isEmpty = function () {
		return this.stack.length === 0;
	};
	Stack.prototype.peek = function () {
		return this.stack[this.stack.length - 1];
	};
	Stack.prototype.size = function () {
		return this.stack.length;
	};
	Stack.prototype.exportToJSON = function () {
		let s = {"Stack": this.stack}
		return JSON.stringify(s);
	};
	Stack.prototype.importFromJSON = function (json) {
		let s = JSON.parse(json);
		this.stack = s["Stack"];
	};
	return Stack;
}());