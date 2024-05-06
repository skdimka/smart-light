import axios from "axios";

export const instance = axios.create({
    // к запросу прикрепляется cookies - выключаем?
    withCredentials: true,
    baseURL: "http://5.35.98.199/",
});


// Тут добавляем наш токен авторизации?  LiU9dlsRWhDO0GZRqIGHk6Lw6qpuXzBE
// `${localStorage.getItem("token")}`
instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `${localStorage.getItem("token")}`
        return config
    }
)

instance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = { ...error.config };
        originalRequest._isRetry = true;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                // запрос на обновление токенов
                const resp = await instance.get("/api/auth/refresh");
                // сохраняем новый accessToken в localStorage
                // localStorage.setItem("token", resp.data.accessToken);
                localStorage.setItem("token", "LiU9dlsRWhDO0GZRqIGHk6Lw6qpuXzBE");
                // переотправляем запрос с обновленным accessToken
                return instance.request(originalRequest);
            } catch (error) {
                console.log("AUTH ERROR");
            }
        }
        // на случай, если возникла другая ошибка (не связанная с авторизацией)
        throw error;
    }
);