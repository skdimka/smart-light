import React, {useEffect, useState} from "react";
import { ReactSVG } from "react-svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/App.scss";
import { Pagination } from "swiper/modules";
import { Devices } from "./devices";
import AuthStore  from "../../services/store"
import { AuthService } from "../../services/api.auth";

  interface Room {
    id: string;
    name: string;
  }

export const HeaderHome = () => {
  const [activeTab, setActiveTab] = React.useState<any>(null);
  const [devices, setDevicesArr] = React.useState<any>([]);
  const [swiper, setSwiper] = React.useState<any>(null);
  const [roomsData, setRoomsData] = useState<Room[]>([]);

  useEffect(() => {
    const handler = async () => {
      await document.fonts.ready

      swiper.update()
    }

    if (swiper) {
      handler()
    }

  }, [swiper])

  useEffect(() => {
    const fetchData = async () => {
      await AuthStore.fetchRooms();
      setRoomsData(AuthStore.rooms);
      setDevicesArr(AuthStore.devices);
      setActiveTab(AuthStore.activeTab);
    };

    fetchData();
  }, []);


  const handleTabClick = async (room: Room) => {
    await AuthStore.fetchRoomData(room.id);
    setDevicesArr(AuthStore.devices);
    setActiveTab(room.name);
  };

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
              {roomsData.map((room) => (
              <button
                key={room.id}
                className={`btn__tab ${
                  activeTab === room.name ? "btn__tab-active" : ""
              }`}
                onClick={() => handleTabClick(room)}
              >
                {room.name}
              </button>
            ))}
          </SwiperSlide>
        
        </Swiper>
      </div>
      </div>
      <Devices devices={devices}/>
    </>
  );
};


  



          {/* <SwiperSlide className="Swiper__tabs-slide">
            <button
              className={`btn__tab ${
                activeTab === "Спальня" ? "btn__tab-active" : ""
              }`}
              onClick={() => handleTabClick("Спальня", 0)}
            >
              Спальня
            </button>
          </SwiperSlide>

          <SwiperSlide className="Swiper__tabs-slide">
            <button
              className={`btn__tab ${
                activeTab === "Гостинная" ? "btn__tab-active" : ""
              }`}
              onClick={() => handleTabClick("Гостинная", 1)}
            >
              Гостинная
            </button>
          </SwiperSlide>

          <SwiperSlide className="Swiper__tabs-slide">
            <button 
              className={`btn__tab ${
                activeTab === "Кухня" ? "btn__tab-active" : ""
              }`}
              onClick={() => handleTabClick("Кухня", 2)}>
              Кухня
            </button>
          </SwiperSlide>

          <SwiperSlide className="Swiper__tabs-slide">
            <button
              className={`btn__tab ${
                activeTab === "Детская комната" ? "btn__tab-active" : ""
              }`}
              onClick={() => handleTabClick("Детская комната", 3)}
            >
              Детская комната
            </button>
          </SwiperSlide> */}