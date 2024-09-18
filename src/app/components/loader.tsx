import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

const Loader = () => {
  return (
    <div className="loader">
      <FadeLoader 
        color = {"#7445d0"}
        height = {10}
        width = {1}
      />
    </div>
  )
}

export default Loader
