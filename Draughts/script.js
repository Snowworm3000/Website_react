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


let selected = false
let moveSelected
let selectedPiece

function input(x,y){
    if(board[y][x] == 1 || board[y][x] == 2){ // check if selected is a piece
        selectedPiece = {x:x,y:y}
        selected = true
        console.log("piece selected")
    }else if(selected){ // move selected piece
        movePiece(selectedPiece,{x:x,y:y})
        console.log("piece moved")
    }
    drawGridC()

}


function checkInRange(from,to,range){ // check if two values of x and y are in range of the range value
    let result;
    for(let i=-range;i<=range;i++){
        for(let j=-range;j<=range;j++){
            if((Math.abs(j) == range || Math.abs(i) == range) == false){
                console.log(j,i,range,"break")
                continue
            }
            console.log(i,j)
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
    }else{
        if(locationFrom.y > locationTo.y){ // check if move is forwards
            return true
        }
    }
    return false
}

function isValidMove(locationFrom,locationTo){
    if(rightDirection(locationFrom,locationTo)){
        if(checkInRange(locationFrom,locationTo,1)){ // if location is in range of 1, so a normal non capture jump
            if(board[locationTo.y][locationTo.x] == 0){
                return true
            }
        }else if(checkInRange(locationFrom,locationTo,2)){ // if location is in range of 2, so a capture move
            let middle = [mean(locationFrom.x,locationTo.x),mean(locationFrom.y,locationTo.y)]
            console.log(middle,board[middle[1]][middle[0]])
        }
    }
    
    return false
}


function movePiece(locationFrom,locationTo){
    let validMove = isValidMove(locationFrom,locationTo)
    console.log(isValidMove(locationFrom,locationTo), " valid move")
    if(validMove){
        let counter = board[locationFrom.y][locationFrom.x]
        board[locationFrom.y][locationFrom.x] = 0
        board[locationTo.y][locationTo.x] = counter
    }
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