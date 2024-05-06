import axios from "axios";
import { Navigate, redirect } from "react-router-dom";


// const navigate = useNavigate();

export const instance = axios.create({
    // withCredentials: true,
    baseURL: "http://5.35.98.199",
    headers: { 'X-API-KEY': `LiU9dlsRWhDO0GZRqIGHk6Lw6qpuXzBE` }
});

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `${localStorage.getItem("token")}`;

        // TODO console.log if development
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
              // TODO использовать ts-ignor
              // @ts-ignore
              const resp = await instance.post('/api/auth/refresh', null, { _isRetry: true })
                localStorage.setItem("token", resp.data.accessToken);

                // TODO убрать редирект и использовать мутации store, редиректы уже настроены
                AuthStore.SET_AUTH(true)
                return instance.request(originalRequest);
            } catch (e) {
                // TODO console.error
                console.error("AUTH ERROR");
                // navigate("/AuthScreen")
            }
        }
        throw error;
    }
);