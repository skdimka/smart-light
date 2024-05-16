import React from 'react'
import { Link } from 'react-router-dom';

interface Button {
    text: string;
    link: string;
    className?: string;
  }

interface ButtonGroupProps{
    buttons: Button[]
}

const ButtonGroup  : React.FC<ButtonGroupProps> = ({buttons}) => {
  return (
    <div className="buttonGroup">
          {buttons?.map((button) => (
            <Link
              className={button.className || "btn__primary"} 
              to={button.link}
              key={button.link}
              >
                {button.text}
             </Link>
          ))}
    </div>
  )
}

export default ButtonGroup