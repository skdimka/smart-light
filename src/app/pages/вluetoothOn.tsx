import React, { useEffect, useState } from 'react'
import { TempleteScreen } from '../core/templeteScreen';
import { IDevices } from '../components/devices';


export const AddDeviceBluetooth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [devices, setDevices] = useState<IDevices[]>([]);

      useEffect(() => {
        const socket = new WebSocket("ws://5.35.98.199:80/ws?api_key=LiU9dlsRWhDO0GZRqIGHk6Lw6qpuXzBE");

        socket.addEventListener("open", event => {
          if (process.env.NODE_ENV === "development") {
            console.log("Connected to WebSocket server");
          }
            socket.send("Connection established");
        });

        socket.addEventListener("message", event => {
          if (process.env.NODE_ENV === "development") {
            console.log("Message from server:", event.data);
          }
            const message = JSON.parse(event.data);
            if (message.status === "success" && message.data.length > 0) {
                setDevices(message.data);
                setIsLoading(false);
                socket.close();
            }
            if (message.status === "error") {
              console.error("Error response from server:", message.errors);
            }  
        });

        return () => {
          if (process.env.NODE_ENV === "development") {
            console.log("Closing WebSocket connection");
          }
            socket.close();
        };
    }, []);  

  return (
    <TempleteScreen 
            headerText="Добавить устройство"  
            TextBlockText="Включите устройство, которое вы хотите подключить в розетку и оно появится здесь." 
            showImage={false}
            loader = {isLoading}
            devices = {devices}
        >
    </TempleteScreen>
  )
}
