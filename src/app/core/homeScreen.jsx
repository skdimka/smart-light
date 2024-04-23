import React, { useState } from "react";
import { Header } from "../components/header";
// import { DeviceService } from "../services/device.service";

export const HomeScreen = () => {
  //   const [device, setDevice] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const data = await DeviceService.getAll();

  //       setDevice(data);
  //     };

  //     fetchData();
  //   }, []);
  return (
    <>
      <div className="container">
        <Header text={"Добавить устройство"} />
      </div>
      {/* {device.map((dev) => (
        <div key={dev.id}>
          <p>{dev.name}</p>
        </div>
      ))} */}
    </>
  );
};
