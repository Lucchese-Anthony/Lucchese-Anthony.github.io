# Search Algorithm Visualization

This web application is a visualization of various search algorithms, including Breadth-First Search, Depth-First Search, and Uniformed Search. These algorithms can be run on a graph visualizer, using the library Sigma.js. Some of the graphs that are premade include a 6x6 grid, a tree, K5 (all 5 nodes connect to eachother), a circle, a wheel, a straight line, and a randomly generated graph. 

The web application also allows for the user to create their own graph, and run the search algorithms on it. The user can add nodes, remove nodes, and connect nodes. The user can also change the start and end nodes, and run the search algorithms on the graph.

The web application also allows for the user to add their own search algorithm. The algorithm they run must be a valid search algorithm, and must be written in Javascript. The user can then run their algorithm on any of the graphs, including the ones they create. These algorithms will utilize the built-in functions of the website, so that the visuals and UI will be updated each time the algorithm runs.

Also, each algorithm will be able to increment their algorithm step by step using the "Step Through Algorithm" button. This will allow the user to see how the algorithm works, and how it traverses the graph.

The program has two importand methods, step() which stops the algorithm at the step when the method is called, and log() which logs the current state of the algorithm to the console. The log can contain whatever you like since it has a string as an argument. The log will be displayed in the console, and will also be displayed on the screen in the "Verbose Logging" section.

