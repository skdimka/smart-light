import React from "react";
import {FieldValues, useForm} from "react-hook-form";
import { Link } from "react-router-dom";
import { Header } from "../components/headerStart";
import AuthStore from "../../services/store";
import { observer } from "mobx-react-lite";

import { PasswordInput } from "../components/passwordInput";
import { EmailInput } from "../components/emailInput";

const AuthScreen : React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data: FieldValues) => {

    AuthStore.login(data.email, data.password);
    console.log("email: ", data.email);
    console.log("password: ", data.password);
  };

  return (
    <>
      <div className="container">
        <Header text={"Авторизация"} />
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputGroup">

              {/* <EmailInput/>
              <PasswordInput /> */}

              {/* TODO сделать паттерн константой */}
               <input
                {...register("email", {
                  required: "Email is require field!",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                })}
                placeholder="Email"
                className="input__default"
              />

              <input
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 5,
                    message: "Password must have at least 8 characters",
                  },
                })}
                placeholder="Пароль"
                type="password"
                className="input__default"
                autoComplete="on"
              />

            </div>
            <div className="buttonGroup">
              <button className="btn__primary">
                {/* disabled={!isDirty || !isValid} */}
                Войти
              </button>
            </div>
          </form>
        </section>
        <footer>
          <div className="footer_text">Нет аккаунта?</div>
          <Link to={"/auth/sign-up"} className="btn__link">
            Зарегистрируйтесь
          </Link>
          <br></br>
          <Link to={"/"} className="btn__link">
            homescrin
          </Link>
        </footer>
      </div>
    </>
  );
};

export default observer(AuthScreen);
