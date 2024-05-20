import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };
  return (
    <>
      <div className="header">
        <Link onClick={goBack} className="btn__back" to={''}>
          <ReactSVG
            src="/svg/back.svg"
            className="menu__item__svg svg-active"
          />
        </Link>
        <div className="header-text">{text}</div>
      </div>
    </>
  );
};

export default Header
