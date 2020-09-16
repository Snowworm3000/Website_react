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
    console.log(board)
    console.log("END")
}

function printBoard(board){ //Prints the board to console for debuging
    for(i of board){
        console.log(i)
    }
}

function checkPossibleMoves(board){
    let countPossible = 0
    for(let players = 1; players<= 1; players++){
        //console.log(players)
        let boardCopy = board.slice()
        for(let y=0; y<8;y++){
            for(let x=0;x<8; x++){
                boardPiece = board[y][x]
                if(boardPiece != players && boardPiece == 1 || boardPiece==2){
                    console.log("opposite colour", boardPiece)
                    for(let difY = -1; difY<=1;difY++){
                        for(let difX = -1; difX<=1;difX++){
                            if(board[difY + y][difX + x] == 0){
                                console.log(difX,difY)
                                //console.log("Possible move",difX + x, difY+y)
                                //console.log("my", x,y)
                                //boardCopy[difY+y][difX+x] = "p" + players
                                console.log("shenennnnnnnnnnnn",lineAfterMove(difX+x,difY+y, players))
                                if(lineAfterMove(difX+x,difY+y, players)){
                                    countPossible++
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
    }
    return countPossible > 0
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

    if(board[y+1][x] == oppositeColour){
        for(let row = y; row<8-y;row++){ //Vertical down
            if(board[row][x] == 0 && row!=y){
                break
            }
            if(board[row][x] == playerColour && row > y+1){
                //board[y][x] = "p" + playerColour
                return 1
            }else if(set){
                board[row][x] = playerColour
            }
        }
    }
    
    
    if(board[y-1][x] == oppositeColour){
        for(let row = y; row>0;row--){ //Vertical up
            if(board[row][x] == 0 && row!=y){
                break
            }
            if(board[row][x] == playerColour && row < y-1){
                //board[y][x] = "p" + playerColour
                return 2
            }else if(set){
                board[row][x] = playerColour
            }
        }
    }

    if(board[y][x+1] == oppositeColour){
        for(let col = x; col<8-x;col++){ //Horizontal right
            if(board[y][col] == 0 && col!=x){
                break
            }
            if(board[y][col] == playerColour && col > x+1){
                //board[y][x] = "p" + playerColour
                return 3
            }else if(set){
                board[y][col] = playerColour
            }
        }
    }

    if(board[y][x-1] == oppositeColour){
        for(let col = x; col>0;col--){ //Horizontal left
            if(board[y][col] == 0 && col!=x){
                break
            }
            if(board[y][col] == playerColour && col < x-1){
                //board[y][x] = "p" + playerColour
                return 4
            }else if(set){
                board[y][col] = playerColour
            }
        }
    }


    

    if(board[y-1][x-1] == oppositeColour){
        let row = y
        for(let col = x; col>0; col--){ //Diagonal right before
            if(row>0){
                if(board[row][col] == 0 && col!=x){
                    break
                }

                if(board[row][col] == playerColour && row<y-1){
                    //board[y][x] = "p" + playerColour
                    return 5
                }else if(set){
                    board[row][col] = playerColour
                }
                row--
            }
        }
    }
    //console.log("next                                    t")
    
    if(board[y+1][x+1] == oppositeColour){
        row = y
        for(let col = x; col<8-x; col++){ //Diagonal right after
            if(row<8-y){
                if(board[row][col] == 0 && col!=x){
                    break
                }

                if(board[row][col] == playerColour && row>y+1){
                    //board[y][x] = "p" + playerColour
                    return 6
                }else if(set){
                    board[row][col] = playerColour
                }
                row++
            }
        }
    }
    
    if(board[y-1][x+1] == oppositeColour){
        row = y
        for(let col = x; col<8-x; col++){ //Diagonal left before
            if(row>0){
                if(board[row][col] == 0 && col!=x){
                    break
                }

                if(board[row][col] == playerColour && row<y-1){
                    //board[y][x] = "p" + playerColour
                    return 7
                }else if(set){
                        board[row][col] = playerColour
                    }
                row--
            }
        }
    }
    
   if(board[y+1][x-1] == oppositeColour){
        row = y
        for(let col = x; col>0; col--){ //Diagonal left after
            if(row<8-y){
                if(board[row][col] == 0 && col!=x){
                    break
                }

                if(board[row][col] == playerColour && row>y+1){
                    console.log("NOOOOOOOOO",col,row,x,y)
                    //board[y][x] = "p" + playerColour
                    return 8
                }else if(set){
                    board[row][col] = playerColour
                }
                row++
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

let currentPlayer = 1
function addPiece(){
    currentPlayer = nextPlayer(currentPlayer,2)
    console.log(currentPlayer)
    x= prompt("x")
    y= prompt("y")

    x = parseInt(x) - 1
    y = parseInt(y) - 1

    
    boardCopy = board.slice()

    //boardCopy[y][x] = 1
    console.log("nleeeeeeeeee",lineAfterMove(x,y,1))

    if(lineAfterMove(x,y, 1)){
        console.log("NOT")
        lineAfterMove(x,y,1,true)
        board[y][x] = 1
        console.log("possible :)")
        printBoard(board)
        
    }else{
        console.log("not possible")
        printBoard(board)
    }
}


printBoard(board)
while(1){
    addPiece()
}
