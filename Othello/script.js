let multiplayerMode = false;


let socket;
const messageContainer = document.getElementById("message-container")
let yourTurn = true;
let username = "";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let waitingForResponse = false;
let canRestart = true;
function multiplayer(){

    restartGame()
    yourTurn = false;

    socket = io.connect('https://othelloethan.herokuapp.com/') //Connect to node.js server
    // socket = io("http://localhost:3000")

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

    socket.on("userLeft", function(val){
        if(waitingForResponse){
            message("Waiting for response")
        } else if(canRestart == false){
            console.log("wont restart boiiiiiiiiiiiiiiiiii")
        }else{
            message("user disconnected")
            //await sleep(1000)

            restartGame()
            yourTurn = false;
            playerMode = 2
            multiplayerMode = true;
            console.log("reconnecting")
            //socket.emit('reconnect', "i")

            socket.emit('restart', "oiwheorihiohr");
        }
    })

    socket.on("startGame", val =>{
        console.log("start game", val)
        yourTurn = true;
        message("Game has started, your turn")
        restartGame();
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
        makeMove(move.x,move.y)

        ammountPossibleMoves = checkPossibleMoves(board,currentPlayer)
        if(ammountPossibleMoves.length == 0){
            gameEnd()
        }

        drawGridC(possibleMoves)
        message("Your turn")
    })

    username = prompt("Player name \n(leave blank if you do not want to play with friends)")
    if(username != ""){
        socket.emit('name',username)
    }

    socket.on('invalidName', ()=>{
        console.log("invalid name")
        username = prompt("Player name \n(leave blank if you do not want to play with friends)")
        socket.emit('name',username)

    })

    socket.on('promptJoinRoom', roomName=>{
        console.log("recieved request")
        let ask = prompt("A user would like to play against you. Join? y/n")
        if(ask == "y"){
            socket.emit('joinRoom', roomName);
            console.log(roomName,"join")
            canRestart = false;
        }
    })

    socket.on('getOnlinePlayers', playersArray =>{
        printPlayers(playersArray);
    })

    function printPlayers(players){
        clearDiv();
        console.log(players)
        players.splice(players.indexOf(username),1);
        appendMessage(players);
    }

}
function refreshPlayers(){
    socket.emit('refreshPlayers')
}

function clearDiv(){
    messageElement = document.getElementById("div")
    messageElement.innerText = ""
}
function appendMessage(message) {
    const messageElement = document.getElementById("div")
    if(typeof(message) == "object"){
        for(i in message){
            messageElement.innerHTML += "<div class='playerElement'>" + message[i] + "<input type='button' value='join game' onclick='joinGame("+'"'+message[i]+'"'+")'></div>" + "<br>"
        }
    } else{
        messageElement.innerHTML += message + "<br>"
    }
    messageContainer.append(messageElement)
}

