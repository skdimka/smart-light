import React from 'react'

interface TextBlockProps {
    heading : string | undefined;
    text: string;
}
  
const TextBlock : React.FC<TextBlockProps>  = ({heading, text}) => {
  return (
    <div className="text-block">
        <div className="text-block__heading">{heading}</div>
        <div className="text-block__body">{text}</div>
    </div>
  )
}

export default TextBlock
