let playerIndicator = document.getElementById("player");
const buttonPlayers = document.getElementById("buttonMode");
let computerMoving = false

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

function restartGame(){
    currentPlayer = 2
    createBoard()
    drawGridC()
}

let board = []
createBoard()
function createBoard(){ //Create array with 8 subarrays containing all 0s representing the board
    board = []
    for(let i = 0; i< 8; i++){
        board.push([])
        for(let j = 0; j< 8; j++){
            if(j %2 - (i%2) == 0 && (i<3 || i>4)){
                if(i<3){
                    board[i].push(1)
                }else{
                    board[i].push(2)
                }
            }else{
                board[i].push(0)
            }
        }
    }
}

printBoard(board)
function printBoard(board){ //Prints the board to console for debuging
    for(i of board){
        console.log(i)
    }
}

function getPossiblePieces(currentPiece){
    if(currentPlayer == 1){
        return [1,3]
    }else{
        return [2,4]
    }
}


let selected = false
let moveSelected
let selectedPiece

let currentPlayer = 2
function input(x,y){
    let selectedColour = board[y][x]
    let currentPossiblePiece = getPossiblePieces(currentPlayer)
    if(currentPossiblePiece.includes(selectedColour) || selectedColour == 0){
        if(board[y][x] != 0){ // check if selected is a piece
            selectedPiece = {x:x,y:y}
            selected = true
            console.log("piece selected")
        }else if(selected){ // move selected piece
            movePiece(selectedPiece,{x:x,y:y})
            selected = false
            console.log("piece moved",board[y][x])

            if(gameMode == 0 && capture == false){
                console.log("comp move")
                compMove()
            }
        }
        drawGridC()
    }
    
}

let compSlider = document.getElementById("compDelay")
let sliderOutput = document.getElementById("sliderOutput")
let compDelay = compSlider.value/0.025
sliderOutput.innerHTML = compDelay * 0.001

