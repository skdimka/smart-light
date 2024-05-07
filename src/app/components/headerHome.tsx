import React, {useEffect} from "react";
import { ReactSVG } from "react-svg";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/App.scss";
import { Pagination } from "swiper/modules";


export const HeaderHome = () => {
  const [swiper, setSwiper] = React.useState<any>(null);

  useEffect(() => {
    const handler = async () => {
      await document.fonts.ready

      swiper.update()
    }

    if (swiper) {
      handler()
    }

  }, [swiper])


  return (
    <>
      <div className="header__container">
        <div className="header__container-section">
          <div className="header__container-section-text">Мой дом</div>
          <ReactSVG
            src="/svg/photo.svg"
            className="menu__item-svg"
          />
        
      </div>

      <div className="swiper-container">
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={"auto"}
          watchOverflow={true}
          spaceBetween={32}
          modules={[Pagination]}
          className="Swiper__tabs"
        >
          <SwiperSlide className="Swiper__tabs-slide">
            <button
              className="btn__tab btn__tab-active "
              onClick={() => console.log("Спальня")}
            >
              Спальня
            </button>
            
          </SwiperSlide>
          <SwiperSlide className="Swiper__tabs-slide">
            <button
              className="btn__tab"
              onClick={() => console.log("Гостинная")}
            >
              Гостинная
            </button>
            
          </SwiperSlide>
          <SwiperSlide className="Swiper__tabs-slide">
            <button className="btn__tab" onClick={() => console.log("Кухня")}>
              Кухня
            </button>
          </SwiperSlide>
          <SwiperSlide className="Swiper__tabs-slide">
            <button
              className="btn__tab"
              onClick={() => console.log("Детская комната")}
            >
              Детская комната
            </button>
          </SwiperSlide>
        </Swiper>
      </div>
      </div>
    </>
  );
};
