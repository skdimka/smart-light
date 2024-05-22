import React from "react";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../api/api.auth"
interface Room {
  id: string;
  name: string;
}

interface Device {
  id: string;
  name: string;
  type: string;
  state: string;
}
class AuthStore {
  isAuth : boolean = false;
  isAuthInProgress : boolean = false;
  registrationSuccess : boolean = false;
  rooms : Room[] = [];
  devices : Device[]= [];
  activeTab: any = null;
  isCompleteAddDevice : boolean = false;
  lastAddedDeviceName : string = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(email : string, password : string) {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.login(email, password);
      localStorage.setItem("token", resp.data.data);

      if (process.env.NODE_ENV === "development") {
        console.log("Логин, кладу токен в локал:", resp.data.data);
      }

      this.setAuth(true);
      return null; 
    } catch (error) {
      console.error("login error при авторизации",error);
      return error;
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async checkAuth() {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.refresh();
      localStorage.setItem("token", resp.data.data);
      this.setAuth(true);
    } catch (error) {
      console.error("login error при проверки авторизации",error);
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async registration(name : string, email : string, password : string) {
    try {
      const resp = await AuthService.registration(name, email, password);
      localStorage.setItem("token", resp.data.data);

      if (process.env.NODE_ENV === "development") {
        console.log("Регистрация, кладу токен в локал:", resp.data.data);
      }

      this.registrationSuccess = true;
      this.setAuth(true);
      return null;
    } catch (error) {
      console.error("Registration error при регистрации",error);
      return error;
    }
  }

  async logout() {
    this.isAuthInProgress = true;
    try {
      await AuthService.logout();
      this.setAuth(false);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("logout error при логаут",error);
    } finally {
      this.isAuthInProgress = false;
    }
  }

  setAuth(value : boolean) {
    this.isAuth = value;
  }

  async fetchRoomData(roomId: string) {
    try {
      const response = await AuthService.getRoomDevices(roomId);
      const devicesData = response.data.data.devices;
      this.devices = devicesData;

      if (process.env.NODE_ENV === "development") {
        console.log("Получаю список устройств в комнате: ", roomId);
        console.log("devices: ", this.devices); 
      }

    } catch (error) {
      console.error("Ошибка при получении списка устройств в комнате: ", error);
    }
  }
  
  async fetchRooms(){
    try {
      const responseData = await AuthService.getRooms();

      console.log("Получаю список комнат:", responseData.data.data);
  
      this.rooms = responseData.data.data;
  
      if (this.rooms.length > 0) {
        const firstRoomId = this.rooms[0].id;
        await this.fetchRoomData(firstRoomId);
        this.activeTab = this.rooms[0].name;
      }
    } catch (error) {
      console.error("Ошибка при получении списка комнат: ", error);
    }
  }

  async deleteDevice(deviceId: string) {
    try {
      await AuthService.deleteDevice(deviceId);
      this.devices = this.devices.filter(device => device.id !== deviceId);
    } catch (error) {
      console.error("Ошибка при удалении устройства:", error);
    }
  }
  
  async toggleDeviceState(deviceId: string, state : string ) {
    try {
      await AuthService.stateDevice(deviceId, state);
      const updatedDevices = this.devices.map(device => {
        if (device.id === deviceId) {
          return { ...device, state };
        }
        return device;
      });
      this.devices = updatedDevices;
    } catch (error) {
      console.error("Ошибка при включении/выключении устройства:", error);
    }
  }

 async addNewDevice(name: string, type : string, roomId : string) {
    try {
      await AuthService.addNewDevice(name, type, roomId);
      this.isCompleteAddDevice = true;
      this.lastAddedDeviceName= name;
      return null;
    } catch (error) {
      console.error("Ошибка при добавлении устройства:", error);
      return error;
    }
  }
  
}

export default new AuthStore();