function joinGame(name){
    waitingForResponse = true;
    console.log(name)
    socket.emit('promptPlayer', name)
    socket.emit('joinRoom', name)
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
let playing = true;
let playerMode = 1;



























let board = []
createBoard()
function createBoard(){ //Create array with 8 subarrays containing all 0s representing the board
    board = []
    for(let i = 0; i< 8; i++){
        board.push([])
        for(let j = 0; j< 8; j++){
            board[i].push(0)
        }
    }
    board[3][3] = 1
    board[3][4] = 2
    board[4][3] = 2
    board[4][4] = 1
    //board[5][5] = 1
}

function printBoard(board){ //Prints the board to console for debuging
    for(i of board){
        console.log(i)
    }
}

function restartGame(){
    currentPlayer = 1
    createBoard()
    checkPossibleMoves(board,currentPlayer)
    drawGridC(possibleMoves)
}

const buttonPlayers = document.getElementById("buttonMode");

let gameMode = 1;
buttonPlayers.addEventListener("click",function(){
    gameMode++
    gameMode = gameMode % 2;
    if(gameMode == 1){
        buttonPlayers.value = "Two player";
        restartGame()
    }else{
        buttonPlayers.value = "One player";
        restartGame()
    }
})

let possibleMoves;
function checkPossibleMoves(board,currentPlayer,comp){
    possibleMoves = JSON.parse(JSON.stringify(board))
    let countPossible = 0
    let computerMoves = []
    for(let y=0; y<8;y++){
        for(let x=0;x<8; x++){
            boardPiece = board[y][x]
            if(boardPiece != currentPlayer && boardPiece == 1 || boardPiece==2){
                for(let difY = -1; difY<=1;difY++){
                    for(let difX = -1; difX<=1;difX++){
                        check = [difX+x,difY+y]
                        if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
                        if(board[difY + y][difX + x] == 0){
                            //console.log("Possible move",difX + x, difY+y)
                            //console.log("my", x,y)
                            //boardCopy[difY+y][difX+x] = "p" + currentPlayer
                            // console.log("shenennnnnnnnnnnn",lineAfterMove(difX+x,difY+y, currentPlayer))
                            if(lineAfterMove(difX+x,difY+y, currentPlayer)){
                                /*
                                if(comp){
                                    computerMoves.push([difX+x,difY+y])
                                }else{
                                    possibleMoves[difY+y][difX+x] = "p"+currentPlayer
                                }
                                */
                               computerMoves.push([difX+x,difY+y])
                               possibleMoves[difY+y][difX+x] = "p"+currentPlayer
                            }
                        }
                        }
                    }
                }
            }
        }
    }
    //printBoard(boardCopy)
    //console.log("break")
    //printBoard(board)
    /*
    if(comp){
        return computerMoves;
    }
    return false
    */
   return computerMoves;
    // return countPossible > 0
}

/*
function isPossibleMove(x,y,players){
    boardPiece = board[y][x]
    if(boardPiece != players && boardPiece == 1 || boardPiece==2){
        console.log("opposite colour", boardPiece)
        for(let difY = -1; difY<=1;difY++){
            for(let difX = -1; difX<=1;difX++){
                if(board[difY + y][difX + x] == 0){
                    console.log(difX,difY)
                    if(lineAfterMove(difX+x,difY+y, players)){
                        console.log("POSSSIBLE")
                        return true
                    }
                }
            }
        }
    }
    return false
}

*/

