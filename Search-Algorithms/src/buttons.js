function completeAlgorithm() {
    let algorithm = document.getElementById("algorithm-list").value;
    // get path id start and finish
    if (!getCurrentStartAndFinish() || algorithmCompleted) {
        console.log("cant run algorithm");
        console.log("getCurrentStartAndFinish(): " + getCurrentStartAndFinish());
        console.log("algorithmCompleted: " + algorithmCompleted);
        return;
    }
    runningCompleteAlgorithm = true;
    if (algorithm == "Custom") {
        if(confirm("is your algorithm function main()?")) {
            let algo = document.getElementById("custom-algorithm-text").value.trim()
            eval("main()");
        } else {
            let algo = document.getElementById("custom-algorithm-text").value.trim()
            // prompt user to enter function name
            eval(algo);
            let algoName = prompt("What is the name of your algorithm function?");
            eval(algoName + "()");
        }
    } else {
        algorithmList[algorithm]();
    }
    algorithmCompleted = true;
}


function onPathButtonPressed() {
    let start = document.getElementById("start").value ? document.getElementById("start").value : document.getElementById("start").placeholder;
    let end = document.getElementById("finish").value ? document.getElementById("finish").value : document.getElementById("finish").placeholder;
    if (start == "" || end == "") {
        alert("Please enter a start and finish node");
        return;
    }
    if (start == end) {
        alert("Start and finish cannot be the same");
        return;
    }
    if (start < 1 || start > s.graph.nodes().length || end < 1 || end > s.graph.nodes().length) {
        alert("Start and finish must be between 1 and " + s.graph.nodes().length);
        return;
    }
    startNode = s.graph.nodes(start - 1);
    endNode = s.graph.nodes(end - 1);
    setStartAndFinishColor();
}

function stepThroughAlgorithm() {
    let algorithm = document.getElementById("algorithm-list").value;
    if (algorithmCompleted || stepThroughAlgorithmLoop != 0) {
        return;
    } else {
        if (algorithm == "Breadth First Search") {
            console.log("bfs")
            bfs();
        } else if (algorithm == "Depth First Search") {
            dfs();
        } else if (algorithm == "Custom") {
            if(confirm("is your algorithm function main()?")) {
                let algo = document.getElementById("custom-algorithm-text").value.trim()
                eval("main()");
            } else {
                let algo = document.getElementById("custom-algorithm-text").value.trim()
                // prompt user to enter function name
                eval(algo);
                let algoName = prompt("What is the name of your algorithm function?");
                eval(algoName + "()");
            }
        }
        stepThroughAlgorithmLoop++;
    }   

}

function exportStateOfWebsite() {
    startNode = removeCyclicObject(startNode)
    endNode = removeCyclicObject(endNode)
    console.log(queue.exportToJSON())
    let state = {
        "nodes": s.graph.nodes(),
        "edges": s.graph.edges(),
        "algorithm": document.getElementById("algorithm-list").value,
        "start": startNode,
        "end": endNode,
        "algo": document.getElementById("custom-algorithm-text").value,
        "steps": steps,
        "visitedNodes": Object.fromEntries(visitedNodes.map((x, i) => [i, x])), 
        "queue": queue.exportToJSON(),
        "stack": stack.exportToJSON(),
        "algorithmCompleted": algorithmCompleted,
        "stepThroughAlgorithmLoop": stepThroughAlgorithmLoop,
        "stepThroughAlgorithmButton": stepThroughAlgorithmButton,
        "verbose": document.getElementById("verbose-logs").value,
    }
    // export the state as a JSON file and save it to the user's computer
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    let downloadAnchorNode = document.createElement('a');
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
    let seenObjects = [];

    while(node.parent != null) {
        let parent = node.parent;
        if (seenObjects.indexOf(parent) !== -1) {
            node.parent = null;
            break;
        }
        seenObjects.push(parent);
        node = parent;
    }
    return node;
}

function importStateOfWebsite(file) {
    let jsonFile = JSON.parse(file);
    let nodes = jsonFile.nodes;
    let edges = jsonFile.edges;
    let algorithm = jsonFile.algorithm;
    startNode = jsonFile.start;
    endNode = jsonFile.end;
    let algo = jsonFile.algo;
    this.steps = jsonFile.steps;
    this.visitedNodes = Object.values(jsonFile.visitedNodes);
    this.queue = queue.importFromJSON(jsonFile.queue);
    this.stack = stack.importFromJSON(jsonFile.stack);
    this.algorithmCompleted = jsonFile.algorithmCompleted;
    this.stepThroughAlgorithmLoop = jsonFile.stepThroughAlgorithmLoop;
    this.stepThroughAlgorithmButton = jsonFile.stepThroughAlgorithmButton;
    document.getElementById("verbose-logs").value = jsonFile.verbose;
    s.graph.clear();
    s.graph.read({
        "nodes": nodes,
        "edges": edges
    });
    document.getElementById("algorithm-list").value = algorithm;
    document.getElementById("custom-algorithm-text").value = algo;
    s.refresh();
    if (algorithmCompleted) {
        document.getElementById("stepThroughAlgorithmButton").disabled = true;
    }
    if (stepThroughAlgorithmLoop == 0) {
        document.getElementById("stepThroughAlgorithmButton").disabled = true;
    }
    if (stepThroughAlgorithmButton == 0) {
        document.getElementById("stepThroughAlgorithmButton").disabled = true;
    }
    console.log(queue)
    updateQueueUI();
    updateStackUI();
}

function toggleVerboseLogging() {
    let verboseLogsTextBox = document.getElementById("verbose-logs-area");
    let customCodeTextBox = document.getElementById("custom-text-area");
    // if checked
    if (document.getElementById("verbose-logging").checked) {
      console.log("checked")
      verboseLogsTextBox.style = "  display:inline-block; width: 48%;height: 100%;position: relative;";
      customCodeTextBox.style.width = "49%";
    } else {
      console.log("unchecked")
      verboseLogsTextBox.style = "display: none;";
      customCodeTextBox.style.width = "98%";
  
    }
}  

let textbox = null;
function spawnTextBox(node, neighbors, visited) {
	textBox = document.createElement('div');
	textBox.className = 'text-box';
	textBox.style.left = `${event.clientX}px`;
	textBox.style.top = `${event.clientY}px`;
	document.body.appendChild(textBox);
	// show node id, all neighbors, and isVisited
	let nodeNum = parseInt(node.id) + 1;
	document.innerHTML = textBox.innerHTML = "<h3>Node: " + nodeNum + "</h3><h3>Neighbors: " + neighbors + "</h3><h3>Visited: " + visited + "</h3>";
	textBox.addEventListener('click', handleTextBoxClick);
	}

function deleteTextBox() {
	if (textBox) {
		document.body.removeChild(textBox);
		textBox = null;
		document.removeEventListener('click', handleDocumentClick);
		textBox.removeEventListener('click', handleTextBoxClick);
	}
}

function handleTextBoxClick(event) {
	console.log(event)
	deleteTextBox()
}