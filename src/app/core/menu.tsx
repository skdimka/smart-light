import React, { memo } from 'react'
import { ReactSVG } from "react-svg";
// import { ReactComponent as HomeSimple } from "../assets/icons/icons/homeSimple.svg";
import { Link } from "react-router-dom";
import AuthStore from "../../services/store";


export const Menu = () => {
  return (
    <>
      <nav className="menu">
        <button className="menu__item">
          <ReactSVG
            src="/svg/homeSimple.svg"
            className="menu__item__svg svg-active"
          />
          <div className="menu__item__text menu__item__text-active">
            Мой дом
          </div>
        </button>
        <button className="menu__item" disabled>
          <ReactSVG src="/svg/sliders.svg" className="menu__item__svg " />
          <div className="menu__item__text">Сценарии</div>
        </button>
        <button className="menu__item" disabled>
          <ReactSVG src="/svg/cart.svg" className="menu__item__svg" />
          <div className="menu__item__text">Магазин</div>
        </button>
        {/* <button className="menu__item"> */}
        <Link
          to={"/"}
          className="menu__item"
          onClick={() => AuthStore.logout()}
        >
          <ReactSVG src="/svg/log-out.svg" className="menu__item__svg" />
          <div className="menu__item__text">Выход</div>
          {/* homescrin */}
        </Link>
        {/* </button> */}
      </nav>
    </>
  );
};
