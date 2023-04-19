function clearBoard() {
    if (confirm("Are you sure you want to clear the board?")) {
        var graph = document.getElementById("graph").value;
        if (graph == "grid") {
            s.graph.clear();
            s.graph.read(grid);
        }
        else if (graph == "tree") {
            s.graph.clear();
            s.graph.read(tree);
        }
        else {
            alert("No graph selected, defaulting to tree.");
            s.graph.clear();
            s.graph.read(tree);
        }
        s.graph.nodes().forEach(function(node) {node.parent = null;});
    }
    queue = new Queue();
    stack = new Stack();
    steps = 0;
    visitedNodes = [];
    s.refresh();
}

function showLogs() {
    var logs = document.getElementById("logs");
    logs.style.display = "block";
}

function completeAlgorithm() {
    var algorithm = document.getElementById("algorithm").value;
    if (algorithm == "BFS") {
        bfs();
    } else if (algorithm == "DFS") {
        dfs();
    } else if (algorithm == "Custom") {
        var algo = document.getElementById("algo").value.trim()
        // prompt user to enter function name
        var func = prompt("Enter function name: ");
        // eval() function to execute the function
        eval(func + "()");
    }
}
function setStartAndFinishPlaceholdersDefault() {
    document.getElementById("start").placeholder = parseInt(startNode.id + 1)
    document.getElementById("end").placeholder = parseInt(endNode.id) + 1
    
}