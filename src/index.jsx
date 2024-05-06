import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthScreen } from "./app/auth/authScreen";
import { HomeScreen } from "./app/core/homeScreen";
import { RegistrationScreen } from "./app/auth/registrationScreen";
import { StartScreen } from "./app/auth/startScreen";
import "./styles/App.scss";
import App from "./app/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartScreen />,
  },
  {
    path: "/authScreen",
    element: <AuthScreen />,
  },
  {
    path: "/registrationScreen",
    element: <RegistrationScreen />,
  },
  {
    path: "/homeScreen",
    element: <HomeScreen />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
);
