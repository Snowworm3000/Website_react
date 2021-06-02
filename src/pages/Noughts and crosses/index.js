import React from "react"
import TitleBar from "../titleBar"
import * as css from "../../components/NoughtsAndCrosses.module.css"

function NandC(){
    return (
        <>
        <TitleBar ></TitleBar>


        <h1 id="winInfo"></h1>
    <div id="mainGame" class={`${css.mainGame} ${css.centerFlex}`}>
        <div className={css.mainGame}>
            <div class="spaceBetween">
                <div class="buttonFlex">
                    <img class="center" src="refresh.svg" onclick="resetBoard();"/>
                    <input class="btn" type="button" id="1" value="1 player" onclick="getPlayers(this.id);"/>
                    <input class="btn" type="button" id="2" value="2 players" onclick="getPlayers(this.id);" disabled/>
                </div>
                <div>
                    <img class="center" src="Cross.svg" width="70"/>
                    <p class="centerText" id="scoreCross">0</p>
                </div>
                <div>
                    <img class="center" src="Circle.svg" width="70"/>
                    <p class="centerText" id="scoreCircle">0</p>
                </div>
                <div>
                <canvas id="game" height="600" width="600"></canvas>
                </div>
            </div>
        </div>
    </div>


    <input class="textInput" type="text" id="gridSize" placeholder="Grid size" onchange="changeGridSize(this.value);"/>

    </>
    )
}

export default NandC