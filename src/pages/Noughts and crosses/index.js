import React, {useState, useRef, useEffect} from "react"
import TitleBar from "../titleBar"
import * as css from "../../components/NoughtsAndCrosses.module.css"
import Cross from "../../assets/NoughtsAndCrosses/Cross.svg"
import Circle from "../../assets/NoughtsAndCrosses/Circle.svg"
import Refresh from "../../assets/NoughtsAndCrosses/Refresh.svg"
// import * as Game from "../../scripts/NoughtsAndCrosses.js"
import Canvas from "./canvas.js"
import Game from "./gameLogic"

function NandC(){

    // console.log(Game.canvas)
    const game = Game({
        "setWinInfo":setWinInfo,
        "setScoreCircle":setScoreCircle,
        "setScoreCross":setScoreCross
    })

    useEffect(() => {
        
    }, [])
    
    let button1 = false
    let button2 = true

    console.log("rerender 😜😭😶‍🌫️")

    
    const [winInfo, setWinInfo] = useState("")
    const [scoreCircle, setScoreCircle] = useState(0)
    const [scoreCross, setScoreCross] = useState(0)
    // const canvasRef = useRef(null)
    

    

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
                    {/* <img class={css.center} src={Refresh} onclick="resetBoard();"/> */}
                    <input class={css.btn} type="button" id="1" value="1 player" disabled={button1}/>
                    <input class={css.btn} type="button" id="2" value="2 players" disabled={button2}/>
                </div>
                <div>
                    <img class={css.center} src={Cross} width="70"/>
                    <p class={css.centerText} id="scoreCross">{scoreCross}</p>
                </div>
                <div>
                    <img class={css.center} src={Circle} width="70"/>
                    <p class={css.centerText} id="scoreCircle">{scoreCircle}</p>
                </div>
            </div>
            <div>
                {/* <canvas ref={canvasRef} class={css.canvas} id="game" height="600" width="600"></canvas> */}

                <Canvas draw={Game.draw} listener={Game.cursorPosition} height="600" width="600"/>
            </div>
        </div>
    </div>

    <img src="/NoughtsAndCrosses/Circle.svg"/>


    <input class={css.textInput} type="text" id="gridSize" placeholder="Grid size" onchange="changeGridSize(this.value);"></input>

    </>
    )
}

export default NandC