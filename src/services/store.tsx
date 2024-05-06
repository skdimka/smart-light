import { makeAutoObservable } from "mobx";
import { AuthService } from "./api.auth";

class AuthStore {
  // navigate = useNavigate();
  isAuth : boolean = false;
  isAuthInProgress : boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(email : string, password : string) {
    this.isAuthInProgress = true;
    // console.log('я тут');
    try {
      const resp = await AuthService.login(email, password);
      localStorage.setItem("token", resp.data.data);
      console.log("Логин, кладу токен в локал:", resp.data.data);
      this.isAuth = true;
    } catch (err) {
      console.log("login error при авторизации");
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async checkAuth() {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.refresh();
      localStorage.setItem("token", resp.data.data);
      this.isAuth = true;
      //   redirect("/HomeScreen");
    } catch (err) {
      console.log("login error при проверки авторизации");
    } finally {
      this.isAuthInProgress = false;
    }
  }

  async logout() {
    this.isAuthInProgress = true;
    try {
      await AuthService.logout();
      this.isAuth = false;
      localStorage.removeItem("token");
    } catch (err) {
      console.log("logout error при логаут");
    } finally {
      this.isAuthInProgress = false;
    }
  }

  // при регистрации нужно сохранить токен
}

export default new AuthStore();
