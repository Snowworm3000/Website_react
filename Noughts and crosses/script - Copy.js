document.getElementById("ammountPlayers").value = "";
const ammountPlayersLabel = document.getElementById("ammountPlayersLabel");
const button1 = document.getElementById("1");
const button2 = document.getElementById("2");
const winInfo = document.getElementById("winInfo")

var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = canvas.height = 600;
var ctx = canvas.getContext('2d');
var circle = new Image;
circle.onload = function(){ drawGrid() };
circle.src='./Circle.svg';

var cross = new Image;
cross.onload = function(){ drawGrid() };
cross.src='./Cross.svg';

context = canvas.getContext('2d');

function* range(start, stop, step = 1) {
    if (typeof stop === 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
        yield i;
    }
}

let boardDisplay = []
let board = []
let boardS = 3
function convertBoard(board){
    let boardPrint = []
    for(let i of range(0, board.length, boardS)){
        boardPrint.push(board.slice(i,i+boardS))
    }
    return boardPrint
}

gameLogic()
function gameLogic(){
    board = []
    for(let i of range(boardS**2)){
        board.push(0)
    }
    //board[5] = "X";
    boardDisplay = convertBoard(board)
}

let winName
function arrayEqual(array) {
    winName = array[0]
    if(array[0] != 0){
    return array.every(function(element) {
        return element === array[0];
    });
}else{
    return false
}
}
  

function win(board){ //Checks every way a player could win. Diagonally, vertically or horizontally.
    //Diagonal right
    let diagonal = []
    for(let ir of range(board.length)){
        diagonal.push(board[ir][ir])
    }
    if(arrayEqual(diagonal)){
        return true
    }
    //Diagonal left
    let cols = Array.from((range(board.length -1,-1,-1)));
    diagonal = []
    for(let il of range(board.length)){
        diagonal.push(board[il][cols[il]])
    }
    if(arrayEqual(diagonal)){
        return true
    }

    //Vertical
    for(col of range(board.length)){
        let check = []
        for(row in board){
            check.push(board[row][col])
        }
        if(arrayEqual(check)){
            return true
        }
    }
    //Horizontal
    for(row in board){
        if(arrayEqual(board[row])){
            return true
        }
    }
    
    return false
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

function nextPlayer(currentPlayer,ammount){ //Alternates between players
    if(currentPlayer >= ammount){
        currentPlayer = 1
    }else{
        currentPlayer += 1
    }
    return currentPlayer
}

function possibleMoves(){
    let check=[]
    board.forEach((element,index) => {
        if(element == 0){
            check.push(index);
        }
    });
    return check
}

let ammountPlayers = 2;
function getPlayers(value){
    console.log(value)
    ammount = value
    if(value == 1){
        players = ["X"];
        ammountPlayersLabel.innerHTML = "One player mode"
        button1.disabled = true
        button2.disabled = false
    }else{
        players = ["X","O"];
        ammountPlayersLabel.innerHTML = "Two player mode"
        button1.disabled = false
        button2.disabled = true
    }
}

function randint(max){ //picks a random integer between 0 and the specified maximum
    return Math.round(Math.random() * max);
}

let currentPlayer = 1;
let ammount = 2;
let players = ["X","O"]
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    //console.log("x: " + x + " y: " + y)
    let width = window.innerWidth /3
    if(x >= width*2){
        xSet = 2
    }else if(x >= width*1){
        xSet = 1
    }else{
        xSet = 0
    }

    if(y >= width*2){
        ySet = 2
    }else if(y >= width*1){
        ySet = 1
    }else{
        ySet = 0
    }
    if(boardDisplay[ySet][xSet] == 0){
        boardDisplay[ySet][xSet] = players[currentPlayer -1]
        board = boardDisplay.flat();
        drawGrid()
        currentPlayer = nextPlayer(currentPlayer,ammount)
        if(win(boardDisplay)){
            winInfo.innerText = winName+" has won the game"
        }
    }

    if(ammount == 1){
        board[compMove()] = "O";
        console.log(compMove())
        boardDisplay = convertBoard(board);
        drawGrid()
    }
}

function compMove(){
    //possibleMoves = [index for index, letter in enumerate(boardF) if(letter == 0)]
    possibleMoves = []
    for(let [index,element] of board.entries()){
        if(element == 0){
            possibleMoves.push(index);
        }
    }

    for(i in possibleMoves)
        boardCopy = board.slice();
        boardCopy[possibleMoves[i]] = "O"
        
        if(win(convertBoard(boardCopy))){
            return possibleMoves[i]
        }


    for(i in possibleMoves){
        boardCopy = board.slice();
        boardCopy[possibleMoves[i]] = "X"
        
        if(win(convertBoard(boardCopy))){
            return possibleMoves[i]
        }
    }

    return possibleMoves[randint(possibleMoves.length - 1)]
}

drawGrid()
function drawGrid(){
    let lineWidth = 10
    ctx.beginPath();
    ctx.moveTo(window.innerWidth /3,0);
    ctx.lineTo(window.innerWidth /3,window.innerWidth);
    ctx.lineWidth = lineWidth
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(window.innerWidth /3 *2,0);
    ctx.lineTo(window.innerWidth /3 *2,window.innerWidth);
    ctx.lineWidth = lineWidth
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,window.innerWidth /3);
    ctx.lineTo(window.innerWidth,window.innerWidth /3);
    ctx.lineWidth = lineWidth
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,window.innerWidth /3 *2);
    ctx.lineTo(window.innerWidth,window.innerWidth /3 *2);
    ctx.lineWidth = lineWidth
    ctx.stroke();

    //console.log(boardDisplay)
    //ctx.drawImage(cross,300,0);
    //ctx.drawImage(circle,300,0);
    for(i in boardDisplay){
        let width = window.innerWidth/3
        let row = [0,width,width*2]
        for(j in boardDisplay[i]){
            //console.log(boardDisplay[i][j])
            if(boardDisplay[i][j] == "O"){
                ctx.drawImage(circle,row[j],row[i],width,width);
            }
            else if(boardDisplay[i][j] == "X"){
                ctx.drawImage(cross,row[j],row[i],width,width);
            }
        }
    }
}

// Start listening to resize events and draw canvas.
initialize();

function initialize() {
    // Register an event listener to call the resizeCanvas() function 
    // each time the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
}

// Display custom canvas. In this case it's a blue, 5 pixel 
// border that resizes along with the browser window.
function redraw() {
    drawGrid()
    context.strokeStyle = 'blue';
    context.lineWidth = '5';
    context.strokeRect(0, 0, window.innerWidth, window.innerWidth);
}

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    redraw();
}