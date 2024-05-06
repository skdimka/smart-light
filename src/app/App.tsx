import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AuthStore from "../services/store";
import PrivateRoute from "../services/privateRoute";
import "../styles/App.scss";
import { StartScreen } from "./auth/startScreen";
import AuthScreen from "./auth/authScreen";
import { RegistrationScreen } from "./auth/registrationScreen";
import { HomeScreen } from "./core/homeScreen";

export const App = observer(() => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      AuthStore.checkAuth();
      console.log("checkAuth!!!");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        //страница, для посещения которой авторизация не требуется
        <Route
          path="/"
          element={AuthStore.isAuth ? <HomeScreen /> : <StartScreen />}
        />
        <Route
          path="authScreen"
          element={AuthStore.isAuth ? <HomeScreen /> : <AuthScreen />}
        />
        <Route
          path="registrationScreen"
          element={AuthStore.isAuth ? <HomeScreen /> : <RegistrationScreen />}
        />
        //страницы, для посещения которых требуется авторизация
        <Route
          path="/homeScreen"
          element={AuthStore.isAuth ? <HomeScreen /> : <PrivateRoute />}
        >
          <Route path="" element={<HomeScreen />} />
        </Route>
        <Route path="*" element={<div>404... not found </div>} />
      </Routes>
    </BrowserRouter>
  );
});
