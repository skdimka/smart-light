import React from "react";
import { ReactSVG } from "react-svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AuthStore from "../store/store"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export interface IDevacesArr {
  id: string;
  name: string;
}

export interface IDevacesArrProps {
  devices:  IDevacesArr[ ];
}


export interface IDevices {
  name: string;
  type: string;
}


const Devices: React.FC<IDevacesArrProps> = observer(() => {
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
      {AuthStore.rooms.length > 0 ? (
        AuthStore.devices.length > 0 ? (
          AuthStore.devices.map((device) => (
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={0}
              modules={[Pagination]}
              className="Swiper__devices"
              key={device.id}
            >
              <SwiperSlide className="Swiper__devices-slide" key={device.id}>
                <div className="device" key={device.id}>
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
          ))
        ) : (
          <div className="Swiper__devices">
            <div className="device">
              <ReactSVG src={`/svg/exampleLamp.svg`} className="device-svg" />
              <div className="device-name">Здесь будет устройство</div>
            </div>
          </div>
        )
      ) : (
        <Skeleton count={5} height={70} />
      )}


      </div>
        
      {AuthStore.rooms.length > 0 ? (
        <div className="device-add">
         <ReactSVG src="/svg/Vector.svg" className="device-add-svg" />
         <Link to="/add-device" className="device-add-text">Добавить устройство</Link>
        </div>
      ) : AuthStore.rooms.length > 0 ? (
        <div>Вы еще ничего не добавили</div>
      ) : (
        <div style={{ marginTop: "10px" }}>
          <Skeleton count={1} height={20}/> 
        </div>
        )
      }


      </div>
  </>;
});

export default Devices