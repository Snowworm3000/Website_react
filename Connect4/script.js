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

let winType = 0;
let player = 0
function makeMove(col){
    if(is_valid_location(board,col)){
        let row = getNextOpenRow(board,col);
        dropPiece(board,row,col,player +1);
        if(winning_move(board,player +1)){
            console.log("WINNNER")
            console.log(winType)
        }
    }else{
        console.log("invalid location")
    }
    printBoard()


    player++
    player = player % 2;
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

function winning_move(board,piece){
    //Check horizontal win
    for(let c=0;c<columnCount-3;c++){
        for(let r=0;r<rowCount;r++){
            if(board[r][c] == piece && board[r][c+1] == piece && board[r][c+2] == piece && board[r][c+3] == piece){
                winType=1
                return true;
            }
        }
    }

    //Check vertical win
    for(let c=0;c<columnCount;c++){
        for(let r=0;r<rowCount-3;r++){
            if(board[r][c] == piece && board[r+1][c] == piece && board[r+2][c] == piece && board[r+3][c] == piece){
                winType=2
                return true;
            }
        }
    }

    //Check diagonal right win
    for(let c=0;c<columnCount-3;c++){
        for(let r=0;r<rowCount-3;r++){
            if(board[r][c] == piece && board[r+1][c+1] == piece && board[r+2][c+2] == piece && board[r+3][c+3] == piece){
                winType=3
                return true;
            }
        }
    }

    //Check diagonal left win
    for(let c=0;c<columnCount-3;c++){
        for(let r=3;r<rowCount;r++){
            if(board[r][c] == piece && board[r-1][c+1] == piece && board[r-2][c+2] == piece && board[r-3][c+3] == piece){
                winType=4
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