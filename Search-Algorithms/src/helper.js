var Queue = /** @class */ (function () {
    function Queue() {
        this.queue = [];
    }
    Queue.prototype.enqueue = function (item) {
        this.queue.push(item);
    };
    Queue.prototype.dequeue = function () {
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
    // update html element every time queue is updated
    Queue.prototype.update = function () {
        var queue = document.getElementById("queue");
        queue.innerHTML = "";
        queue.innerHTML += "<h2>Queue</h2><ul>";
        for (var i = 0; i < this.queue.length; i++) {
            queue.innerHTML += "<li>" + this.queue[i].node.id + "</li>";
        }
        queue.innerHTML += "</ul>";
    };

    return Queue;
}());

var Stack = /** @class */ (function () {
    function Stack() {
        this.stack = [];
    }
    Stack.prototype.push = function (item) {
        this.stack.push(item);
    };  
    Stack.prototype.pop = function () {
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