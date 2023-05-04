let s = newInstanceOfSigma("Grid");
window.onload = function() {
  let dropdown = document.getElementById("graph-list");
  dropdown.value = "Grid";
};
let runningCompleteAlgorithm = false;
let algorithmCompleted = false;
let stepThroughAlgorithmButton = 0;
let stepThroughAlgorithmLoop = 0;
let stepAlgorithm = false;
let steps = 0;

let visitedNodes = [];
let dataStructureList = [];
let startNode
let endNode
setStartAndFinishPlaceholdersDefault();

// TODO comments below
// update so each instance of the ID is not required to be a number
// data structure abstraction, allow for n queues and m stacks, and allow for custom visuals for user-defined data stucture
// fix import then stepping through algorithm
// think about how to add weights etc etc

function getNeighbors(node, graph=s.graph) {
  let neighbors = [];
  if (node == null) {
    return neighbors;
  }
  for (let i = 0; i < graph.edges().length; i++) {
    if (graph.edges()[i].source == node.id) {
      // fix this to make it use ID's and sort
      neighbors.push(graph.edges()[i].target);
    } else if (graph.edges()[i].target == node.id) {
      neighbors.push(graph.edges()[i].source);
    }
  }
  changeColorOfVisitedNode(node);
  for (let edge of graph.edges()) {
    changeColorOfVisitedEdge(node, graph.nodes(edge.target));
  }

  return neighbors;
} 

function findCompletedPath(node, startNode) {
  let path = [];
  while (node != startNode) {
    path.push(node);
    node = node.parent;
  }
  path.push(startNode);
  edges = getEdgesOfPath(path);
  for(let i = 0; i < path.length; i++) {
    changeColorOfCompletedNode(path[i]);
    for (let edge of edges) {
      changeColorOfPathEdge(path[i], s.graph.nodes(edge.target));
    }
  }
  return path;
}

function isVisited(node) {
  return visitedNodes.includes(node.id);
}

function pushVisitedNode(node) {
  visitedNodes.push(node.id);
}

function log(str) {
  if (typeof(str) != "string") {
    return;
  }
	let verboseBox = document.getElementById("verbose-logs");
	// add new line after str
	verboseBox.innerHTML += str + "\n"
}

function step() {
  updateDSUI()
  if (runningCompleteAlgorithm) {
      return
  } else if (step == 0) {
      step++
      return
  } else if (step > 10000) {
    // do something here regarding infinite loops etc etc
  }
  return new Promise(resolve => {
    // Add event listener for user input (e.g. button click)
    const button = document.getElementById("stepThroughAlgorithmButton");
    button.addEventListener("click", () => {
      // Remove event listener and resolve the promise
      button.removeEventListener("click", () => {});
      resolve();
    });
  });
}

function getEdgesOfPath(path) {
	let edges = [];
	for (let i = 0; i < path.length - 1; i++) {
	  for (let edge of s.graph.edges()) {
		if (ifEdge(edge, path[i], path[i + 1])) {
		  edges.push(edge);
		}
	  }
	}
	return edges;
}

function ifEdge(edge, node, target) {
	return (edge.source == node.id && edge.target == target.id) || (edge.source == target.id && edge.target == node.id);
}



function createDataStructure(name,structure=null) {
  if (name == "Queue") {
    let queue = new Queue();
    dataStructureList.push(queue);
    return queue;
  } else if (name == "Stack") {
    let stack = new Stack();
    dataStructureList.push(stack);
    return stack;
  } else if (name == "Priority Queue") {
    let priorityQueue = new PriorityQueue();
    dataStructureList.push(priorityQueue);
    return priorityQueue;
  } else {
    dataStructureList.push(structure)
    return;
  }
}

function removeDataStructureFromList(structure) {
  let index = dataStructureList.indexOf(structure);
  if (index > -1) {
    dataStructureList.splice(index, 1);
  }
}