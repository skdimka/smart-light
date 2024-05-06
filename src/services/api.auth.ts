// import axios from "axios"
import { instance } from "./api.config.js";

export const AuthService = {
   // async getAuth(data: object) {
   //  const response = await axios.post("http://5.35.98.199/api/auth/sign-in", data
   //  )
   //  return response.data
   // }

   login (email, password) {
      return instance.post("/api/auth/sign-in", { email, password })
  },

   refreshToken() {
   return instance.get("/api/auth/refresh");
   },

   logout() {
   return instance.post("/api/auth/sign-out")
   }



}