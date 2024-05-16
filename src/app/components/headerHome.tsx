import React, {useEffect, useState} from "react";
import { ReactSVG } from "react-svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/App.scss";
import { Pagination } from "swiper/modules";
import { Devices } from "./devices";
import AuthStore  from "../../services/store"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { action } from "mobx";
  interface Room {
    id: string;
    name: string;
  }

export const HeaderHome = () => {
  const [activeTab, setActiveTab] = React.useState<any>(null);
  const [devices, setDevicesArr] = React.useState<any>([]);
  const [swiper, setSwiper] = React.useState<any>(null);
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  action(() => {
    AuthStore.isCompleteAddDevice = false;
  })();

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

  const handleSvgLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
    <div className="header__container">
      <div className="header__container-section">
        <div className="header__container-section-text">
          {AuthStore.rooms.length > 0 ? (
            "Мой дом"
          ) : (
            isLoading && <Skeleton width={100} height={30} />
          )}
        </div>
        {AuthStore.rooms.length > 0 ? (
            <ReactSVG
            src="/svg/photo.svg"
            className="menu__item-svg"
            afterInjection={() => handleSvgLoad()}
          />
          ) : (
          isLoading && 
            <div className="menu__item-svg">
              <Skeleton circle={true} height={40} width={40} />
            </div>
          )}

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
          {AuthStore.rooms.length > 0 ? (
            roomsData.map((room) => (
              <SwiperSlide className="Swiper__tabs-slide" key={room.id}>
                <button
                  key={room.id}
                  className={`btn__tab ${
                    activeTab === room.name ? "btn__tab-active" : ""
                  }`}
                  onClick={() => handleTabClick(room)}
                >
                  {room.name}
                </button>
              </SwiperSlide>
            ))
          ) : (
            isLoading && 
            (
              <div style={{ marginBottom: "5px" }}>
                <Skeleton count={1} height={30} />
              </div>
            )
          )}
        </Swiper>
      </div>
    </div>
    <Devices devices={devices} />
  </>
  );
};