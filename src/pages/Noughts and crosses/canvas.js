import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const { draw, listener, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
      console.log("useEffect")
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    canvas.addEventListener('mousedown', function(e) {
        listener(canvasRef, context, e)
    })
    
    draw(context, canvas)
    // const render = () => {
    //   draw(ctx)
    //   animationFrameId = window.requestAnimationFrame(render)
    // }
    // render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas