import React from "react";
import {Controller, useForm} from "react-hook-form";
import { Link } from "react-router-dom";
import { Header } from "../components/headerScreen";
import AuthStore from "../../services/store";
import { observer } from "mobx-react-lite";
import { Field } from "../components/field";
import { isValidInput } from "../components/isValidInput";

type FieldValues = {
  email: string;
  password: string;
}

const AuthScreen : React.FC = () => {
  const {
    handleSubmit,
    formState: { isDirty, isValid, errors },
    reset,
    control
  } = useForm<FieldValues>({ mode: "onChange" });

  const onSubmit = (data: FieldValues) => {
    AuthStore.login(data.email, data.password);
    reset();
  };

  return (
    <>
      <div className="container light">
        <Header text={"Авторизация"} />
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="inputGroup">

              <Controller 
                control={control} 
                name="email"
                rules={{ required: true, validate: isValidInput.email }} 
                render= {({field}) => 
                  <Field 
                    value={field.value} 
                    onChange={field.onChange} 
                    label="Email" 
                    className={`input__default ${errors.email ? "input__error" : ""}`} 
                    type="email"
                  />} 
                />

              {errors.email && <span className="error-message">Некорректный email</span>}  

              <Controller 
                control={control} 
                name="password"
                rules={{ required: true }}  
                render= {({field}) => 
                  <Field 
                    value={field.value}
                    onChange={field.onChange} 
                    label="Пароль" 
                    className="input__default" 
                    type="password"
                  />}
                />
            </div>

            <div className="buttonGroup">
              <button 
                className="btn__primary"
                disabled={!isDirty || !isValid}
                >
                Войти
              </button>
              
            </div>
            
          </form>
        <footer>
          <div className="footer_text">Нет аккаунта?</div>
          <Link to={"/auth/sign-up"} className="btn__link">
            Зарегистрируйтесь
          </Link>
        </footer>
      </div>
    </>
  );
};

export default observer(AuthScreen);