function lineAfterMove(x,y,playerColour,set){
    
    let oppositeColour = [2,1][playerColour-1]
    let check=0

    check = y+1
    if(8>check && check >= 0){
    if(board[y+1][x] == oppositeColour){
        for(let row = y; row<8;row++){ //Vertical down
            if(board[row][x] == 0 && row!=y){
                break
            }
            if(board[row][x] == playerColour && row > y+1){
                //board[y][x] = "p" + playerColour
                return 1
            }else if(set == 1){
                board[row][x] = playerColour
            }
            // console.log("done", row,x,y,8-y)
        }
    }
    }
    
    check = y-1
    if(8>check && check >= 0){
    if(board[y-1][x] == oppositeColour){
        for(let row = y; row>=0;row--){ //Vertical up
            if(board[row][x] == 0 && row!=y){
                break
            }
            if(board[row][x] == playerColour && row < y-1){
                //board[y][x] = "p" + playerColour
                return 2
            }else if(set == 2){
                board[row][x] = playerColour
            }
        }
    }
    }

    check = x+1
    if(8>check && check >= 0){
    if(board[y][x+1] == oppositeColour){
        for(let col = x; col<8;col++){ //Horizontal right
            if(board[y][col] == 0 && col!=x){
                break
            }
            if(board[y][col] == playerColour && col > x+1){
                //board[y][x] = "p" + playerColour
                return 3
            }else if(set == 3){
                board[y][col] = playerColour
            }
        }
    }
    }

    check = x-1
    if(8>check && check >= 0){
    if(board[y][x-1] == oppositeColour){
        for(let col = x; col>=0;col--){ //Horizontal left
            if(board[y][col] == 0 && col!=x){
                break
            }
            if(board[y][col] == playerColour && col < x-1){
                //board[y][x] = "p" + playerColour
                return 4
            }else if(set == 4){
                board[y][col] = playerColour
            }
        }
    }
    }


    
    check = [y-1,x-1]
    if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
    if(board[y-1][x-1] == oppositeColour){
        let row = y
        for(let col = x; col>=0; col--){ //Diagonal right before
            if(row>=0){
                if(board[row][col] == 0 && col!=x){
                    break
                }

                if(board[row][col] == playerColour && row<y-1){
                    //board[y][x] = "p" + playerColour
                    return 5
                }else if(set == 5){
                    board[row][col] = playerColour
                }
                row--
            }
        }
    }
    }
    //console.log("next                                    t")
    
    check = [y+1,x+1]
    if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
    if(board[y+1][x+1] == oppositeColour){
        row = y
        for(let col = x; col<8; col++){ //Diagonal right after
            if(row<8){
                if(board[row][col] == 0 && col!=x){
                    break
                }

                if(board[row][col] == playerColour && row>y+1){
                    //board[y][x] = "p" + playerColour
                    return 6
                }else if(set == 6){
                    board[row][col] = playerColour
                }
                row++
            }
        }
    }
    }
    
    check = [y-1,x+1]
    if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
    if(board[y-1][x+1] == oppositeColour){
        row = y
        for(let col = x; col<8; col++){ //Diagonal left before
            if(row>=0){
                if(board[row][col] == 0 && col!=x){
                    break
                }

                if(board[row][col] == playerColour && row<y-1){
                    //board[y][x] = "p" + playerColour
                    return 7
                }else if(set == 7){
                        board[row][col] = playerColour
                    }
                row--
            }
        }
    }
    }
    
    check = [y+1,x-1]
    if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
   if(board[y+1][x-1] == oppositeColour){
        row = y
        for(let col = x; col>=0; col--){ //Diagonal left after
            if(row<8){
                if(board[row][col] == 0 && col!=x){
                    break
                }

                if(board[row][col] == playerColour && row>y+1){
                    //board[y][x] = "p" + playerColour
                    return 8
                }else if(set == 8){
                    board[row][col] = playerColour
                }
                row++
            }
        }
    }
    }
    return false
}

