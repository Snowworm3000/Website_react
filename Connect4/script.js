const winDiv = document.getElementById("win");
const canvas = document.getElementById("game");
canvas.width = canvas.height = 600;
var ctx = canvas.getContext('2d');

const yellowCounter = new Image
yellowCounter.onload = function(){ drawGrid() };
yellowCounter.src = "counterYellow.svg"

const redCounter = new Image
redCounter.onload = function(){ drawGrid() };
redCounter.src = "counterRed.svg"

const whiteCounter = new Image
whiteCounter.onload = function(){ drawGrid() };
whiteCounter.src = "counterWhite.svg"




function input(e){
    if(isNaN(e) == false){
        e = parseInt(e);
        if(7>e && e >=0){
            console.log(e)
            makeMove(e);
        }
    }
}

var enter = document.getElementById("textSearch");
enter.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        input(document.getElementById("textSearch").value)
    }
});

let playing = true;
let winType = 0;
let player = 0;
winDiv.hidden = true;
function makeMove(col){
    if(playing){
        if(is_valid_location(board,col)){
            let row = getNextOpenRow(board,col);
            dropPiece(board,row,col,player +1);
            drawGrid()
            if(winning_move(board,player +1)){
                console.log("WINNNER")
                console.log(winType)
                playing = false;
                drawGrid()
                winDiv.hidden = false;
                if(player == 1){
                    winDiv.style.background = "#fa5050";
                }else{
                    winDiv.style.background = "#f1fa50";
                }
            }
            player++
            player = player % 2;
        }else{
            console.log("invalid location")
        }
        printBoard()
    }
}

let rowCount = 6
let columnCount = 7

function dropPiece(board,row,col,piece){
    console.log(row,col,piece)
    board[row][col] = piece;
}


function is_valid_location(board,col){
    return board[rowCount-1][col] == 0;
}

function getNextOpenRow(board,col){
    for(let i=0;i<rowCount;i++){
        if(board[i][col] == 0){
            return i
        }
    }
}

let winner;
function winning_move(board,piece){
    //Check horizontal win
    for(let c=0;c<columnCount-3;c++){
        for(let r=0;r<rowCount;r++){
            if(board[r][c] == piece && board[r][c+1] == piece && board[r][c+2] == piece && board[r][c+3] == piece){
                winType=1
                winner = board[r][c]
                return true;
            }
        }
    }

    //Check vertical win
    for(let c=0;c<columnCount;c++){
        for(let r=0;r<rowCount-3;r++){
            if(board[r][c] == piece && board[r+1][c] == piece && board[r+2][c] == piece && board[r+3][c] == piece){
                winType=2
                winner = board[r][c]
                return true;
            }
        }
    }

    //Check diagonal right win
    for(let c=0;c<columnCount-3;c++){
        for(let r=0;r<rowCount-3;r++){
            if(board[r][c] == piece && board[r+1][c+1] == piece && board[r+2][c+2] == piece && board[r+3][c+3] == piece){
                winType=3
                winner = board[r][c]
                return true;
            }
        }
    }

    //Check diagonal left win
    for(let c=0;c<columnCount-3;c++){
        for(let r=3;r<rowCount;r++){
            if(board[r][c] == piece && board[r-1][c+1] == piece && board[r-2][c+2] == piece && board[r-3][c+3] == piece){
                winType=4
                winner = board[r][c]
                return true;
            }
        }
    }
    return false
}

function makeBoard(){
    let board = [];
    for(let i=0; i<6;i++){
        board.push([])
        for(let j=0; j<7;j++){
            board[i].push(0)
        }
    }
    return board
}

console.log(makeBoard())
board = makeBoard();

function printBoard(){
    for(let i=5; i>=0;i--){
        console.log(i)
        console.log(board[i].toString())
    }
}

function restartGame(){
    winDiv.hidden = true;
    board = makeBoard();
    playing = true;
    drawGrid();
}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

function getCursorPosition(canvas,e){
    if(playing == false){
        restartGame()
        return
    }
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    function getLocation(co){
        for(let i=7;i>=0;i--){
            if(co>= (canvas.width/7) *i){
                return i
            }
        }
        return 0;
    }

    xSet = getLocation(x);
    console.log(xSet)
    input(xSet)
}

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
        windowSize = window.innerHeight -200
    }else{
        windowSize = window.innerWidth -100
    }
    canvas.width = windowSize;
    canvas.height = windowSize;
    drawGrid()
}

function drawGrid(){
    let boardY = canvas.width/6 *5;
    if(player==1){
        ctx.fillStyle = "#ffec5b"
        ctx.fillRect(0,0,canvas.width,boardY)
    }else{
        ctx.fillStyle = "#ff5050"
        ctx.fillRect(0,0,canvas.width,boardY)
    }
    ctx.fillStyle = "#4551f7"
    ctx.fillRect(0,canvas.width -boardY,canvas.width,boardY)
    for(let row=0;row<rowCount;row++){
        for(let col=0;col<columnCount;col++){
            let size = canvas.width/13;
            let r= rowCount-row-1
            let x=(canvas.width/columnCount *col) -size/2 +size
            let y=((boardY/rowCount *r) -size/2 +size) + canvas.height - boardY
            if(board[row][col] == 0){
                ctx.drawImage(whiteCounter,x,y,size,size)
            }else if(board[row][col] == parseInt(1)){
                ctx.drawImage(yellowCounter,x,y,size,size)
            }else{
                ctx.drawImage(redCounter,x,y,size,size)
            }
        }
    }
}