// ./Search-Algorithms/src/src.ts
var endCoords = [0, 0];
var startCoords = [0, 0];
var wallCount = 0;
var steps = 0;
var queue: Cell[];
var seenCells = [];
var isEnd = false;

var btns = {
    walls: false,
    end: false,
    start: false
}

var arrayGrid: Cell[] = []; // grid in a 1d array

class Cell {
    x: number;
    y: number;
    isStart: boolean;
    isWall: boolean;
    pathToStart: any;
    isEnd: boolean;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
        this.pathToStart = null;
    }
}
function clearBoard() {
    changeCellNumber();
    endCoords = [0, 0];
    startCoords = [0, 0];
    wallCount = 0;
    steps = 0;
    isEnd = false;
}

function finishAlgorithm() {
    if (startCoords[0] != 0 && startCoords[1] != 0 && endCoords[0] != 0 && endCoords[1] != 0) {
        while(!isEnd) {
            stepThroughAlgorithm();
        }
    } else {
        alert("please enter a starting and ending point!");
        return;
    }
}

function stepThroughAlgorithm() {
    if (startCoords[0] != 0 && startCoords[1] != 0 && endCoords[0] != 0 && endCoords[1] != 0) {
        if (isEnd) {
            changeCellNumber();
            isEnd = false;
            return;
        }
        if (getCurrentAlgo() == "BFS") {
            if (steps == 0 && queue == null) { // if the current steps through the algo are 0 , and nothing is in the queue
                let cell = findCell(startCoords[0], startCoords[1]);
                let cellElement = document.getElementById(`${cell.x},${cell.y}`);
                try {
                    cellElement.style.backgroundColor = "lightblue";
                    cell.pathToStart = [cell];
                    queue = [cell];
                    steps++;}
                catch {
                    console.log("null cell element || null cell")
                } 
            } else if (queue.length != 0){
                let numOfValidCells = 0;
                while(numOfValidCells == 0 && !isEnd) {
                    steps++;
                    var cell = queue.shift();
                    seenCell(cell);
                    numOfValidCells = checkSurroundingCells(cell);
                }
            } else {
                alert("cannot complete the search!")
                reset();
            }
        } else if (getCurrentAlgo() == "DFS") {
// TODO

            // if (steps == 0 && queue == null) { // if the current steps through the algo are 0 , and nothing is in the queue
            //     let cell = findCell(startCoords[0], startCoords[1]);
            //     let cellElement = document.getElementById(`${cell.x},${cell.y}`);
            //     cellElement.style.backgroundColor = "lightblue";
            //     cell.pathToStart = [cell];
            //     queue = [cell];
            //     steps++;
            // } else if (queue.length != 0){
            //     let numOfValidCells = 0;
            //     while(numOfValidCells == 0 && !isEnd) {
            //         steps++;
            //         let cell = queue.shift();
            //         seenCell(cell);
            //         numOfValidCells = checkSurroundingCells(cell);
            //     }
            // } else {
            //     alert("cannot complete the search!")
            //     reset();
            // }
        }
    } else {
        alert("please enter a starting and ending point!");
        return;
    }
}

function seenCell(cell:Cell) {
    seenCells.push(cell);
    let seenCellElement = document.getElementById(`${cell.x},${cell.y}`);
    seenCellElement.style.backgroundColor = "royalblue";
}

function checkSurroundingCells(cell:Cell) {
    let numOfValidCells = 0;
    /*  xxx    -1,0  xxx
        0,-1    0,0   0,1
        xxx    1,0   xxx
    */
    const adjacentCells = [
        findCell(cell.x-1, cell.y),     // above
        findCell(cell.x, cell.y-1),     // left
        findCell(cell.x, cell.y+1),     // below
        findCell(cell.x+1, cell.y)]     // right

    for(let i = 0; i < adjacentCells.length; i++) {
        if (validCell(adjacentCells[i]) && !isEnd) {
            updateValidCell(cell, adjacentCells[i]);
            numOfValidCells++;
        }
    }
    return numOfValidCells;
}

function updateValidCell(currentCell:Cell, updatedCell:Cell) {
    let cellElement = document.getElementById(`${updatedCell.x},${updatedCell.y}`);
    const previousCellArray = currentCell.pathToStart;
    if (updatedCell.isEnd) {
        cellElement.style.backgroundColor = "white";
        updatedCell.pathToStart = previousCellArray.concat([updatedCell]);
        changePathColor(updatedCell);
        queue = null;
        steps = 0;
        isEnd = true;
    } else {
        cellElement.style.backgroundColor = "lightblue";
        updatedCell.pathToStart = previousCellArray.concat([updatedCell]);
        queue.push(updatedCell);
    }
}

function changePathColor(cell:Cell) {
    for(let i = cell.pathToStart.length - 1; i >= 0; i--) {
        let cellElement = document.getElementById(`${cell.pathToStart[i].x},${cell.pathToStart[i].y}`);
        cellElement.style.backgroundColor = "white";
        cellElement.innerText = `${i % (cell.pathToStart.length)}`;
    }
}

function validCell(cell:Cell) {
    return (cell != null && !cell.isWall && cell.pathToStart == null);
}

function changeCellNumber() {
    reset();
    let choice = (<HTMLInputElement>document.getElementById("grid-form")).value;
    let right_div_html = document.getElementById("grid");
    var grid = "";
    var fullGrid = "";
    for(let i = 1; i <= Number(choice); i++) {
        grid += "<div class='row'>"
        for(let j = 1; j <= Number(choice); j++) {
            grid += `<div class='cells' id='${i},${j}' onclick='cellClicked(${i}, ${j});'></div>`;
            var cell = new Cell(i, j);
            arrayGrid.push(cell);
        }
        fullGrid += grid + "</div>";
        grid = "";
    }
    right_div_html.innerHTML = fullGrid;
    right_div_html.style.gridTemplateColumns = `repeat(${Number(choice)}, auto)`;
}

