import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import AuthStore from "../store/store";

interface MenuItem {
  id: string;
  text: string;
  svgSrc: string;
  link?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Menu: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState<string | null>("home");

  const menuItems: MenuItem[] = [
    { id: "home", text: "Мой дом", svgSrc: "/svg/homeSimple.svg" },
    { id: "scenarios", text: "Сценарии", svgSrc: "/svg/sliders.svg", disabled: true},
    { id: "store", text: "Магазин", svgSrc: "/svg/cart.svg", disabled: true },
    { id: "logout", text: "Выход", svgSrc: "/svg/log-out.svg", link: "/", onClick: () => AuthStore.logout() },
  ];

  const handleItemClick = (id: string) => {
    setActiveItemId(id);
  };

  return (
    <nav className="menu">
      {menuItems.map((item) => {
        const isActive = item.id === activeItemId;
        const itemClass = `menu__item${isActive ? " menu__item--active" : ""}`;
        const svgClass = `menu__item-svg${isActive ? " menu__item-svg--active" : ""}`;
        const textClass = `menu__item-text${isActive ? " menu__item-text--active" : ""}`;

        if (item.link) {
          return (
            <Link
              key={item.id}
              to={item.link}
              className={itemClass}
              onClick={() => {
                handleItemClick(item.id);
                if (item.onClick) item.onClick();
              }}
            >
              <div className="menu__item-svg-container">
                <ReactSVG src={item.svgSrc} className={svgClass} />
              </div>
              <div className={textClass}>{item.text}</div>
            </Link>
          );
        }

        return (
          <button
            key={item.id}
            className={itemClass}
            onClick={() => handleItemClick(item.id)}
            disabled={item.disabled}
          >
            <div className="menu__item-svg-container">
              <ReactSVG src={item.svgSrc} className={svgClass} />
            </div>
            <div className={textClass}>{item.text}</div>
          </button>
        );
      })}
    </nav>
  );
};

export default Menu
