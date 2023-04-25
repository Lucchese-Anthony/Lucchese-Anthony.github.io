let graph = premadeGraphs["Grid"];
let s = newInstanceOfSigma();
s.graph.read(graph);
s.refresh();
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
let queue = new Queue();
let stack = new Stack();
let startNode
let endNode
setStartAndFinishPlaceholdersDefault();

function getNeighbors(node) {
  let neighbors = [];
  for (let i = 0; i < s.graph.edges().length; i++) {
    if (s.graph.edges()[i].source == node.id) {
      neighbors.push(s.graph.edges()[i].target);
    } else if (s.graph.edges()[i].target == node.id) {
      neighbors.push(s.graph.edges()[i].source);
    }
  }

  changeColorOfVisitedNode(node);
  for (let edge of s.graph.edges()) {
    changeColorOfVisitedEdge(node, s.graph.nodes(edge.target));
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
  if (runningCompleteAlgorithm) {
      return
  } else if (step == 0) {
      step++
      return
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

