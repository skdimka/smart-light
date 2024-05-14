import React from 'react'

interface TextBlockProps {
    heading : string | undefined;
    text: string;
}
  
const TextBlock : React.FC<TextBlockProps>  = ({heading, text}) => {
  return (
    <div className="text">
        <div className="text__h1">{heading}</div>
        <div className="text__body">{text}</div>
    </div>
  )
}

export default TextBlock
