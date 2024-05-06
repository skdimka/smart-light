import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

interface HeaderProps {
  text: string;
}

export const Header: React.FC<HeaderProps> = ({ text }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="header-start">
        <Link onClick={() => navigate(-1)} className="btn__back" to={''}>
          <ReactSVG
            src="/svg/back.svg"
            className="menu__item__svg svg-active"
          />
        </Link>
        <div className="header_text">{text}</div>
      </header>
    </>
  );
};
