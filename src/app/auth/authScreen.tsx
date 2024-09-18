import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "../components/headerTemplate";
import AuthStore from "../store/store";
import { observer } from "mobx-react-lite";
import { Field } from "../components/field";
import { isValidInput } from "../utils/isValidInput";
import Loader from "../components/loader";

type FieldValues = {
  email: string;
  password: string;
};

const AuthScreen: React.FC = () => {
  const {
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
    control,
  } = useForm<FieldValues>({ mode: "onChange" });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const onSubmit = async (data: FieldValues) => {
    setLoader(true);
    const error = await AuthStore.login(data.email, data.password);
    if (error) {
      setErrorMessage("Неверный логин или пароль");
    } else {
      setErrorMessage(null);
      reset();
    }
    setLoader(false);
  };

  const handleInputChange = () => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  return (
    <>
      <div className="container light">
        {loader ? (
          <Loader />
        ) : (
          <>
            <Header text={"Авторизация"} />
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div className="input-group">
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: true, validate: isValidInput.email }}
                  render={({ field }) => (
                    <Field
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange();
                      }}
                      label="Email"
                      className={`input__default ${
                        errors.email || errorMessage ? "input__error" : ""
                      }`}
                      type="email"
                    />
                  )}
                />

                {errors.email && (
                  <span className="error-message">Некорректный email</span>
                )}

                <Controller
                  control={control}
                  name="password"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Field
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleInputChange();
                      }}
                      label="Пароль"
                      className={`input__default ${
                        errorMessage ? "input__error" : ""
                      }`}
                      type="password"
                    />
                  )}
                />

                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
              </div>

              <div className="button-group">
                <button
                  className="btn__primary"
                  disabled={!isDirty || !isValid}
                >
                  Войти
                </button>
              </div>
            </form>
            <footer>
              <div className="footer-text">Нет аккаунта?</div>
              <Link to={"/auth/sign-up"} className="btn__link">
                Зарегистрируйтесь
              </Link>
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default observer(AuthScreen);
