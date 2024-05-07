import React from "react";
import { makeAutoObservable } from "mobx";
import { AuthService } from "./api.auth";
class AuthStore {
  isAuth : boolean = false;
  isAuthInProgress : boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(email : string, password : string) {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.login(email, password);
      localStorage.setItem("token", resp.data.data);
      console.log("Логин, кладу токен в локал:", resp.data.data);
      this.setAuth(true);
    } catch (err) {
      console.error("login error при авторизации",err);
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async checkAuth() {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.refresh();
      localStorage.setItem("token", resp.data.data);
      this.setAuth(true);
      console.log("checkAuth: ", this.isAuth)
    } catch (err) {
      console.error("login error при проверки авторизации",err);
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async logout() {
    this.isAuthInProgress = true;
    try {
      await AuthService.logout();
      this.setAuth(false);
      localStorage.removeItem("token");
    } catch (err) {
      console.error("logout error при логаут",err);
    } finally {
      this.isAuthInProgress = false;
    }
  }

  setAuth(value : boolean) {
    this.isAuth = value;
  }
}

export default new AuthStore();
