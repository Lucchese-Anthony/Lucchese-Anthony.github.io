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