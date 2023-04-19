function bfs() {
    queue.enqueue({node: startNode, parent: null});
    while (!queue.isEmpty()) {
      var currentNode = queue.dequeue();
      var neighbors = getNeighbors(currentNode.node);
      for (var i = 0; i < neighbors.length; i++) {
        var neighborNode = s.graph.nodes(neighbors[i]);
        if (!isVisited(neighborNode.id)) {
          visitedNodes.push(neighborNode.id);
          queue.enqueue({node: neighborNode, parent: currentNode.node});
          neighborNode.parent = currentNode.node;
          if (neighborNode == endNode) {
            return findCompletedPath(neighborNode, startNode);
          }
        }
      }
    }
}
function dfs() {
    stack.push({node: startNode, parent: null});
    while (!stack.isEmpty()) {
      var currentNode = stack.pop();
      var neighbors = getNeighbors(currentNode.node);
      for (var i = 0; i < neighbors.length; i++) {
        var neighborNode = s.graph.nodes(neighbors[i]);
        if (!isVisited(neighborNode.id)) {
          visitedNodes.push(neighborNode.id);
          stack.push({node: neighborNode, parent: currentNode.node});
          neighborNode.parent = currentNode.node;
          if (neighborNode == endNode) {
            return findCompletedPath(neighborNode, startNode);
          }
        }
      }
    }
    return [];
}