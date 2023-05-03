import React from 'react'
import { useCanvasDrawer } from '~/Contexts/canvasDrawerContext'


const CanvasDrawer = () => {
    const { toggleCanvasDrawer, setToggleCanvasDrawer } = useCanvasDrawer();

  return (
    <div className={toggleCanvasDrawer ? "flex absolute w-72 z-40 bg-black h-screen" : "hidden"}>CanvasDrawer</div>
  )
}

export default CanvasDrawer