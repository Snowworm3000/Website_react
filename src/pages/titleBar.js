import React from "react"
import * as css from "./titleBar.module.css"
import imageCode from "../assets/CodeWhite.svg"
import navBar from "../assets/bar.svg"

function TitleBar() {
    return (
        <header>
            <div className={css.centerDiv}>
                <img 
                src={imageCode}/>
            </div>
            <div class={css.topRight}>
                <button class={css.navMenu} onClick="openNav()"><img src={navBar}/></button>
            </div>
            
    
        </header>
    )
}

export default TitleBar