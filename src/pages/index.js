import React from "react"
import TitleBar from "./titleBar"
import Site from "./site"
import connect from "../images/ConnectFour.png"
import { useStaticQuery } from "gatsby"
import {GatsbyImage, getImage, StaticImage} from "gatsby-plugin-image"
import Image from "./image"
import * as css from "../components/home.module.css"


function Home({data}){
    // const image = getImage(data.blogPost.avatar)
    let hi = "../images/ConnectFour.png"
    return(
        <>
            <TitleBar></TitleBar>
            <div className={css.category} id="games">
                <p className={css.center + " " + css.bg}>Games</p>
                <div className={css.box}>
                    <Site text="Noughts and crosses" image="Noughts and crosses.png"></Site>
                    <Site text="Quiz" image="Quiz.png"></Site>
                    <Site text="Connect Four" image="ConnectFour.png"></Site>
                    <Site text="Othello" image="Othello.png"></Site>
                    <Site text="Draughts" image="Draughts.png"></Site>
                    {/* <Image src="Othello.png"></Image> */}
                </div>
            </div>
            <div className={css.category} id="experiments">
                <p className={css.center + " " + css.bg}>Experiments</p>
                <div className={css.box}>
                    <Site text="Random background"></Site>
                </div>
            </div>
        </>
    )
}

export default Home
