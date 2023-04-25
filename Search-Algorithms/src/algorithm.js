let algorithmList = {
  "Breadth First Search": bfs,
  "Depth First Search": dfs,
  "Uniformed Search": uniformedSearch
}

async function bfs() {
  queue.enqueue({node: startNode, parent: null});
  log("Enqueued " + startNode.label)
  while (!queue.isEmpty()) {
    let currentNode = queue.dequeue();
    log("Dequeued " + currentNode.node.label)
    if (currentNode.node == endNode) {
      log("Found end node " + endNode.label + " from " + currentNode.node.label + "")
      return findCompletedPath(currentNode.node, startNode);
    } else {
      let neighbors = getNeighbors(currentNode.node);
      log("Neighbors of " + currentNode.node.label + " are " + getNeighborsLabel(currentNode.node))
      for (let i = 0; i < neighbors.length; i++) {
        let neighborNode = s.graph.nodes(neighbors[i]);
        log("Checking if " + neighborNode.label + " is visited")
        if (!isVisited(neighborNode)) {
          log("Neighbor " + neighborNode.label + " is not visited")
          pushVisitedNode(neighborNode);
          log("Pushed " + neighborNode.label + " to visited nodes")
          queue.enqueue({node: neighborNode, parent: currentNode.node});
          log("Enqueued " + neighborNode.label)
          neighborNode.parent = currentNode.node;
          log("Set " + neighborNode.label + "'s parent to " + currentNode.node.label)
        } else {
          log("Already visited " + neighborNode.label + "")
        }
      }
    }
    log("Done with " + currentNode.node.label + "")
    await step();
  }
}

async function dfs() {
    stack.push({node: startNode, parent: null});
    while (!stack.isEmpty()) {
      let currentNode = stack.pop();
      if (currentNode.node == endNode) {
        return findCompletedPath(currentNode.node, startNode);
      } else {
        let neighbors = getNeighbors(currentNode.node);
        for (let i = 0; i < neighbors.length; i++) {
          let neighborNode = s.graph.nodes(neighbors[i]);
          if (!isVisited(neighborNode)) {
            pushVisitedNode(neighborNode);
            stack.push({node: neighborNode, parent: currentNode.node});
            neighborNode.parent = currentNode.node;
          } else {
            log("Already visited " + neighborNode.label + "")
          }
        }
      }
      await step();
    }
    return [];
}
async function uniformedSearch() {
  let pq = new PriorityQueue();
  pq.enqueue({node: startNode, parent: null}, 0);
  log("Enqueued " + startNode.label)
  while (!pq.isEmpty()) {
    let currentNode = pq.dequeue();
    log("Dequeued " + currentNode.node.label)
    if (currentNode.node == endNode) {
      log("Found end node " + endNode.label + " from " + currentNode.node.label + "")
      return findCompletedPath(currentNode.node, startNode);
    } else {
      log("Current node is not end node")
      let neighbors = getNeighbors(currentNode.node);
      log("Neighbors of " + currentNode.node.label + " are " + getNeighborsLabel(currentNode.node))
      for (let i = 0; i < neighbors.length; i++) {
        let neighborNode = s.graph.nodes(neighbors[i]);
        log("Checking if " + neighborNode.label + " is visited")
        if (!isVisited(neighborNode)) {
          log("Neighbor " + neighborNode.label + " is not visited")
          pushVisitedNode(neighborNode);
          log("Pushed " + neighborNode.label + " to visited nodes")
          pq.enqueue({node: neighborNode, parent: currentNode.node}, neighborNode.weight);
          log("Enqueued " + neighborNode.label)
          neighborNode.parent = currentNode.node;
        } else {
          log("Already visited " + neighborNode.label + "")
        }
      }
    }
    await step();
  }
  return [];
}