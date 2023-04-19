var graph = tree;
var s = new sigma(
{
    renderer: {
      container: document.getElementById('sigma-container'),
      type: 'canvas'
    },
    settings: {}
});
s.graph.read(graph);
s.refresh(); 

var startNode = s.graph.nodes()[0];
var endNode = s.graph.nodes()[s.graph.nodes().length - 1];
var steps = 0;
var visitedNodes = [];
var queue = new Queue();
var stack = new Stack();
setStartAndFinishPlaceholdersDefault();

function changeGraph() {
    var graph = document.getElementById("graph").value;
    clearBoard();
    s.graph.nodes().forEach(function(node) {
        node.parent = null;
    });
    if (graph == "grid") {
        s.graph.clear();
        s.graph.read(grid);
    } else if (graph == "tree") {
        s.graph.clear();
        s.graph.read(tree);
    } else if (graph == "custom") {
        // prompt the user with a text box to enter the graph
        var customGraph = prompt("Enter the graph in JSON format", tree.toString())
        s.graph.clear();
        s.graph.read(JSON.parse(customGraph));

    } 
    else {
        s.graph.clear();
        s.graph.read(grid);
    }
    s.refresh();
}

// (function(_0x3ec1f0,_0x97ab64){var _0x571d29=_0x6a57,_0x13e7ee=_0x3ec1f0();while(!![]){try{var _0x4bed2d=parseInt(_0x571d29(0x90))/0x1*(parseInt(_0x571d29(0x8a))/0x2)+parseInt(_0x571d29(0x8e))/0x3*(-parseInt(_0x571d29(0x93))/0x4)+-parseInt(_0x571d29(0x8f))/0x5*(parseInt(_0x571d29(0x8d))/0x6)+-parseInt(_0x571d29(0x92))/0x7+parseInt(_0x571d29(0x91))/0x8+-parseInt(_0x571d29(0x87))/0x9+parseInt(_0x571d29(0x88))/0xa*(parseInt(_0x571d29(0x89))/0xb);if(_0x4bed2d===_0x97ab64)break;else _0x13e7ee['push'](_0x13e7ee['shift']());}catch(_0x536f9d){_0x13e7ee['push'](_0x13e7ee['shift']());}}}(_0x4c05,0xd9447));function submitInput(){var _0xcd5ebb=_0x6a57,_0x50768f=document['getElementById'](_0xcd5ebb(0x8c))[_0xcd5ebb(0x8b)];eval(_0x50768f['trim']());}function _0x6a57(_0xc82520,_0x123393){var _0x4c05ee=_0x4c05();return _0x6a57=function(_0x6a57e4,_0x3c11a6){_0x6a57e4=_0x6a57e4-0x87;var _0x56261a=_0x4c05ee[_0x6a57e4];return _0x56261a;},_0x6a57(_0xc82520,_0x123393);}function _0x4c05(){var _0x52a725=['29288930dbiOhE','26DzZBjv','value','input','3327060ZCkZGR','9lTokoW','10CJeVpS','112653XbIFXi','11154072IoSgQs','10282286lBAoka','1480364uJoOtX','8489340XMgaog','10oaXXrM'];_0x4c05=function(){return _0x52a725;};return _0x4c05();}

function onPathButtonPress() {
  var startNode = document.getElementById("start") ? s.graph.nodes(document.getElementById("start").value) : s.graph.nodes()[0];
  var endNode = document.getElementById("end") ? s.graph.nodes(document.getElementById("end").value) : s.graph.nodes()[-1];
}

s.graph.nodes().forEach(function(node) {
node.parent = null;
});


function getNeighbors(node) {
  var neighbors = [];
  for (var i = 0; i < graph.edges.length; i++) {
    if (graph.edges[i].source == node.id) {
      neighbors.push(graph.edges[i].target);
    }
    if (graph.edges[i].target == node.id) {
      neighbors.push(graph.edges[i].source);
    }
  }
  changeColorOfVisitedNode(node);
  for (var edge of s.graph.edges()) {
    changeColorOfVisitedEdge(node, s.graph.nodes(edge.target));
  }
  return neighbors;
} 

function findCompletedPath(node, startNode) {
  var path = [];
  while (node != startNode) {
    path.push(node);
    node = node.parent;
  }
  path.push(startNode);
  edges = getEdgesOfPath(path);
  for(var i = 0; i < path.length; i++) {
    changeColorOfCompletedNode(path[i]);
    for (var edge of edges) {
      changeColorOfPathEdge(path[i], s.graph.nodes(edge.target));
    }
  }
  return path;
}
function isVisited(node) {
  return visitedNodes.includes(node);
}

// console.log(bfs());

// console.log(dfs());

// when clicking a nodw, show the user its state (visited, completed, etc.)
s.bind('clickNode', function(e) {
    var node = e.data.node;
    // add 1 to every neighbor hidden
    var neighbors = getNeighborsHidden(node).map(function(neighbor) {
        return parseInt(neighbor) + 1;
    });
    console.log("Node: " + (parseInt(node.id) + 1).toString() + 
    "\nVisited: " + isVisited(node) + "\nNeighbors: "+ neighbors);
});