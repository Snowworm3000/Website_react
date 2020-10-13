var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = canvas.height = 600;
var ctx = canvas.getContext('2d');
var black = new Image;
black.onload = function(){ drawGridC() };
black.src='./Black.svg';

var white = new Image;
white.onload = function(){ drawGridC() };
white.src='./White.svg';

var blackT = new Image;
blackT.onload = function(){ drawGridC() };
blackT.src='./Tick.svg';

var whiteT = new Image;
whiteT.onload = function(){ drawGridC() };
whiteT.src='./TickW.svg';

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})
let boardS = 8

board = 0
function drawGridC(){
    drawGrid(board)
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
            else if(board[i][j] == "3"){
                locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                ctx.drawImage(blackT, locationX-size/2,locationY-size/2,size,size);
            }
            else if(board[i][j] == "4"){
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
    drawGridC()
}