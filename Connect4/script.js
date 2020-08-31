let multiplayerMode = false;


let socket;
const messageContainer = document.getElementById("message-container")
let yourTurn = true;

function multiplayer(){
    
    restartGame()
    yourTurn = false;

    socket = io.connect('https://vast-crag-16763.herokuapp.com/') //Connect to node.js server
    //socket = io("http://localhost:3000")

    message("Waiting for player")

    playerMode = 2
    multiplayerMode = true;

    //const name = prompt("What is your name?")
    socket.emit('new-user', name)
    //appendMessage(name)

    socket.on("roomSet", room =>{
        console.log("room", room)
    })

    socket.on("name", name=>{
        console.log("name",name)
    })

    let playerNo = 0
    socket.on("playerNo", player=>{
        playerNo = player
        console.log(playerNo)
    })

    socket.on("userLeft", val=>{
        message("user disconnected")
    })

    socket.on("startGame", val =>{
        console.log("start game", val)
        yourTurn = true;
        message("Game has started, your turn")
    })

    socket.on("move", move=>{
        if(playing==false){
            restartGame()
        }

        console.log("player move")
        yourTurn = true;
        /*
        if(playerNo == move.player){
            yourTurn = false
        }else{
            yourTurn = true
        }
        */
        console.log(playerNo, player, "tjo")
        let row = getNextOpenRow(board,move.col);
        board = dropPiece(board,row,move.col,player +1);
        drawGrid()
        if(winning_move(board,player +1)){
            showWinner(player);
        }
        console.log(player,move.col)
        player++
        player = player % 2;
        message("Your turn")
    })


    function clearDiv(){
        messageElement = document.getElementById("div")
        messageElement.innerText = ""
    }
    function appendMessage(message) {
        const messageElement = document.getElementById("div")
        messageElement.innerHTML += message + "<br>"
        messageContainer.append(messageElement)
    }

}

function selectRoom(room){
    socket.emit('joinRoom', room);
    console.log("join")
}

const messageBox = document.getElementById("msg")
function message(msg){
    messageBox.hidden = false
    messageBox.innerText = msg
    messageBox.classList.remove("fade");
}







const winDiv = document.getElementById("win");
const buttonPlayers = document.getElementById("players")
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


let playerMode = 1;
buttonPlayers.addEventListener("click",function(){
    playerMode++
    playerMode = playerMode % 2;
    if(playerMode == 1){
        buttonPlayers.value = "Two player";
        restartGame()
    }else{
        buttonPlayers.value = "One player";
        restartGame()
    }
    console.log(playerMode)
})


function input(e){
    console.log("got input")
    if(yourTurn || multiplayerMode == false){
    e = parseInt(e);
    if(7>e && e >=0){
        if(multiplayerMode){
            console.log("move")
            socket.emit("move",e);
            makeMove(e);
        }else{
            makeMove(e);
        }
    }
    yourTurn = false;
}
}

let playing = true;
let winType = 0;
let player = 0;
winDiv.hidden = true;
function makeMove(col){
    if(playing){
        if(is_valid_location(board,col)){
            if(playerMode != 2){
                let row = getNextOpenRow(board,col);
                board = dropPiece(board,row,col,player +1);
                drawGrid()
                if(winning_move(board,player +1)){
                    showWinner(player);
                }
                if(playerMode== 1){
                    player++
                    player = player % 2;
                }else if(playerMode == 0){
                    player = 0;
                    move = compMove(board)

                    let row = getNextOpenRow(board,move);
                    board = dropPiece(board,row,move,2);
                    drawGrid();
                    if(winning_move(board,2)){
                        showWinner(1);
                    }
                }
            } else{
                if(yourTurn == true){
                    let row = getNextOpenRow(board,col);
                    board = dropPiece(board,row,col,player +1);
                    drawGrid()
                    if(winning_move(board,player +1)){
                        showWinner(player);
                    }
                    yourTurn = false;
                    player++
                    player = player % 2;
                    console.log("moved")
                    message("Waiting for player to move")
                } else{
                    console.log("not your turn")
                }
            }
        }else{
            console.log("invalid location")
        }
        //printBoard()
    }
}

function showWinner(player = 0){
    playing = false;
    drawGrid()
    winDiv.hidden = false;
    if(player == 1){
        winDiv.style.background = "#fa5050aa";
        winDiv.innerText = "Red is the winner"
    }else{
        winDiv.style.background = "#f1fa50aa";
        winDiv.innerText = "Yellow is the winner"
    }
}

let rowCount = 6
let columnCount = 7

function convertBoard(board){
    let boardPrint = []
    for(let i =0;i<columnCount*rowCount;i+=columnCount){
        boardPrint.push(board.slice(i,i+columnCount))
    }
    return boardPrint
}

function getPossibleMoves(){
    possibleMoves = []
    for(let i=0;i<columnCount;i++){
        if(is_valid_location(board,i)){
            possibleMoves.push(i)
        }
    }
    return possibleMoves
}

function compMove(board){
    editedBoard = board.flat();

    possibleMoves = getPossibleMoves()

    console.log("I WILL WIN")

    for(i in possibleMoves){
        i = parseInt(i);
        boardCopy = editedBoard.slice();
        if(is_valid_location(board,i)){
            row = getNextOpenRow(convertBoard(boardCopy),i)
            boardCopy = dropPiece(convertBoard(boardCopy),row,i,2)
            console.log(boardCopy)
            console.log(winning_move(boardCopy,2))
            if(winning_move(boardCopy,2)){
                return possibleMoves[i]
            }
        }
    }


    console.log("YOU WIll WIN")
    for(i in possibleMoves){
        i = parseInt(i);
        boardCopy = editedBoard.slice();
        if(is_valid_location(board,i)){
            row = getNextOpenRow(convertBoard(boardCopy),i)
            boardCopy = dropPiece(convertBoard(boardCopy),row,i,1)
            console.log(boardCopy)
            console.log(winning_move(boardCopy,1))
            if(winning_move(boardCopy,1)){
                return possibleMoves[i]
            }
        }
    }

    console.log("RANDOMMMMMM")
    return possibleMoves[Math.round(Math.random()*(possibleMoves.length - 1))]
}

function dropPiece(board,row,col,piece){
    copy = board.slice()
    copy[row][col] = piece;
    return copy
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
        windowSize = window.innerHeight - 20
    }else{
        windowSize = window.innerWidth
    }
    canvas.width = windowSize;
    canvas.height = windowSize/6 *5;
    drawGrid()
}

function drawGrid(){
    let boardY = canvas.width/6 *5;
    if(player==1){
        ctx.fillStyle = "#ffec5b"
        ctx.fillRect(0,0,canvas.width,boardY)
        document.body.style.backgroundColor = "#ffec5b"
    }else{
        ctx.fillStyle = "#ff5050"
        ctx.fillRect(0,0,canvas.width,boardY)
        document.body.style.backgroundColor = "#ff5050"
    }
    ctx.fillStyle = "#4551f7"
    ctx.fillRect(0,0,canvas.width,canvas.height)
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