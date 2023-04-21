function clearBoard() {
    if (confirm("Are you sure you want to clear the board?")) {
        document.getElementById("sigma-container").innerHTML = "";
        s = newInstanceOfSigma()
        var graph = document.getElementById("graph").value;
        if (graph == "grid") {
            s.graph.clear();
            s.graph.read(grid);
        }
        else if (graph == "tree") {
            s.graph.clear();
            s.graph.read(tree);
        }
        else if (graph == "custom"){
            alert("No graph selected, defaulting to tree.");
            s.graph.clear();
            s.graph.read(tree);
        } else {
            s.graph.clear();
            s.graph.read(tree);
        }
        startNode = s.graph.nodes()[0];
        endNode = s.graph.nodes()[s.graph.nodes().length - 1];

    }
    queue = new Queue();
    stack = new Stack();
    steps = 0;
    visitedNodes = [];
    s.refresh();
    algorithmCompleted = false;
}

function completeAlgorithm() {
    var algorithm = document.getElementById("algorithm").value;
    // get path id start and finish
    var start = document.getElementById("start").value ? document.getElementById("start").value : document.getElementById("start").placeholder;
    var end = document.getElementById("end").value ? document.getElementById("end").value : document.getElementById("end").placeholder;
    if(algorithmCompleted) {
        return;
    } else {
        if (algorithm == "BFS") {
            bfs();
        } else if (algorithm == "DFS") {
            dfs();
        } else if (algorithm == "Custom") {
            var algo = document.getElementById("algo").value.trim()
            // prompt user to enter function name
            eval(algo);
            eval("main()");
        }
        algorithmCompleted = true;
    }
}
function setStartAndFinishPlaceholdersDefault() {
    document.getElementById("start").placeholder = parseInt(startNode.id + 1)
    document.getElementById("end").placeholder = parseInt(endNode.id) + 1
    
}
function onPathButtonPressed() {
    var start = document.getElementById("start").value ? document.getElementById("start").value : document.getElementById("start").placeholder;
    var end = document.getElementById("end").value ? document.getElementById("end").value : document.getElementById("end").placeholder;
    if (start > s.graph.nodes().length || end > s.graph.nodes().length) {
        alert("Please enter a valid start and end node");
    } else {
        startNode = s.graph.nodes()[start - 1];
        endNode = s.graph.nodes()[end - 1];
        startNode.color = 'green';
        endNode.color = 'red';
        s.refresh();
    }
}
function stepThroughAlgorithm() {
    if (algorithmCompleted || stepThroughAlgorithmLoop == 0) {
        return;
    } else {
        if (algorithm == "BFS") {
            bfs();

        } else if (algorithm == "DFS") {
            dfs();
        } else if (algorithm == "Custom") {
            var algo = document.getElementById("algo").value.trim()
            // prompt user to enter function name
            eval("main()");
        }
        algorithmCompleted = true;
    }   

}

function exportStateOfWebsite() {
    // create a JSON file with the current state of the website, including 
    // the graph, the algorithm, the start and end nodes, and the algorithm
    // code if the algorithm is custom, and the steps taken, and the visited nodes
    // and the queue and stack, algorithmCompleted, and stepThroughAlgorithmLoop
    // ans stepThroughAlgorithmButton
    startNode = removeCyclicObject(startNode)
    endNode = removeCyclicObject(endNode)
    var stateS = s
    var state = {
        "s": stateS, 
        "algorithm": document.getElementById("algorithm").value,
        "start": startNode,
        "end": endNode,
        "algo": document.getElementById("algo").value,
        "steps": steps,
        "visitedNodes": Object.fromEntries(visitedNodes.map((x, i) => [i, x])), 
        "queue": queue,
        "stack": stack,
        "algorithmCompleted": algorithmCompleted,
        "stepThroughAlgorithmLoop": stepThroughAlgorithmLoop,
        "stepThroughAlgorithmButton": stepThroughAlgorithmButton
    }
    console.log(state)
    // export the state as a JSON file and save it to the user's computer
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "state.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

}

function removeCyclicObject(node) {
    if (node == null) {
        return;
    }
    var seenObjects = [];

    while(node.parent != null) {
        var parent = node.parent;
        if (seenObjects.indexOf(parent) !== -1) {
            node.parent = null;
            break;
        }
        seenObjects.push(parent);
        node = parent;
    }
    return node;
}

function importStateOfWebsite() {
    // create prompt to upload a JSON file with the current state of the website, including
    // the graph, the algorithm, the start and end nodes, and the algorithm
    // code if the algorithm is custom, and the steps taken, and the visited nodes
    // and the queue and stack, algorithmCompleted, and stepThroughAlgorithmLoop
    // ans stepThroughAlgorithmButton
    var jsonFile = prompt("Please paste the JSON file here");
    var file = new File([jsonFile], "state.json", {type: "application/json"});
    var reader = new FileReader();
    reader.onload = function(e) {
        var state = JSON.parse(e.target.result);
        s = state.s;
        document.getElementById("algorithm").value = state.algorithm;
        startNode = state.start;
        endNode = state.end;
        document.getElementById("algo").value = state.algo;
        steps = state.steps;
        visitedNodes = Object.values(state.visitedNodes);
        queue = state.queue;
        stack = state.stack;
        algorithmCompleted = state.algorithmCompleted;
        stepThroughAlgorithmLoop = state.stepThroughAlgorithmLoop;
        stepThroughAlgorithmButton = state.stepThroughAlgorithmButton;
        s.refresh();
    }
    reader.readAsText(file);
}