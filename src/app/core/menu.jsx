import { ReactSVG } from "react-svg";
// import { ReactComponent as HomeSimple } from "../assets/icons/icons/homeSimple.svg";

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
        <button className="menu__item">
          <ReactSVG src="/svg/log-out.svg" className="menu__item__svg" />
          <div className="menu__item__text">Выход</div>
        </button>
      </nav>
    </>
  );
};
