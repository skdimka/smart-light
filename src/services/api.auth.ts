import { instance } from "./api.config";

export const AuthService = {
   login (email : string, password : string) {
      return instance.post("/api/auth/sign-in", { email, password })
   },

   registration(name : string, email : string, password : string) {
      return instance.post("/api/auth/sign-up", {name, email, password})
   },

   refresh() {
   return instance.post("/api/auth/refresh");
   },

   logout() {
   return instance.post("/api/auth/sign-out")
   },

   getRooms() {
   return instance.get("/api/rooms")
   },

   getRoomDevices(roomId : string) {
   return instance.get(`/api/rooms/${roomId}`)
   },

   addNewDevice(name: string, type : string, roomId : string) {
   return instance.post("/api/device", {name, type, roomId})
   },

   deleteDevice(deviceId : string) {
   return instance.delete(`/api/device/${deviceId}`)
   },

   stateDevice(deviceId : string, state : string ){
   return instance.put(`/api/device/${deviceId}`, {state} )   
   }

}