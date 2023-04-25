let Queue = /** @class */ (function () {
	function Queue() {
		this.queue = [];
	}
	Queue.prototype.enqueue = function (item) {
		updateQueueUI();
		this.queue.push(item);
	};
	Queue.prototype.dequeue = function () {
		updateQueueUI();
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

let Stack = /** @class */ (function () {
	function Stack() {
		this.stack = [];
	}
	Stack.prototype.push = function (item) {
		updateStackUI();
		this.stack.push(item);
	};
	Stack.prototype.pop = function () {
		updateStackUI();
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
// create node structure with current and parent node
let Node = /** @class */ (function () {
	function Node(current, parent) {
		this.current = current;
		this.parent = parent;
	}
	return Node;
}());

function updateQueueUI() {
	let q = document.getElementById("queue");
	if (queue.isEmpty()) {
		q.innerHTML = "<h2>Queue</h2><ul><li>Empty</li></ul>";
		return;
	}
	q.innerHTML = "";
	q.innerHTML += "<h2>Queue</h2><ul>";
	for (let i = 0; i < queue.size(); i++) {
		q.innerHTML += "<li>" + (parseInt(queue.queue[i].node.id) + 1) + "</li>";
	}
	q.innerHTML += "</ul>";
}

function updateStackUI() {
	let s = document.getElementById("stack");
	if (stack.isEmpty()) {
		s.innerHTML = "<h2>Stack</h2><ul><li>Empty</li></ul>";
		return;
	}
	s.innerHTML = "";
	s.innerHTML += "<h2>Stack</h2><ul>";
	for (let i = 0; i < stack.size(); i++) {
		s.innerHTML += "<li>" + (parseInt(stack.stack[i].node.id) + 1) + "</li>";
	}
	s.innerHTML += "</ul>";
}

function changeColorOfVisitedNode(node) {
	s.graph.nodes(node.id).color = 'lightblue'; // red
	s.refresh();
}
function changeColorOfCompletedNode(node) {
	s.graph.nodes(node.id).color = 'green';
	s.refresh();
}

function changeColorOfVisitedEdge(source, target) {
	for (let edge of s.graph.edges()) {
	  if (ifEdge(edge, source, target)) {
		edge.color = 'lightblue';
	  }
	}
	s.refresh();
}

function changeColorOfPathEdge(source, target) {
	for (let edge of s.graph.edges()) {
	  if (ifEdge(edge, source, target)) {
		edge.color = 'green';
	  }
	}
}

function getNeighborsLabel(node) {
	let neighbors = [];
	for (let edge of s.graph.edges()) {
		if (edge.source == node.id) {
			neighbors.push(parseInt(edge.target) + 1);
		} else if (edge.target == node.id) {
			neighbors.push(parseInt(edge.source) + 1);
		}
	}
	return neighbors;
}

function getCurrentStartAndFinish() {
	let start = document.getElementById("start").value;
	let finish = document.getElementById("finish").value;
	if (start == "" || finish == "") {
		alert("Please enter a start and finish node");
		return false;
	}
	if (start == finish) {
		alert("Start and finish cannot be the same");
		return false;
	}
	if (start < 1 || start > s.graph.nodes().length || finish < 1 || finish > s.graph.nodes().length) {
		alert("Start and finish must be between 1 and " + s.graph.nodes().length);
		return false;
	}
	startNode = s.graph.nodes(start - 1);
	endNode = s.graph.nodes(finish - 1);
	setStartAndFinishColor();
	return true;

}

function resetGlobalValues() {
	algorithmCompleted = false;
	stepThroughAlgorithmButton = 0;
	stepThroughAlgorithmLoop = 0;
	stepAlgorithm = false;
	steps = 0;
	visitedNodes = [];
	queue = new Queue();
	stack = new Stack();
	setStartAndFinishPlaceholdersDefault();
	// clear verbose output
	let verbose = document.getElementById("verbose-logs");
	verbose.innerHTML = "";
	updateQueueUI();
	updateStackUI();
}


function listPremadeGraphsInHTML() {
	for(let key in premadeGraphs) {
		let option = document.createElement("option");
		option.text = key;
		option.value = key;
		let select = document.getElementById("graph-list");
		select.appendChild(option);

	}
	let option = document.createElement("option");
	option.text = "Custom";
	option.value = "Custom";
	let select = document.getElementById("graph-list");
	select.appendChild(option);
}
function listAlgorithmsInHTML() {
	for(let key in algorithmList) {
		let option = document.createElement("option");
		option.text = key;
		option.value = key;
		let select = document.getElementById("algorithm-list");
		select.appendChild(option);

	}
	let option = document.createElement("option");
	option.text = "Custom";
	option.value = "Custom";
	let select = document.getElementById("algorithm-list");
	select.appendChild(option);
}

function clearCurrentGraph() {
	if(!confirm("Are you sure you want to clear the current board?")) {
		return;
	}
	// delete old sigma instance
	s.graph.clear();
	s.refresh();
	s = newInstanceOfSigma();
	let select = document.getElementById("graph-list");
	if (select.value == "Custom") {
		board = renderCustomGraph();
	} else if (select.value == "Random")  {
		board = premadeGraphs["Random"] = getRandomGraph(Math.floor(Math.random() * 10) + 10, Math.floor(Math.random() * 2) + 2)
	}
	else {
		board = renderPremadeGraph();
	}
	if (board == null) {
		console.log(board)
		return;
	}
	s.graph.read(board);
	s.refresh();
	resetGlobalValues();

}

function renderCustomGraph() {
	let board;
	try {
		board = JSON.parse(prompt("Enter a valid JSON board"));
	} catch (e) {
		console.log(e)
		alert("Invalid JSON or board!");
		return null;
	}
	return board
}

function renderPremadeGraph() {
	let select = document.getElementById("graph-list");
	let board = premadeGraphs[select.value];
	return board;
}

function setDefaultPath() {
    startNode = s.graph.nodes()[0];
    endNode = s.graph.nodes()[s.graph.nodes().length - 1];
    setStartAndFinishColor()
}

function setStartAndFinishColor() {
    startNode.color = 'green';
    endNode.color = 'red';
	// set every other node to yellow
	for (let node of s.graph.nodes()) {
		if (node != startNode && node != endNode) {
			node.color = 'purple';
		}
	}
    s.refresh();
}

function setStartAndFinishPlaceholdersDefault() {
    startNode = s.graph.nodes()[0];
    endNode = s.graph.nodes()[s.graph.nodes().length - 1];
    document.getElementById("start").placeholder = parseInt(startNode.id + 1)
    document.getElementById("finish").placeholder = parseInt(endNode.id) + 1
}

function newInstanceOfSigma() {
	let newSigmaObject = new sigma(
	  {
		renderer: {
		  container: document.getElementById('sigma-container'),
		  type: 'canvas'
		},
		settings: {
		  labelThreshold: 0,
		  defaultZoomLevel: 0.1,
		}
	  }
	);
	let nodeClicked = null
	let textBox = null;
	newSigmaObject.bind('clickNode', function(e) {
	  let node = e.data.node;
	  let neighborsHidden = getNeighborsLabel(node);
	  let visited = isVisited(node);
	  if (nodeClicked == null) {
		textBox = document.createElement('div');
		textBox.className = 'text-box';
		textBox.style.left = `${event.clientX}px`;
		textBox.style.top = `${event.clientY}px`;
		document.body.appendChild(textBox);
		// show node id, all neighbors, and isVisited
		let nodeNum = parseInt(node.id) + 1;
		document.innerHTML = textBox.innerHTML = "<h3>Node: " + nodeNum + "</h3><h3>Neighbors: " + neighborsHidden + "</h3><h3>Visited: " + visited + "</h3>";
		nodeClicked = node;
	  } else if (nodeClicked == node) {
		document.body.removeChild(textBox);
		nodeClicked = null;
	  }
	});
	newSigmaObject.graph.nodes().forEach(function(node) {node.parent = null;});
	
  
	return newSigmaObject;
  }
  
  