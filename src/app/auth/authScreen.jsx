import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Header } from "../components/header";
// import { IAuth } from "./auth.interface";

export const AuthScreen = () => {
  // useForm<IAuth>()
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  // SubmitHandler<IAuth>
  const onSubmit = (data) => {
    console.log("Email: ", data.email);
    console.log("Password: ", data.password);
    reset();
  };

  return (
    <>
      <div className="container">
        <Header text={"Авторизация"} />
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputGroup">
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
              />
            </div>
            <div className="buttonGroup">
              <button className="btn__primary" disabled={!isDirty || !isValid}>
                Войти
              </button>
            </div>
          </form>
        </section>
        <footer>
          <div className="footer_text">Нет аккаунта?</div>
          <Link to={"/registrationScreen"} className="btn__link">
            Зарегистрируйтесь
          </Link>
        </footer>
      </div>
    </>
  );
};
