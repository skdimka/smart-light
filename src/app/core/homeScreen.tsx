import React, { useState } from "react";
import { HeaderHome } from "../components/headerHome";
import { Menu } from "./menu";
import { Devices } from "../components/devices";
import { IDevacesArr } from "../interfaces/devices.interface";


export const HomeScreen = () => {
  // запрашиваем список устройств
  const devicesArr : IDevacesArr[] = [
    { name: "Название устройства", id: 0 },
    { name: "Название устройства", id: 1 },
    { name: "Название устройства", id: 2 },
    { name: "Название устройства", id: 3 },
    // { name: "Название устройства", id: 4 },
    // { name: "Название устройства", id: 5 },
    // { name: "Название устройства", id: 6 },
  ];


  return (
    <>
      <div className="container">
        <HeaderHome />
        <Devices devices={devicesArr} />
        <Menu />
      </div>
    </>
  );
};

