import React from 'react';
import { Link } from "react-router-dom";
import { ReactSVG } from 'react-svg';

export const StartScreen = () => {
  return (
      <div className="container">
        <div className="startScreen-image">
          <ReactSVG src="/svg/startScreen.svg"/>
        </div>

        <div className="text">
          <div className="text__h1">Умные устройства в каждый дом</div>
          <div className="text__body">
            Приложение-помощник в работе со смарт-устройствами
          </div>
        </div>

        <div className="buttonGroup">
          <Link to={"/auth/sign-in"} className="btn__primary">
            Войти
          </Link>
          <Link to={"/auth/sign-up"} className="btn__secondary">
            Регистрация
          </Link>
        </div>
      </div>
  );
};
