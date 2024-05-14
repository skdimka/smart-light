import React, { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { IDevacesArrProps } from "../interfaces/devices.interface";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AuthStore from "../../services/store"

export const Devices: React.FC<IDevacesArrProps> = observer(() => {
  const handleDeleteDevice = async (deviceId: string) => {
    try {
      await AuthStore.deleteDevice(deviceId);
    } catch (error) {
      console.error("Ошибка при удалении устройства:", error);
    }
  };

  const handleStateDevice = async (deviceId: string, state : string ) => {
    try {
      state === "off" ? state = "on" : state = "off";
      await AuthStore.toggleDeviceState(deviceId, state);

    } catch (error) {
      console.error("Ошибка при включении или выключении устройства:", error);
    }
  };

  return <>
    <div className="devices-container">
      <div className="devices-container-swaiper">
      {AuthStore.devices.length > 0 ? (
      AuthStore.devices.map((device) =>(
          <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          modules={[Pagination]}
          className="Swiper__devices"
        >
              <SwiperSlide className="Swiper__devices-slide">
                
                <div key={device.id} className="device">
                  <ReactSVG src={`/svg/${device.type}.svg`} className="device-svg" />
                  <div className="device-name">{device.name}</div>
                  <button 
                    className="device-btn"
                    onClick={() => handleStateDevice(device.id, device.state)}
                  >
                  <ReactSVG 
                    src={`/svg/power${device.state === "on" ? "On" : "Off"}.svg`} 
                    className="device-svg"
                    style={{ fill: "black" }} 
                    />
                  </button>
              </div>

              </SwiperSlide>

              <SwiperSlide className="Swiper__Slide-delete">
                <button 
                  className="device-btn-delete"
                  onClick={() => handleDeleteDevice(device.id)}
                  >
                  <ReactSVG src="/svg/delete.svg" className="device-svg-delete" />
                </button>
              </SwiperSlide>
        </Swiper>
        ) )
      ) : (
        <div className="device">
          <div className="device-name">Пока пусто </div>
        </div>
      )}

      </div>
        
        <div className="device-add">
         <ReactSVG src="/svg/Vector.svg" className="device-add-svg" />
         <Link to="/add-device" className="device-add-text">Добавить устройство</Link>
        </div>

      </div>
  </>;
});
