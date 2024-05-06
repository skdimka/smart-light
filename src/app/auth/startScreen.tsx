import React from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/startScreen.svg";

export const StartScreen = () => {
  return (
    <section>
      <div className="startScreen">
        <div className="startScreen__image">
          <Logo />
        </div>

        <div className="text">
          <div className="text__h1">Умные устройства в каждый дом</div>
          <div className="text__body">
            Приложение-помощник в работе со смарт-устройствами
          </div>
        </div>

        <div className="buttonGroup">
          <Link to={"/authScreen"} className="btn__primary">
            Войти
          </Link>
          <Link to={"/registrationScreen"} className="btn__secondary">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
};
