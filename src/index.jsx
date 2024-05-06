import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "./styles/App.scss";
import AuthStore from "./services/store";

// TODO перенести проверку авторизации
(async () => {
    if (localStorage.getItem('token')) {
        await AuthStore.checkAuth()
    }

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
})()
