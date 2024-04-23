import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

export const Header = ({ text }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Реализовать button-back */}
      <header>
        <Link onClick={() => navigate(-1)} className="btn__back">
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
