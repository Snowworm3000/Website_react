import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = props => (
    <StaticQuery
      query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  fixed(width: 200) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const image = data.images.edges.find(n => {
          return n.node.relativePath.includes(props.filename);
        });
        if (!image) {
          return null;
        }
  
        //const imageSizes = image.node.childImageSharp.sizes; sizes={imageSizes}
        return <Img alt={props.alt} fixed={image.node.childImageSharp.fixed} />;
      }}
    />
  );
export default Image