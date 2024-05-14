import React from 'react'
import { ReactSVG } from 'react-svg'

interface ImageScreenProps {
  theme: 'gray' | 'light';
}

const ImageScreen : React.FC<ImageScreenProps> = ({theme}) => {
  // либо переделать на стили 
  const backgroundColor = theme === 'gray' ? '#f5f7f9' : '#ffffff';
  return (
    <div className="startScreen-image">
    <ReactSVG 
      src="/svg/startScreenNew.svg" 
      beforeInjection={(svg) => {
        svg.classList.add('svg-container')
        svg.setAttribute('style', `background-color: ${backgroundColor};`)
      }}
    />
  </div>
  )
}

export default ImageScreen
