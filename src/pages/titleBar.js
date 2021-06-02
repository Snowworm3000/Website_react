import React from "react"
import * as css from "./titleBar.module.css"
import imageCode from "../assets/CodeWhite.svg"
import navBar from "../assets/bar.svg"
import Sidebar from "./sidebar";

function TitleBar() {
    

    function openNav(){
        document.getElementById("sidebar").style.width = "300px"; 
    }

    return (
        <>
        <header>
            <div className={css.centerDiv}>
                <img 
                src={imageCode}/>
            </div>
            <div className={css.topRight}>
                <button class={css.navMenu} onClick={openNav}><img src={navBar}/></button>
            </div>
            
        
        </header>
        <Sidebar></Sidebar>
        </>
    )
}

export default TitleBar