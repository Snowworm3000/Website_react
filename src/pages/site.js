import React from "react"
import { Link } from 'gatsby'
import Image from "./image"
// import { StaticImage } from "gatsby-plugin-image"
// import { GatsbyImage } from "gatsby-plugin-image/dist/src/components/gatsby-image.browser"
import * as css from "../components/site.module.css"
 
function Site({image, text}){
    return(
        <Link to={text + "/"} className={css.site}>
            <div>
                <div className={css.image}>
                    <Image filename={image}/>
                </div>
                <p className={css.center}>{text}</p>
            </div>
        </Link>
    )
}

export default Site