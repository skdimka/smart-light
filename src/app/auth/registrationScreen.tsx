import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Header } from "../components/headerStart";
import { AuthService } from "../../services/api.auth";

type FieldValues = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export const RegistrationScreen : React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
    watch,
  } = useForm<FieldValues>({ mode: "onChange" });

  const onSubmit = (data: FieldValues) => {
    AuthService.registration(data.name, data.email, data.password);
    reset();
  };

  return (
    <>
      <div className="container">
        <Header text={"Регистрация"} />
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputGroup">
              <input
                {...register("name", {
                  required: "Name is require field!",
                })}
                placeholder="Имя"
                className="input__default"
              />
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
                  // TODO ошибка ts
                  minLength: {
                    value: 5,
                  },
                })}
                placeholder="Пароль"
                type="password"
                className="input__default"
              />
              <input
                {...register("confirm_password", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                placeholder="Повторите пароль"
                type="password"
                className="input__default"
              />
              {/* Подсветить инпут */}
              {/* Вывести ошибку "Пароли не совпадают" */}
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
        </section>
        <footer>
          <div className="footer_text">Уже есть аккаунт?</div>
          <Link to={"/authScreen"} className="btn__link">
            Войдите
          </Link>
        </footer>
      </div>
    </>
  );
};
