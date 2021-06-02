import React from "react"
import * as css from "./sideBar.module.css"

function Sidebar(){
    function closeNav(){
        document.getElementById("sidebar").style.width = "0";
    }

    const anchorCss = `${css["w3_bar_item"]} ${css["w3_button"]}`
    const pCss = css["w3_bar_item"]

    return (
        <div id="sidebar" className={`${css.sidebar} ${css.w3_sidebar} ${css.w3_bar_block} ${css.w3_border_right}`}>
            <p href="javascript:void(0)" className={`${css["w3_bar_item"]} ${css["w3_button"]} ${css["closebtn"]}`} onClick={closeNav}>Close x</p>
            <a className={anchorCss} href="/index.html">Home</a>
            <p className={pCss}>Games:</p>
            <a className={anchorCss} href="./Noughts and crosses/index.html">Noughts and crosses</a>
            <a className={anchorCss} href="./Quiz/Game/index.html">Quiz</a>
            <a className={anchorCss} href="./Connect4/index.html">Connect four</a>
            <a className={anchorCss} href="./Othello/index.html">Othello</a>
            <p className={pCss}>Experiments</p>
            <a className={anchorCss} href="./Experiments/RandomBackground/index.html">Random background</a>
            <a className={anchorCss} href="./Experiments/SimonSays/index.html">Simon says</a>
            
        </div>
    )
}

export default Sidebar