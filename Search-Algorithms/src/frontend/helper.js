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



function setStartAndFinishPlaceholdersDefault() {
    let start = s.graph.nodes()[0];
    let end = s.graph.nodes()[s.graph.nodes().length - 1];
    document.getElementById("start").placeholder = parseInt(start.id + 1)
    document.getElementById("finish").placeholder = parseInt(end.id) + 1
	return start, end;
}

function newInstanceOfSigma(graph_name) {
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
	newSigmaObject.graph.read(getPremadeGraph(graph_name));
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
	// refresh the graph
	newSigmaObject.refresh();
  
	return newSigmaObject;
}

function updateDSUI() {
	let DScontainer = document.getElementById("structure-container");
	DScontainer.innerHTML = "";
	for (let i = 0; i < dataStructureList.length; i++) {
		console.log
		let DS = dataStructureList[i];
		let DSdiv = document.createElement("div");
		DSdiv.className = "stack";
		DSdiv.class
		DSdiv.innerHTML = "<h3>" + Object.keys(dataStructureList[i])[0] + "</h3>";
		DScontainer.appendChild(DSdiv);
		let count = Object.values(DS)[0].length;
		for(let j = 0; j < count; j++) {
			let DSli = document.createElement("li");
			DSli.innerHTML = Object.values(DS)[0][j].node.label;
			DSdiv.appendChild(DSli);
		}
	}

}

function getNewDataStructure(name) {
	// make name first letter uppercase the rest lowercase
	let structure = null
	if (name == "Queue" || name == "Stack" || name == "PriorityQueue" || name == "queue" || name == "stack" || name == "priorityqueue") {
		name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
		structure = eval("new " + name + "()")
		dataStructureList.push(structure);
	} else {
		if(confirm("have you placed the data structure in your custom code?")) {
			structure = eval("new " + name + "()")
			dataStructureList.push(structure);
		}
	}
	if (structure == null) {
		throw "Invalid data structure name"
	}
	return structure
}