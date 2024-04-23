import axios from "axios"

export const Authorization = {
   async getAuth(data: object) {
    const response = await axios.post("http://5.35.98.199/api/auth/sign-in", data
    )
    return response.data
   }
}