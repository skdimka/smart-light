import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AuthStore from "../services/store.js";
import PrivateRoute from "../services/privateRoute";
import "../styles/App.scss";
import { StartScreen } from "./auth/startScreen";
import { AuthScreen } from "./auth/authScreen";
import { RegistrationScreen } from "./auth/registrationScreen";
import { HomeScreen } from "./core/homeScreen";

const App = observer(() => {
  useEffect(() => {
    AuthStore.checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        //страница, для посещения которой авторизация не требуется
        <Route path="/" element={<StartScreen />}>
          <Route path="authScreen" element={<AuthScreen />} />
          <Route path="registrationScreen" element={<RegistrationScreen />} />
        </Route>
        //страницы, для посещения которых требуется авторизация
        <Route path="/homeScreen" element={<PrivateRoute />}>
          <Route path="" element={<HomeScreen />} />
        </Route>
        <Route path="*" element={<div>404... not found </div>} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;
