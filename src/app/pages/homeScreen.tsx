import React, { useEffect } from "react";
import { HeaderHome } from "../components/headerHome";
import Menu from "../core/menu";

export const HomeScreen = () => {
  useEffect(() => {
    const header: HTMLDivElement | null = document.querySelector('.header__container')
    const menu: HTMLDivElement | null = document.querySelector('.menu')
    const devicesContainer: HTMLDivElement | null = document.querySelector('.devices-container')

    if (!header || !menu || !devicesContainer) {
      return;
    }

    const handleResize = () => {
      const res = window.innerHeight - (header?.offsetHeight ?? 0) - (menu?.offsetHeight ?? 0);
      devicesContainer.style.maxHeight = `${res}px`;
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(handleResize);
    if (header) {
      observer.observe(header);
    }

  }, [])



  return (
    <>
      <div className="container light">
        <HeaderHome />
        <Menu />
      </div>
    </>
  );
};