function nextPlayer(currentPlayer,ammount){ //Alternates between players
    if(currentPlayer >= ammount){
        currentPlayer = 1
    }else{
        currentPlayer += 1
    }
    return currentPlayer
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let currentPlayer = 1
let ammountPossibleMoves = []

let playerIndicator = document.getElementById("player");
checkPossibleMoves(board,currentPlayer)
function addPiece(x,y){
    if(playing){
        if(playerMode != 2){
    //x= prompt("x")
    //y= prompt("y")

    // x = parseInt(x) - 1
    // y = parseInt(y) - 1

    if(computerMoving == false){
    
    boardCopy = board.slice()

    if(board[y][x] != 0){
        console.log("returned")
        return
    }

    // console.log("actually didnt")

    //boardCopy[y][x] = 1



    let possible = makeMove(x,y)

    console.log("possible",possible)

    // console.log("checkCount",checkCount)

    /*
    if(checkPossibleMoves(board,currentPlayer,true).length == 0){
        gameEnd()
    }
    */

    if(possible){
        ammountPossibleMoves = checkPossibleMoves(board,currentPlayer)
        if(ammountPossibleMoves.length == 0){
            gameEnd()
        }

        drawGridC(possibleMoves)

        if(gameMode == 0){
            console.log("comp move")
            compMove()
            // checkPossibleMoves(board,currentPlayer)
        }
    }
    /*
    if(lineAfterMove(x,y, currentPlayer)){
        console.log("NOT")
        lineAfterMove(x,y,currentPlayer,true)
        board[y][x] = currentPlayer
        console.log("possible :)")
        printBoard(board)
        currentPlayer = nextPlayer(currentPlayer,2)
        
    }else{
        console.log("not possible")
        printBoard(board)
    }
    */

    }
    } else{
        if(yourTurn == true){
            boardCopy = board.slice()
            if(board[y][x] != 0){
                console.log("returned")
                return
            }
            let possible = makeMove(x,y)
            console.log("possible",possible)
            if(possible){
                if(multiplayerMode){
                    socket.emit('move',[xSet,ySet]);
                }
                ammountPossibleMoves = checkPossibleMoves(board,currentPlayer)
                if(ammountPossibleMoves.length == 0){
                    gameEnd()
                }
        
                drawGrid(board)
                yourTurn = false;
                console.log("moved")
                message("Waiting for player to move")
            }
        }else{
            console.log("not your turn")
        }
    }


    }
    showPlayer()
}

function showPlayer(){
    if(currentPlayer == 1){
        playerIndicator.innerHTML = "Black"
    }else{
        playerIndicator.innerHTML = "White"
    }
}
showPlayer()

function drawGridC(){ //Draw grid depending on user option
    if(showPossibleMoves){
        drawGrid(possibleMoves)
    }else{
        drawGrid(board)
    }
}

let computerMoving = false
function makeMove(x,y){
    let checking = false
    let lastLine = 0
    let possible = true;
    let checkCount = 1

    lastLine = lineAfterMove(x,y, currentPlayer)
    if(lastLine){
        lineAfterMove(x,y,currentPlayer,lastLine)
        checking = true
        console.log("possible")
    }else{
        checking = false
        checkCount = 0
        console.log("not possible")
        possible = false
    }
    while(checking){
        lastLine = lineAfterMove(x,y, currentPlayer)
        if(lastLine){
            checkCount++
            lineAfterMove(x,y,currentPlayer,lastLine)
        }else{
            checking = false
            console.log("exit")
        }
    }
    if(possible){
        currentPlayer = nextPlayer(currentPlayer,2)
    }
    return possible
}

function random(max){
    return Math.random()*max
}

function gameEnd(){
    let count = {white:0,black:0}
    for(let row = 0; row<8;row++){
        for(let col=0; col<8;col++){
            if(board[row][col] == 1){
                count.black++
            }else if(board[row][col] == 2){
                count.white++
            }
        }
    }
    return count
}

let compSlider = document.getElementById("compDelay")
let sliderOutput = document.getElementById("sliderOutput")
let compDelay = compSlider.value/0.025
sliderOutput.innerHTML = compDelay * 0.001

compSlider.oninput = function(){
    compDelay = this.value /0.025
    sliderOutput.innerHTML = compDelay * 0.001
}

async function compMove(){
    computerMoving = true;
    await sleep(compDelay)
    let possibleCompMoves = ammountPossibleMoves
    console.log(possibleCompMoves)
    if(possibleCompMoves.length == 0){
        console.log("No moves available")
        gameEnd()
    }else{
        let choice = Math.round(random(possibleCompMoves.length-1))
        // for(i,index in possibleCompMoves)
        possibleCompMoves.forEach((i,index)=>{
            i=i.toString()
            if(i == "0,0"||i=="0,7"||i == "7,0"||i=="7,7"){
                choice = index
                console.log("chosen")
            }else{
                console.log("no",i,index,i==[0,0])
            }
        })
        console.log(choice)
        makeMove(possibleCompMoves[choice][0],possibleCompMoves[choice][1])
    
        // currentPlayer = nextPlayer(currentPlayer,2)
        ammountPossibleMoves = checkPossibleMoves(board,currentPlayer)
        drawGridC(possibleMoves)
    }
    computerMoving = false
    showPlayer()
}

let possibleMovesCheck = document.getElementById("possibleMoves");
let showPossibleMoves = false;
possibleMovesCheck.oninput = function(){
    showPossibleMoves = this.checked
    console.log(showPossibleMoves)
    drawGridC()
}

/*
while(1){
    addPiece()
}
*/



var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = canvas.height = 600;
var ctx = canvas.getContext('2d');
var black = new Image;
black.onload = function(){ drawGridC(possibleMoves) };
black.src='./Black.svg';

var white = new Image;
white.onload = function(){ drawGridC(possibleMoves) };
white.src='./White.svg';

var blackT = new Image;
blackT.onload = function(){ drawGridC(possibleMoves) };
blackT.src='./Tick.svg';

var whiteT = new Image;
whiteT.onload = function(){ drawGridC(possibleMoves) };
whiteT.src='./TickW.svg';

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})
let boardS = 8

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    let width = windowSize /boardS

    function getLocation(co){
        for(let i=boardS;i>=0;i--){
            if(co>= width *i){
                return i
            }
        }
        return 0;
    }

    xSet = getLocation(x);
    ySet = getLocation(y);
    addPiece(xSet,ySet)
}

