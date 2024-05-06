import React from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/startScreen.svg";

export const StartScreen = () => {
  return (
    <section>
      <div className="startScreen">
        <div className="startScreen__image">
          {/* TODO Использовать React-SVG */}
          <Logo />
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
    </section>
  );
};
