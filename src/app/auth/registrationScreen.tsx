import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Header from "../components/headerTemplate";
import { Field } from "../components/field";
import { isValidInput } from "../utils/isValidInput";
import { action } from "mobx";
import AuthStore  from "../store/store"

type FieldValues = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const RegistrationScreen : React.FC = () => {
  const {
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
    control,
    getValues
  } = useForm<FieldValues>({ mode: "onChange" });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FieldValues) => {
    const error = await AuthStore.registration(data.name, data.email, data.password);
    if (error) {
      setErrorMessage("Ошибка регистрации");
    } else {
      setErrorMessage(null);
      reset();
    }
  };

  action(() => {
    AuthStore.registrationSuccess = false;
  })();

  return (
    <>
      <div className="container light">
        <Header text={"Регистрация"} />
        
          <form onSubmit={handleSubmit(onSubmit)} className={"form"}>
            <div className="inputGroup">

            <Controller 
                control={control} 
                name="name" 
                rules={{ required: true , validate: isValidInput.name}}
                render= {({field}) => 
                  <Field 
                    value={field.value} 
                    onChange={field.onChange} 
                    label="Имя" 
                    className={`input__default ${errors.name || errorMessage ? "input__error" : ""}`}
                    type="name"
                  />} 
                />
            {errors.name && <span className="error-message">Минимальная длинна - 2</span>}

            <Controller 
                control={control} 
                name="email" 
                rules={{ required: true, validate: isValidInput.email }}
                render= {({field}) => 
                  <Field 
                    value={field.value} 
                    onChange={field.onChange} 
                    label="Email" 
                    className={`input__default ${errors.email || errorMessage ? "input__error" : "" }`}
                    type="email"
                  />} 
                />
                
            {errors.email && <span className="error-message">Некорректный email</span>}

            <Controller 
                control={control} 
                name="password" 
                rules={{ required: true, validate: isValidInput.password }}
                render= {({field}) => 
                  <Field 
                    value={field.value}
                    onChange={field.onChange} 
                    label="Пароль" 
                    className={`input__default ${errors.password || errorMessage ? "input__error" : ""}`}
                    type="password"
                  />}
                 />

            {errors.password && <span className="error-message">Минимальная длинна - 5</span>}

            <Controller 
                control={control} 
                name="confirm_password"
                rules={{ required: true, validate: value => isValidInput.passwordsMatch(value, getValues().password) }} 
                render= {({field}) => 
                  <Field 
                    value={field.value}
                    onChange={field.onChange} 
                    label="Повторите пароль" 
                    className={`input__default ${errors.confirm_password || errorMessage ? "input__error" : ""}`} 
                    type="password"
                  />}
                 />

            {errors.confirm_password && <span className="error-message">Пароли не совпадают</span>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            </div>

            <div className="buttonGroup">

              <div className="desc__text">
                Нажимая на кнопку, я принимаю
                <a href="" className="desc__text-a">
                  Пользовательское соглашение
                </a>
                и соглашаюсь
                <a href="" className="desc__text-a">
                  с Политикой конфиденциальности
                </a>
              </div>

              <button className="btn__primary" disabled={!isDirty || !isValid}>
                Зарегистрироваться
              </button>
            </div>

          </form>

        <footer>
          <div className="footer-text">Уже есть аккаунт?</div>
          <Link to={"/auth/sign-in"} className="btn__link">
            Войдите
          </Link>
        </footer>
      </div>
    </>
  );
};