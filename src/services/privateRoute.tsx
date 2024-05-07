import React from 'react';
import { Navigate } from "react-router-dom";
import AuthStore from "./store";
import { observer } from "mobx-react-lite";

const PrivateRoute = (props : any) => {
  // if (AuthStore.isLoadingAuth) {
  //   console.log("Checking auth...");
  //   return <div>Checking auth...</div>;
  // }
  if (AuthStore.isAuth) {
    return <Navigate to="/homeScreen" replace={true} />;
  } else {
    return <Navigate to="/auth" />;
  }
};

export default observer(PrivateRoute);