function drawGrid(board){
    ctx.fillStyle = "#008B61";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "#000";

    //let lineWidth = 10
    let gridSize = 8
    let lineWidth = (50/gridSize)*canvas.width/1000

    for(let i = 1; i<gridSize;i++){
        ctx.beginPath();
        ctx.moveTo(windowSize /gridSize *i,0);
        ctx.lineTo(windowSize /gridSize *i,windowSize);
        ctx.lineWidth = lineWidth
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,windowSize /gridSize *i);
        ctx.lineTo(windowSize,windowSize /gridSize *i);
        ctx.lineWidth = lineWidth
        ctx.stroke();
    }

    //ctx.drawImage(cross,300,0);
    //ctx.drawImage(circle,300,0);
    for(i in board){
        let size = canvas.width / (boardS +2)
        let width = windowSize/boardS //-size
        //let row = [0+ size/2,width + size,width*2 + size*2]
        let row = Array.from(Array(parseInt(gridSize)), (_, i) => i + 1)
        for(j in board[i]){
            if(board[i][j] == 1){
                locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                ctx.drawImage(black, locationX-size/2,locationY-size/2,size,size);
            }
            else if(board[i][j] == 2){
                locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                ctx.drawImage(white, locationX-size/2,locationY-size/2,size,size);
            }
            else if(board[i][j] == "p1"){
                locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                ctx.drawImage(blackT, locationX-size/2,locationY-size/2,size,size);
            }
            else if(board[i][j] == "p2"){
                locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                ctx.drawImage(whiteT, locationX-size/2,locationY-size/2,size,size);
            }
        }
    }

    ctx.strokeStyle = "#000000";
    let playingGame = true
    if(playingGame == false){
        if(winType == 1){
            // console.log("Diagonal right")
            let i=1;
            animate();
            function animate(){
                if(i< canvas.width*0.5){ requestAnimationFrame(animate)}
                    ctx.beginPath();
                    ctx.moveTo(0,0);
                    ctx.lineTo(i,i);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(canvas.width, canvas.height);
                    ctx.lineTo(canvas.width- i, canvas.height-i);
                    ctx.stroke();
                    i += 20;
            }

        } else if(winType==2){

            let i=1;
            animate();
            function animate(){
                if(i< canvas.width*0.5){ requestAnimationFrame(animate)}
                    ctx.beginPath();
                    ctx.moveTo(0,canvas.height);
                    ctx.lineTo(i,canvas.width -i);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(canvas.width,0);
                    ctx.lineTo(canvas.width - i,i);
                    ctx.stroke();
                    i += 20;
            }
            
        } else if(boardS*2 >winType){
            console.log("Horizontal")
            let direction = canvas.height/(boardS*2)*((winType*2)-5);

            let i=1;
            animate();
            function animate(){
                if(i< canvas.width*0.5){ requestAnimationFrame(animate)}
                    ctx.beginPath();
                    ctx.moveTo(0,direction);
                    ctx.lineTo(i, direction);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(canvas.width,direction);
                    ctx.lineTo(canvas.width-i,direction);
                    ctx.stroke();
                    i += 20;
            }

        } else if(boardS*3>winType){
            console.log("Vertical")
            let direction = canvas.height/(boardS *2)*((((winType - (3+boardS)) - boardS+3)*2)+1);

            let i=1;
            animate();
            function animate(){
                if(i< canvas.width*0.5){ requestAnimationFrame(animate)}
                    ctx.beginPath();
                    ctx.moveTo(direction,0);
                    ctx.lineTo(direction,i);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(direction,canvas.width);
                    ctx.lineTo(direction,canvas.width-i);
                    ctx.stroke();
                    i += 20;
            }
        }
    }
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
    drawGridC(possibleMoves)
}