import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import AuthStore from "../services/store";
import "../styles/App.scss";
import {StartScreen} from "./pages/startScreen";
import AuthScreen from "./auth/authScreen";
import {RegistrationScreen} from "./auth/registrationScreen";
import {RegistrationSuccess} from "./pages/registrationSuccess";
import {HomeScreen} from "./pages/homeScreen";
import {AddDevice} from "./pages/addDeviceScreen";
import { AddDeviceBluetooth } from "./pages/вluetoothOn";
import { AddDeviceSuccess } from "./pages/addDeviceSuccess";

export const App = observer(() => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={!AuthStore.isAuth && <Navigate to={'/auth'} /> }>
          <Route
              path="/"
              element={<HomeScreen />}/>

          <Route  
                path="/registration-success" 
                element={<RegistrationSuccess />}/>

          <Route  
                path="/add-device" 
                element={<AddDevice />}/>


          <Route 
                path="/add-device-bluetooth" 
                element={AuthStore.isCompleteAddDevice ? <Navigate to="/add-device-success" /> : <AddDeviceBluetooth />} />
          
          <Route 
                path="/add-device-success" 
                element={<AddDeviceSuccess />} />
        
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
        </Route>

        <Route path={'/auth'} element={AuthStore.registrationSuccess && <Navigate to={'/registration-success'} /> }>
          <Route 
              path="/auth/sign-up" 
              element={<RegistrationScreen />}/>
        </Route>

        <Route path="*" element={<div>404... not found </div>} />
      </Routes>
    </BrowserRouter>
  );
});
