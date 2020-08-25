//document.getElementById("ammountPlayers").value = "";
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

let winType = 0;
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
    console.log("reset")
    board = []
    for(let i of range(boardS**2)){
        board.push(0)
    }
    //board[5] = "X";
    boardDisplay = convertBoard(board)
}

function resetBoard(){
    gameLogic()
    ctx.clearRect(0,0,canvas.width,canvas.height)
    currentPlayer = nextPlayer(currentPlayer,ammount);
    playingGame = true
    drawGrid();
    winInfo.innerText = ""
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
        winType = 1
        return true
    }
    //Diagonal left
    let cols = Array.from((range(board.length -1,-1,-1)));
    diagonal = []
    for(let il of range(board.length)){
        diagonal.push(board[il][cols[il]])
    }
    if(arrayEqual(diagonal)){
        winType = 2
        return true
    }

    //Vertical
    for(col of range(board.length)){
        let check = []
        for(row in board){
            check.push(board[row][col])
        }
        if(arrayEqual(check)){
            winType = col + 6
            return true
        }
    }
    //Horizontal
    for(row in board){
        if(arrayEqual(board[row])){
            winType = parseInt(row) + 3
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
        resetBoard()
    }else{
        players = ["X","O"];
        ammountPlayersLabel.innerHTML = "Two player mode"
        button1.disabled = false
        button2.disabled = true
        resetBoard()
    }
}

function randint(max){ //picks a random integer between 0 and the specified maximum
    return Math.round(Math.random() * max);
}

let playingGame = true
let currentPlayer = randint(1) + 1;
let ammount = 2;
let players = ["X","O"]
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    //console.log("x: " + x + " y: " + y)
    let width = windowSize /3
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
    if(boardDisplay[ySet][xSet] == 0 && playingGame){ //Check if space isn't taken
        boardDisplay[ySet][xSet] = players[currentPlayer -1]
        board = boardDisplay.flat();
        drawGrid()
        currentPlayer = nextPlayer(currentPlayer,ammount)
        if(win(boardDisplay)){
            winInfo.innerText = winName+" has won the game"
            playingGame = false
            drawGrid();
        }


        if(ammount == 1 && playingGame){ //If only one player is playing, computer makes move.
            board[compMove()] = "O";
            console.log(compMove())
            boardDisplay = convertBoard(board);
            drawGrid()
            if(win(boardDisplay)){
                winInfo.innerText = winName+" has won the game"
                playingGame = false
                drawGrid();
            }
        }
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

    for(i in possibleMoves){
        boardCopy = board.slice();
        boardCopy[possibleMoves[i]] = "O"
         
        if(win(convertBoard(boardCopy))){
            return possibleMoves[i]
        }
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


let windowSize = window.innerWidth;

console.log("HELLO")

drawGrid()
function drawGrid(){
    ctx.fillStyle = "#14bdac";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "#6bdbfa";

    let lineWidth = 10
    ctx.beginPath();
    ctx.moveTo(windowSize /3,0);
    ctx.lineTo(windowSize /3,windowSize);
    ctx.lineWidth = lineWidth
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(windowSize /3 *2,0);
    ctx.lineTo(windowSize /3 *2,windowSize);
    ctx.lineWidth = lineWidth
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,windowSize /3);
    ctx.lineTo(windowSize,windowSize /3);
    ctx.lineWidth = lineWidth
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,windowSize /3 *2);
    ctx.lineTo(windowSize,windowSize /3 *2);
    ctx.lineWidth = lineWidth
    ctx.stroke();

    //console.log(boardDisplay)
    //ctx.drawImage(cross,300,0);
    //ctx.drawImage(circle,300,0);
    for(i in boardDisplay){
        let size = canvas.width / 4
        console.log(size)
        let width = windowSize/3 //-size
        //let row = [0+ size/2,width + size,width*2 + size*2]
        let row = [1,2,3]
        console.log(row)
        for(j in boardDisplay[i]){
            //console.log(boardDisplay[i][j])
            if(boardDisplay[i][j] == "O"){
                locationX = windowSize /3 * row[j] - windowSize/6
                locationY = windowSize /3 * row[i] - windowSize/6
                ctx.drawImage(circle, locationX-size/2,locationY-size/2,size,size);
            }
            else if(boardDisplay[i][j] == "X"){
                locationX = windowSize /3 * row[j] - windowSize/6
                locationY = windowSize /3 * row[i] - windowSize/6
                ctx.drawImage(cross, locationX-size/2,locationY-size/2,size,size);
            }
        }
    }

    ctx.strokeStyle = "#000000";
    if(playingGame == false){
        if(winType == 1){
            console.log("Diagonal right")
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(canvas.width,canvas.height);
            ctx.stroke();

        } else if(winType==2){
            console.log("Diagonal left")
            ctx.beginPath();
            ctx.moveTo(0,canvas.height);
            ctx.lineTo(canvas.width,0);
            ctx.stroke();
            
        } else if(6 >winType){
            console.log("Horizontal")
            let direction = canvas.height/6*((winType-2.5) *2);
            console.log(direction)
            ctx.beginPath();
            ctx.moveTo(0,direction);
            ctx.lineTo(canvas.width, direction);
            ctx.stroke();

        } else if(9>winType){
            console.log("Vertical")
            let direction = canvas.height/6*((winType-5.5) *2);
            console.log(direction)
            ctx.beginPath();
            ctx.moveTo(direction,0);
            ctx.lineTo(direction, canvas.height);
            ctx.stroke();
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

// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function resizeCanvas() {
    if(window.innerWidth > window.innerHeight){
        windowSize = window.innerHeight -100
    }else{
        windowSize = window.innerWidth - 100
    }
    canvas.width = windowSize;
    canvas.height = windowSize;
    drawGrid()
}