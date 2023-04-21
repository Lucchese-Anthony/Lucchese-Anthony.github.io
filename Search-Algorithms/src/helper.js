var Queue = /** @class */ (function () {
    function Queue() {
        this.queue = [];
    }
    Queue.prototype.enqueue = function (item) {
        // update queue class
        var q = document.getElementById("queue");
        q.innerHTML += "<li>" + item.node.id + "</li>";
        this.queue.push(item);
    };
    Queue.prototype.dequeue = function () {
        var q = document.getElementById("queue");
        q.innerHTML = "";
        q.innerHTML += "<h2>Queue</h2><ul>";
        for (var i = 1; i < this.queue.length; i++) {
            q.innerHTML += "<li>" + (parseInt(this.queue[i].node.id) + 1) + "</li>";
        }
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
    Queue.prototype.in = function (node) {
        for (var i = 0; i < this.queue.length; i++) {
            if (this.queue[i].node.id == node.id) {
                return true;
            }
        }
        return false;
    };
    // update html element every time queue is updated
    // update queue on change

    return Queue;
}());

var Stack = /** @class */ (function () {
    function Stack() {
        this.stack = [];
    }
    Stack.prototype.push = function (item) {
        // update stack class
        var s = document.getElementById("stack");
        s.innerHTML += "<li>" + item.node.id + "</li>";
        this.stack.push(item);
    };  
    Stack.prototype.pop = function () {
        var s = document.getElementById("stack");
        s.innerHTML = "";
        s.innerHTML += "<h2>Stack</h2><ul>";
        for (var i = 0; i < this.stack.length - 1; i++) {
            s.innerHTML += "<li>" + this.stack[i].node.id + "</li>";
        }
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
    return Stack;
}());
// create node structure with current and parent node
var Node = /** @class */ (function () {
    function Node(current, parent) {
        this.current = current;
        this.parent = parent;
    }
    return Node;
}());


function changeColorOfVisitedNode(node) {
    s.graph.nodes(node.id).color = 'lightblue'; // red
    s.refresh();
}
function changeColorOfCompletedNode(node) {
    s.graph.nodes(node.id).color = 'green';
    s.refresh();
}
  
function ifEdge(edge, node, target) {
    return (edge.source == node.id && edge.target == target.id) || (edge.source == target.id && edge.target == node.id);
}
  
function changeColorOfVisitedEdge(source, target) {
    for (var edge of s.graph.edges()) {
      if (ifEdge(edge, source, target)) {
        edge.color = 'lightblue';
      }
    }
    s.refresh();
}
function changeColorOfPathEdge(source, target) {
    for (var edge of s.graph.edges()) {
      if (ifEdge(edge, source, target)) {
        edge.color = 'green';
      }
    }
}
  
 function getEdgesOfPath(path) {
    var edges = [];
    for (var i = 0; i < path.length - 1; i++) {
      for (var edge of s.graph.edges()) {
        if (ifEdge(edge, path[i], path[i + 1])) {
          edges.push(edge);
        }
      }
    }
    return edges;
}
window.addEventListener('load', () => {
    const myDropdown = document.getElementById('graph');
    myDropdown.selectedIndex = -1;
  });
function getNeighborsHidden(node) {
    var neighbors = [];
    for (var edge of s.graph.edges()) {
      if (edge.source == node.id) {
        neighbors.push(edge.target);
      } else if (edge.target == node.id) {
        neighbors.push(edge.source);
      }
    }
    return neighbors;
}

function step() {
    if (stepThroughAlgorithmButton > 0) {
        console.log("stepThroughAlgorithmButton: " + stepThroughAlgorithmButton)
        while(stepThroughAlgorithmButton == stepThroughAlgorithmLoop) {}
    }
}
