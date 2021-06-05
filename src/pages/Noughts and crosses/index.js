import React, {useState, useRef} from "react"
import TitleBar from "../titleBar"
import * as css from "../../components/NoughtsAndCrosses.module.css"
import Cross from "../../assets/NoughtsAndCrosses/Cross.svg"
import Circle from "../../assets/NoughtsAndCrosses/Circle.svg"
import Refresh from "../../assets/NoughtsAndCrosses/Refresh.svg"
// import * as Game from "../../scripts/NoughtsAndCrosses.js"
import Canvas from "./canvas.js"

function NandC(){

    // console.log(Game.canvas)
    let button1 = false
    let button2 = true
    let playingGame = true
    let circle = new Image
    let cross = new Image

    let canvas
    const [winInfo, setWinInfo] = useState("")
    // const canvasRef = useRef(null)

    const draw = (ctx, canvasRef) => {
        var circle = new Image;
        circle.onload = function(){ drawGrid(ctx) };
        circle.src='./Circle.svg';

        var cross = new Image;
        cross.onload = function(){ drawGrid(ctx) };
        cross.src='./Cross.svg';

        canvas = canvasRef
      }


    function drawGrid(ctx){
        // changeIcon();
        ctx.fillStyle = "#14bdac";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.strokeStyle = "#6bdbfa";

        //let lineWidth = 10
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

        //console.log(boardDisplay)
        //ctx.drawImage(cross,300,0);
        //ctx.drawImage(circle,300,0);
        for(let i in boardDisplay){
            let size = canvas.width / (boardS +2)
            console.log(size)
            let width = windowSize/boardS //-size
            //let row = [0+ size/2,width + size,width*2 + size*2]
            let row = Array.from(Array(parseInt(gridSize)), (_, i) => i + 1)
            console.log(row)
            for(let j in boardDisplay[i]){
                //console.log(boardDisplay[i][j])
                if(boardDisplay[i][j] == "O"){
                    let locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                    let locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                    ctx.drawImage(circle, locationX-size/2,locationY-size/2,size,size);
                }
                else if(boardDisplay[i][j] == "X"){
                    let locationX = windowSize /boardS * row[j] - windowSize/boardS/2
                    let locationY = windowSize /boardS * row[i] - windowSize/boardS/2
                    ctx.drawImage(cross, locationX-size/2,locationY-size/2,size,size);
                }
            }
        }

        ctx.strokeStyle = "#000000";
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

    const cursorPosition = (canvas, event) => {
        if(playingGame == false || getPossibleMoves().length == 0){
            resetBoard()
            changeIcon()
            return
        }
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        //console.log("x: " + x + " y: " + y)
        let width = windowSize /boardS
    
        
    
        let xSet = getLocation(x);
        let ySet = getLocation(y);
        console.log(xSet);
        console.log(ySet)
    
    
    
        if(boardDisplay[ySet][xSet] == 0 && playingGame){ //Check if space isn't taken
            boardDisplay[ySet][xSet] = players[currentPlayer -1]
            board = boardDisplay.flat();
            drawGrid()
            currentPlayer = nextPlayer(currentPlayer,ammount)
            changeIcon()
            if(win(boardDisplay)){
                if(winName == "X"){
                    scoreX++;
                }else if(winName == "O"){
                    scoreO++;
                }
                setScore()
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
                    if(winName == "X"){
                        scoreX++;
                    }else if(winName == "O"){
                        scoreO++;
                    }
                    setScore()
                    winInfo.innerText = winName+" has won the game"
                    playingGame = false
                    drawGrid();
                }
            }
        }
    }

    // Game.initialize();
    // Game.changeIcon()
    // Game.drawGrid()
    // Game.gameLogic()

    // canvasRef.addEventListener('mousedown', function(e) {
    //     getCursorPosition(canvas, e)
    // })

    return (
        <>
        <TitleBar ></TitleBar>


        <h1 class={css.winInfo}>{winInfo}</h1>
    <div id="mainGame" class={`${css.mainGame} ${css.centerFlex}`}>
        <div className={css.mainGame}>
            <div class={css.spaceBetween}>
                <div class={css.buttonFlex}>
                    <img class={css.center} src={Refresh} onclick="resetBoard();"/>
                    <input class={css.btn} type="button" id="1" value="1 player" disabled={button1}/>
                    <input class={css.btn} type="button" id="2" value="2 players" disabled={button2}/>
                </div>
                <div>
                    <img class={css.center} src={Cross} width="70"/>
                    <p class={css.centerText} id="scoreCross">0</p>
                </div>
                <div>
                    <img class={css.center} src={Circle} width="70"/>
                    <p class={css.centerText} id="scoreCircle">0</p>
                </div>
            </div>
            <div>
                {/* <canvas ref={canvasRef} class={css.canvas} id="game" height="600" width="600"></canvas> */}

                <Canvas draw={draw} listener={cursorPosition} />
            </div>
        </div>
    </div>


    <input class={css.textInput} type="text" id="gridSize" placeholder="Grid size" onchange="changeGridSize(this.value);"></input>

    </>
    )
}

export default NandC