function changeSizeOfCells() {
    let height = (<HTMLInputElement>document.getElementById("height")).value;
    let width = (<HTMLInputElement>document.getElementById("width")).value;
    const collection = document.getElementsByClassName("cells") as HTMLCollectionOf<HTMLElement>;
    for(let i = 0; i < collection.length; i++) {
        collection[i].style.height = height + "px";
        collection[i].style.width = width + "px";
    }
}

function cellClicked(x:number, y:number) {
    var cellElement = document.getElementById(`${x},${y}`);
    try { 
        var cell = findCell(x, y);
    } 
    catch {console.log("cant find cell")}
    if (btns.walls) {
        if (cell.isWall){
            cellElement.style.backgroundColor = "gray";
            cell.isWall = false;
            wallCount--;
        } else {
            cellElement.style.backgroundColor = "black";
            cell.isWall = true;
            wallCount++;
        }
    } else if (btns.start) {
        if (cell.isStart) {
            cellElement.style.backgroundColor = "gray";
            cell.isStart = false;
            startCoords = [0,0]
        } else if (startCoords[0] == 0 && startCoords[1] == 0){
            cellElement.style.backgroundColor = "green";
            cell.isStart = true;
            startCoords = [x, y];
        }
    } else if (btns.end) {
        if (cell.isEnd) {
            cellElement.style.backgroundColor = "gray";
            cell.isEnd = false;
            endCoords = [0, 0];
        } else if (endCoords[0] == 0 && endCoords[1] == 0){
            cellElement.style.backgroundColor = "yellow";
            cell.isEnd = true;
            endCoords = [x,y];
        }
    }
}

function chooseAlgorithm() {
    if (steps > 0) {
        changeCellNumber();
    }
    let choice = (<HTMLInputElement>document.getElementById("search-algo")).value;
    let right_div_html = document.getElementById("Search-Algo-Title");
    right_div_html.innerHTML = "<h3 class='algo-title'>"
    if (choice == "BFS") {
       right_div_html.innerHTML += "Breadth First Search";
    } else  if (choice == "DFS"){
        right_div_html.innerHTML += "Depth First Search";
    } else {
        right_div_html.innerHTML += "unknown";
    }
    right_div_html.innerHTML += "</h3>"
    
}
function getCurrentAlgo() {
    return (<HTMLInputElement>document.getElementById("search-algo")).value;
}

function setStart() {
    if (btns.start == false) {
        btns.end = false;
        revertButtonColor("endFlag", "End", false);
        btns.start = true;
        revertButtonColor("startFlag", "Start", true);
        btns.walls = false;
        revertButtonColor("setWalls", "Walls", false);
    } else if(btns.start == true) {
        btns.end = false;
        btns.start = false;
        btns.walls = false;
        revertButtonColor("startFlag", "Start", false);
    }
    
}
function setEnd() {
    if (btns.end == false ) {
        btns.end = true;
        revertButtonColor("endFlag", "End", true);
        btns.start = false;
        revertButtonColor("startFlag", "Start", false);
        btns.walls = false;
        revertButtonColor("setWalls", "Walls", false);
    } else if( btns.end == true) {
        btns.end = false;
        btns.start = false;
        btns.walls = false;
        revertButtonColor("endFlag", "End ", false)
    }
}
function setWalls() {
    if (btns.walls == false) {
        btns.end = false;
        revertButtonColor("endFlag", "End", false);
        btns.start = false;
        revertButtonColor("startFlag", "Start", false);
        btns.walls = true;
        revertButtonColor("setWalls", "Walls", true);
    } else if(btns.walls == true) {
        btns.end = false;
        btns.start = false;
        btns.walls = false;
        revertButtonColor("setWalls", "Walls", false);
    }
}

function revertButtonColor(id:string, text:string, isSetting:boolean) {
    let btn = document.getElementById(id);
    if (isSetting) {
        btn.style.backgroundColor = "red"
        btn.innerHTML = `Setting ${text} Flag`;
    } else {
        btn.style.backgroundColor = "#2ea44f"
        btn.innerHTML = `Set ${text} Flag`;
    }
}

function findCell(x:number, y:number) {
    for(let i = 0; i < arrayGrid.length; i++) {
        if(arrayGrid[i].x == x && arrayGrid[i].y == y) {
            return arrayGrid[i];
        }
    }
    return null;
}

function reset() {
    arrayGrid = [];
    btns.walls = false;
    btns.end = false;
    btns.start = false;
    endCoords = [0,0];
    startCoords = [0,0];
    wallCount = 0;
    resetButtons();
}

function resetButtons() {
    let end = document.getElementById("endFlag");
    end.innerHTML = "Set End Flag";
    end.style.backgroundColor = "#2ea44f"
    let start = document.getElementById("startFlag");
    start.innerHTML = "Set Start Flag";
    start.style.backgroundColor = "#2ea44f"
    let walls = document.getElementById("setWalls");
    walls.innerHTML = "Set Walls";
    walls.style.backgroundColor = "#2ea44f"
}

function background () {
    let doc = document.getElementById("background");
    for (var n = 0; n < Math.floor(0.014 * window.innerHeight * window.innerWidth); n++) {
        let stringtonum = Number("0x" + (2571 + Math.floor(Math.random() * Math.floor(2))));
        doc.innerHTML += (String.fromCharCode(stringtonum));
    }
}