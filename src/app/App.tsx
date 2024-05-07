import React, {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "../services/store";
import "../styles/App.scss";
import {StartScreen} from "./auth/startScreen";
import AuthScreen from "./auth/authScreen";
import {RegistrationScreen} from "./auth/registrationScreen";
import {HomeScreen} from "./core/homeScreen";

export const App = observer(() => {
  useEffect(() => {
    const header: HTMLDivElement | null = document.querySelector('.header__container')
    const menu: HTMLDivElement | null = document.querySelector('.menu')

    const handleResize = () => {
      const res = window.innerHeight - (header?.offsetHeight ?? 0) - (menu?.offsetHeight ?? 0)
      document.documentElement.style.setProperty('--vieport-height', `${res}px`)
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(handleResize);
    if (header) {
      observer.observe(header);
    }


  }, [])

  useEffect(()=>{
      if (localStorage.getItem("token")) {
         AuthStore.checkAuth();
  }
  })

  return (
    // TODO Оптимизировать
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={!AuthStore.isAuth && <Navigate to={'/auth'} /> }>
          <Route
              path="/"
              element={<HomeScreen />}
          />
        </Route>
        <Route path={'/auth'} element={AuthStore.isAuth && <Navigate to={'/'} /> }>
          <Route
              path="/auth"
              element={<StartScreen />}
          />
          <Route
              path="/auth/sign-in"
              element={<AuthScreen />}
          />
          <Route 
              path="/auth/sign-up" 
              element={<RegistrationScreen />}>
          </Route>
        </Route>

        <Route path="*" element={<div>404... not found </div>} />
      </Routes>
    </BrowserRouter>
  );
});
