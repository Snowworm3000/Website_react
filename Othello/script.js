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
    let check=0

    check = y+1
    if(8>check && check >= 0){
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
    }
    
    check = y-1
    if(8>check && check >= 0){
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
    }

    check = x+1
    console.log(check,x,y)
    if(8>check && check >= 0){
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
    }

    check = x-1
    if(8>check && check >= 0){
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
    }


    
    check = [y-1,x-1]
    if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
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
    }
    //console.log("next                                    t")
    
    check = [y+1,x+1]
    if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
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
    }
    
    check = [y-1,x+1]
    if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
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
    }
    
    check = [y+1,x-1]
    if(8>check[0] && check[0] >= 0 && 8>check[1] && check[1] >= 0){
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
function addPiece(x,y){
    console.log(currentPlayer)
    //x= prompt("x")
    //y= prompt("y")

    // x = parseInt(x) - 1
    // y = parseInt(y) - 1

    
    boardCopy = board.slice()

    //boardCopy[y][x] = 1
    let checking = false
    let checkCount = 1

    if(lineAfterMove(x,y, currentPlayer)){
        lineAfterMove(x,y,currentPlayer,true)
        currentPlayer = nextPlayer(currentPlayer,2)
        checking = true
        console.log("possible")
    }else{
        checking = false
        checkCount = 0
        console.log("not possible")
    }
    while(checking){
        console.log("possibleYEEE")
        if(lineAfterMove(x,y, currentPlayer)){
            checkCount++
            lineAfterMove(x,y,currentPlayer,true)
        }else{
            checking = false
            console.log("exit")
        }
    }

    console.log("checkCount",checkCount)
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


printBoard(board)

/*
while(1){
    addPiece()
}
*/



var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = canvas.height = 600;
var ctx = canvas.getContext('2d');
var circle = new Image;
circle.onload = function(){ drawGrid() };
circle.src='./Circle.svg';

var cross = new Image;
cross.onload = function(){ drawGrid() };
cross.src='./Cross.svg';

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})
let boardS = 8

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    //console.log("x: " + x + " y: " + y)
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
    console.log(xSet);
    console.log(ySet)

    addPiece(xSet,ySet)
    drawGrid()
}

function drawGrid(){
    ctx.fillStyle = "#14bdac";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "#6bdbfa";

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
        console.log(size)
        let width = windowSize/boardS //-size
        //let row = [0+ size/2,width + size,width*2 + size*2]
        let row = Array.from(Array(parseInt(gridSize)), (_, i) => i + 1)
        console.log(row)
        for(j in board[i]){
            if(board[i][j] == 1){
                locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                ctx.drawImage(circle, locationX-size/2,locationY-size/2,size,size);
            }
            else if(board[i][j] == 2){
                locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                ctx.drawImage(cross, locationX-size/2,locationY-size/2,size,size);
            }
        }
    }

    ctx.strokeStyle = "#000000";
    let playingGame = true
    if(playingGame == false){
        if(winType == 1){
            console.log("Diagonal right")
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
    drawGrid()
}