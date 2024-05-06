import React from "react";
import { ReactSVG } from "react-svg";
import { IDevacesArrProps } from "../interfaces/devices.interface";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export const Devices : React.FC<IDevacesArrProps> = ({devices}) => {

  return <>
    <div className="devices-container">
      <div className="devices-container-swaiper">

      
      {devices.map(device =>(
          <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          
          modules={[Pagination]}
          className="Swiper__devices"
        >
              <SwiperSlide className="Swiper__devices-slide">

                <div key={device.id} className="device">
                  <ReactSVG src={`/svg/${device.name === "Название устройства" ? "bulb" : "socket"}.svg`} className="device-svg" />
                  <div className="device-name">{device.name}</div>
                  <button className="device-btn">
                  <ReactSVG src="/svg/power.svg" className="device-svg" />
                  </button>
              </div>

              </SwiperSlide>

              <SwiperSlide className="Swiper__Slide-delete">
                <button className="device-btn-delete">
                  <ReactSVG src="/svg/delete.svg" className="device-svg-delete" />
                </button>
              </SwiperSlide>
        </Swiper>
        ) )}
        </div>
        


        <div className="device__add">
         <ReactSVG src="/svg/Vector.svg" className="device__add-svg" />
        <p className="device__add-text">Добавить устройство</p>
        </div>

        </div>
      
  </>;
};
