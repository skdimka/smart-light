import axios from "axios";
import AuthStore from "../store/store"

export const instance = axios.create({
    baseURL: "http://5.35.98.199",
    headers: { 'X-API-KEY': `LiU9dlsRWhDO0GZRqIGHk6Lw6qpuXzBE` }
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `${localStorage.getItem("token")}`;

        if (process.env.NODE_ENV === "development") {
            console.log("accessToken из localStorage", localStorage.getItem("token"));
        }

        return config
    }
)

instance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {

        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            const originalRequest = { ...error.config, _isRetry: true };

            try {
              // @ts-ignore
              const resp = await instance.post('/api/auth/refresh', null, { _isRetry: true })
                localStorage.setItem("token", resp.data.accessToken);

                AuthStore.setAuth(true)
                return instance.request(originalRequest);

            } catch (e) {
                console.error("AUTH ERROR");
            }
        }
        throw error;
    }
);