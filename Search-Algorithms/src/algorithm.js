function bfs() {
    queue.enqueue({node: startNode, parent: null});
    while (!queue.isEmpty()) {
      var currentNode = queue.dequeue();
      if (currentNode.node == endNode) {
        console.log("found end node")
        return findCompletedPath(currentNode.node, startNode);
      } else {
        var neighbors = getNeighbors(currentNode.node);
        for (var i = 0; i < neighbors.length; i++) {
          var neighborNode = s.graph.nodes(neighbors[i]);
          if (!isVisited(neighborNode)) {
            pushVisitedNode(neighborNode);
            queue.enqueue({node: neighborNode, parent: currentNode.node});
            neighborNode.parent = currentNode.node;
          }
        }
      }
    }
    return [];
}
function dfs() {
    stack.push({node: startNode, parent: null});
    while (!stack.isEmpty()) {
      var currentNode = stack.pop();
      if (currentNode.node == endNode) {
        return findCompletedPath(currentNode.node, startNode);
      } else {
        var neighbors = getNeighbors(currentNode.node);
        for (var i = 0; i < neighbors.length; i++) {
          var neighborNode = s.graph.nodes(neighbors[i]);
          if (!isVisited(neighborNode)) {
            pushVisitedNode(neighborNode);
            stack.push({node: neighborNode, parent: currentNode.node});
            neighborNode.parent = currentNode.node;
          }
        }
      }
    }
    return [];
}