## How to run the program
To run this program locally, you do not need to install anything. Simply go to the website [here](https://lucchese-anthony.github.io/Search-Algorithms), and the program will run. If you would like to run the program locally, please download the repositiory, and open the index.html file in your browser. The program will run in your browser.

## How to use the program

### Running a premade algorithm

To run a premade algorithm, simply click on the "Select Algorithm" dropdown menu, and select the algorithm you would like to run. Then, click on the "Select Graph" dropdown menu, and select the graph you would like to run the algorithm on. Then, click on either "Complete Algorithm" or "Step Through Algorithm" buttons, and the algorithm will run on the graph. The algorithm will run until it finds the end node, or until it has traversed the entire graph. The algorithm will then display the path it took to get to the end node, and will display the number of nodes it traversed. 

### Creating your own Algorithm

To create your own algorithm, choose "Custom" algorithm in the choose your algorithm dropdown. Then paste your code in the bottom textbox. The algorithm must be written in Javascript, and must be a valid search algorithm. The algorithm will be run on the graph that is currently selected in the "Select Graph" dropdown menu. The algorithm will run until it finds the end node, or until it has traversed the entire graph.

An example of a valid search algorithm is shown below:

```javascript
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
```

the function must be async because step() is an asynchronous function to be run.

The documentation for the methods will be located in the "Documentation" section of the website.

### Creating your own Graph

To create your own graph, you must first create a JSON-formatted node and edge list. An example of such are included in ./src/layouts.js and shown below:

```javascript
{
  "nodes": [
    {
      "id": "0",
      "label": "1",
      "x": 0,
      "y": 0,
      "size": 1,
      "color": "purple"
    },
    {
      "id": "1",
      "label": "2",
      "x": 1,
      "y": 0,
      "size": 1,
      "color": "purple"
    },
    
  ],
  "edges": [
    {
      "id": "0",
      "source": "0",
      "target": "1",
      "size": 1,
      "color": "black"
    }
  ]
}
```
where there are two attributes, nodes and edges. Nodes is a list of nodes, and edges is a list of edges. Each node has an id, label, x and y coordinates, size, and color. Each edge has an id, source, target, size, and color. The id of the node must be unique, and the id of the edge must be unique. The source and target of the edge must be the id of a node. The x and y coordinates of the node must be a number, and the size of the node and edge must be a number. The color of the node and edge must be a string. The label of the node must be a string.

Once you have created your JSON-formatted node and edge list, you can paste it into the "Custom Graph" popup when selecting custom graph. Then, if the JSON is valid, the graph will be created, and you can run the algorithm on it.

### Changing the start and end nodes

To change the start and end nodes, simply click on the node you would like to change, and click on the "Set Path" button . The node will then be changed to the start or end node.  

### Exporting the website state

To export the website state, click on the "Export" button. This will export the current state of the website, including the graph, the start and end nodes, and the algorithm. This will export the state as a JSON file, which can be imported later as a file. This file is saved locally wherever you place it.

### Importing the website state

To import the website state, click on the "Import" button. This will open a file explorer, where you can select the file you would like to import. This file must be a JSON file, and must be a valid JSON file. If the file is valid, the website will be updated to the state of the file. If the file is not valid, the website will not be updated. When updated, the website will be identical to the state of the website exported from

### Verbose Logging

To enable verbose logging, click on the "Verbose Logging" toggle. This will display the logs of the algorithm in the console, and will also display the logs on the screen. The logs will be displayed in the "Verbose Logging" section of the website. To disable verbose logging, click on the "Verbose Logging" button again. This will disable verbose logging, and will no longer display the logs on the screen.

# Documentation

## Globals in ./src/src.js

### `s`
The sigma instance of the graph. This is the graph that is currently being displayed on the screen.

### `startNode`
The start node of the graph. This is the node that the algorithm will start at.

### `endNode`
The end node of the graph. This is the node that the algorithm will end at.

### `queue`
The queue that the algorithm will use. This is a queue that is implemented in ./src/helper.js.

### `stack`
The stack that the algorithm will use. This is a stack that is implemented in ./src/helper.js.

### `visitedNodes`
The list of visited nodes. This is a list of node ids.

### `steps`
The number of steps that the algorithm has taken. This is an integer.

### `runningCompleteAlgorithm`, `algorithmCompleted`, `stepAlgorithm`
Booleans returning their respected value




## Available Functions in ./src/src.js

### `getNeighbors(node)` -> `Array[node]`
Returns a list of neighbors of the given node. This function will return a list of node ids. This function will return an empty list if the node has no neighbors. This function will return null if the node is not in the graph.

### `findCompletedPath(node, startNode)` -> `Array[node]`
Returns a list of nodes that is the completed path from the start node to the end node. This function will return a list of node ids. This function will return null if the node is not in the graph.

### `isVisited(node)` -> `boolean`
Returns true if the node is visited, and false if the node is not visited. This function will return null if the node is not in the graph.

### `pushVisitedNode(node)`
Pushes the node to the visited nodes list. This function will return null if the node is not in the graph.

### `log(message)`
Logs the message to the verbose text box. This function will return null if the message is not a string.

### `step()`
Steps through the algorithm. This function is asynchronous, and must be called with the await keyword. This function will step through the algorithm, and will update the graph and the path. This function will also update the number of nodes traversed. This function will also update the logs if verbose logging is enabled. This function will return a promise, which will resolve when the algorithm is done stepping through. This function will reject if the algorithm is not running.

### `getEdgesOfPath(path)` -> `Array[edge]`
Returns a list of edges that is the completed path from the start node to the end node. This function will return a list of edge ids. This function will return null if the path is not valid.

### `ifEdge(edge, node1, node2)` -> `boolean`
Returns true if the edge is between node1 and node2, and false if the edge is not between node1 and node2. This function will return null if the edge is not in the graph.

## Available Functions in `.src/helper.js`

### `Queue()` -> `Queue`
Creates a new queue. This function will return a queue.
#### `Queue.enqueue(item)`
Enqueues the item to the queue. This function will return null if the item is not a valid item.
#### `Queue.dequeue()` -> `item`
Dequeues the item from the queue. This function will return null if the queue is empty.
#### `Queue.isEmpty()` -> `boolean`
Returns true if the queue is empty, and false if the queue is not empty.
#### `Queue.peek()` -> `item`
Returns the item at the front of the queue. This function will return null if the queue is empty.

### `Stack()` -> `Stack`
Creates a new stack. This function will return a stack.
#### `Stack.push(item)`
Pushes the item to the stack. This function will return null if the item is not a valid item.
#### `Stack.pop()` -> `item`
Pops the item from the stack. This function will return null if the stack is empty.
#### `Stack.isEmpty()` -> `boolean`
Returns true if the stack is empty, and false if the stack is not empty.
#### `Stack.peek()` -> `item`
Returns the item at the top of the stack. This function will return null if the stack is empty.

### `PriorityQueue()` -> `PriorityQueue`
Creates a new priority queue. This function will return a priority queue.
#### `PriorityQueue.enqueue(item, priority)`
Enqueues the item to the priority queue with the given priority. This function will return null if the item is not a valid item, or if the priority is not a valid priority.
#### `PriorityQueue.dequeue()` -> `item`
Dequeues the item from the priority queue. This function will return null if the priority queue is empty.
#### `PriorityQueue.isEmpty()` -> `boolean`
Returns true if the priority queue is empty, and false if the priority queue is not empty.
#### `PriorityQueue.peek()` -> `item`
Returns the item at the front of the priority queue. This function will return null if the priority queue is empty.

### `clearCurrentGraph()`
Clears the current graph. This function will return null. This function will also update the graph and the path. *THIS DELETES AND RESETS A RANDOMIZED GRAPH*

# About

Languages used: HTML/CSS | Javascript 
Frameworks used: Sigma.js | Graphology