compSlider.oninput = function(){
    compDelay = this.value /0.025
    sliderOutput.innerHTML = compDelay * 0.001
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function compMove(){
    computerMoving = true;
    await sleep(compDelay)
    let possibleCompMoves = checkAllPossibleMoves();
    if(possibleCompMoves.length == 0){
        console.log("No moves available")
    }else{
        let choice;
        let moveType
        console.log(possibleCompMoves.capture.length , possibleCompMoves.move.length , '☺️')
        console.log(possibleCompMoves)
        if(possibleCompMoves.capture.length != 0){
            choice = Math.round(random(possibleCompMoves.capture.length -1))
            console.log("capture")
            moveType = 'capture'
        }else{
            choice = Math.round(random(possibleCompMoves.move.length-1))
            console.log("normal move")
            moveType = "move"
        }

        moveChoice = possibleCompMoves[moveType][choice]
        console.log(moveChoice)
        movePiece(moveChoice[0],moveChoice[1])
    
        drawGridC()
    }
}

function random(max){
    return Math.random()*max
}


function checkInRange(from,to,range){ // check if two values of x and y are in range of the range value
    let result;
    for(let i=-range;i<=range;i++){
        for(let j=-range;j<=range;j++){
            if((Math.abs(j) == range || Math.abs(i) == range) == false){
                continue
            }
            result = from.x + i == to.x && from.y + j == to.y
            if(result){
                return true
            }
        }
    }
    return false
}

function mean(val1,val2){ // return the mean of two values
    return (val1 + val2) / 2;
} 

function rightDirection(locationFrom,locationTo){
    let player = board[locationFrom.y][locationFrom.x]; // get the piece number
    if(player == 1){
        if(locationFrom.y < locationTo.y){ // check if move is forwards
            return true
        }
    }else if(player == 2){
        if(locationFrom.y > locationTo.y){ // check if move is forwards
            return true
        }
    }else{
        return true
    }
    return false
}

function isOppositePiece(currentPiece,oppositePiece){
    let piece;
    if(currentPiece == 1 || currentPiece == 3){
        piece = [1,3]
    }else{
        piece = [2,4]
    }
    return piece.includes(oppositePiece) == false
}

let middle
function isValidMove(locationFrom,locationTo, captured = false, lastLocation){
    if(captured){ // when the move is after a capture and they are not moving the same piece, it is not a capture.
        if((lastLocation.x != locationFrom.x) && (lastLocation.y != locationFrom.y)){
            return false
        }
    }
    if(rightDirection(locationFrom,locationTo)){ // check if the piece is going in the correct direction
        if(checkInRange(locationFrom,locationTo,1)){ // if location is in range of 1, so a normal non capture jump
            if(board[locationTo.y][locationTo.x] == 0){
                if(locationFrom.x != locationTo.x){
                    if(captured){
                        return false
                    }else{
                        return 1
                    }
                }
            }
        }else if(checkInRange(locationFrom,locationTo,2)){ // if location is in range of 2, so a capture move
            if(board[locationTo.y][locationTo.x] == 0){
                if(Math.abs(locationFrom.x-locationTo.x) == 2 && Math.abs(locationFrom.y-locationTo.y) == 2){
                    middle = [mean(locationFrom.x,locationTo.x),mean(locationFrom.y,locationTo.y)]
                    let middlePiece = board[middle[1]][middle[0]]
                    let currentPiece = board[locationFrom.y][locationFrom.x]
                    if(isOppositePiece(currentPiece,middlePiece)&&middlePiece!=0){ // check if the middle piece is the opposite piece to the current piece
                        // board[middle[1]][middle[0]] = 0; // capture piece
                        return 2
                    }
                }
            }
        }
    }
    
    return false
}

function capturePiece(middle){
    board[middle[1]][middle[0]] = 0; // capture piece
}

function checkWin(board){
    let pieceCounter = [0,0,0,0]
    for(let y = 0;y<8;y++){
        for(let piece = 1;piece<=4;piece++){
            if(board[y].includes(piece)){
                pieceCounter[piece-1]++
            }
            console.log(y,piece,board[y].includes(piece))
        }
    }
    if(pieceCounter[0]+pieceCounter[2]==0){
        console.log("2 win")
    }else if(pieceCounter[1]+pieceCounter[3]==0){
        console.log("1 win")
    }
}

function checkAllPossibleMoves(){
    let b=0
    let possibleMoves = {capture:[], move:[]}
    for(let a=0; a<boardS; a+=2){
        for(let x=0; x<boardS; x++){
            let y = a + (x%2)
            // if(board[x][y] != 0 && board[x][y] == (currentPlayer%2)+1){
            if(board[y][x] != 0 && board[y][x] == currentPlayer){
                console.log(currentPlayer, "current player")
                console.log(x,y,board[y][x])
                let move = checkForMove({x:x,y:y},1,true)
                let capture = checkForMove({x:x,y:y},2,true)
                if(move != false){
                    for(i of move){
                        possibleMoves.move.push([{x:x,y:y},i])
                    }
                }
                if(capture != false){
                    console.log('capture 😒')
                    for(i of capture){
                        possibleMoves.capture.push([{x:x,y:y},i])
                    }
                }
            }


            b++
        }
    }
    console.log(b,"b")
    return possibleMoves
}

function checkForMove(locationFrom, distance,comp = false){ //check for capture or move
    let possibleMoves = []
    for(let i = -distance; i<=distance; i+= distance*2){
            for(let j = -distance; j<=distance; j+= distance*2){
            let diffX = i 
            let locationX = locationFrom.x + i
            let locationY = locationFrom.y + j
            if((0 <= locationX && locationX < 8) && (0 <= locationY && locationY < 8)){ // check if location is on the board
                let isValid = isValidMove(locationFrom, {x:locationX, y:locationY})
                if(isValid){
                    if(comp){
                        possibleMoves.push({x:locationX,y:locationY})
                    }else{
                        return true
                    }
                }

            }
        }
    }
    if(comp && possibleMoves != []){
        return possibleMoves
    }else{
        return false
    }
}

let capture = false
let captureLocationFrom
function movePiece(locationFrom,locationTo){
    let validMove = isValidMove(locationFrom,locationTo,capture,captureLocationFrom)
    if(validMove){
        let counter = board[locationFrom.y][locationFrom.x]
        board[locationFrom.y][locationFrom.x] = 0
        if((counter == 1 && locationTo.y == 7) || (counter == 2 && locationTo.y == 0)){
            board[locationTo.y][locationTo.x] = [3,4][counter-1]
        }else{
            board[locationTo.y][locationTo.x] = counter
        }
        if(validMove == 1){ // change player if the move was not a capture
            // currentPlayer = (currentPlayer%2)+1
            capture = false
        }else{ //capture
            capturePiece(middle)
            capture = true
        }
        // } else{ // capture
        //     console.log("👊👊👊 capture")
        //     capture = true
        //     captureLocationFrom = locationTo
        // }

        if(checkForMove(locationTo,2) && capture){ //if there is another possible capture move and the player has already captured it is still their turn
            console.log("👊👊👊 capture")
            capture = true
            captureLocationFrom = locationTo
        }else{
            console.log("🥶 not capture")
            currentPlayer = (currentPlayer%2)+1
            capture = false
        }
    }
    showPlayer()
}



function getCursorPosition(canvas, event) {
    /*
    if(playing == false){
        restartGame()
        return
    }
    */
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
    input(xSet,ySet)
}

function showPlayer(){
    if(currentPlayer == 1){
        playerIndicator.innerHTML = "black"
    }else{
        playerIndicator.innerHTML = "red"
    }
}
showPlayer()