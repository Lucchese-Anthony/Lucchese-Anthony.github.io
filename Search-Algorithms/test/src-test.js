const assert = require('assert');
const test_graph = {
    nodes: [
        {id: 0},
        {id: 1},
        {id: 2},
        {id: 3},
        {id: 4}
        
    ],
    edges: [
        {source: 0, target: 1},
        {source: 0, target: 2},
        {source: 1, target: 3},
        {source: 2, target: 3}
    ],
    // create a function edges() that returns the edges array
    edges: function() {
        return this.edges;
    },
    nodes: function() {
        return this.nodes;
    }
}
const node_neighbors = test_graph.nodes[0];
const node_no_neighbors = test_graph.nodes[4];

function getNeighborsNullNodeTest() {
    let result = getNeighbors(null, test_graph);
    assert(result.length == 0);
}

function getNeighborsNodeNoNeighborsTest() {
    let result = getNeighbors(node_no_neighbors, test_graph);
    assert(result.length == 0);
}

function getNeighborsNodeNeighborsTest() {
    let result = getNeighbors(node_neighbors, graph);
    assert(result.length == 2);
    assert(result.includes(2));
    assert(result.includes(3));
}

let functions = [
    getNeighborsNullNodeTest,
    getNeighborsNodeNoNeighborsTest,
    getNeighborsNodeNeighborsTest
]

for(let i = 0; i < functions.length; i++) {
    functions[i]();
}

