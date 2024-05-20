import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "./styles/App.scss";
import AuthStore from "./app/store/store";

(async () => {
  await AuthStore.checkAuth();

  const rootElement = document.getElementById("root");
  if ( rootElement ) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
  } else {
    console.error("Not found")
  }
})();