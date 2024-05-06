import React, { useState } from "react";
import { Field } from "./field";

export const PasswordInput: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    setPassword(value);
    if (value.length < 5) {
      setError("Пароль должен содержать как минимум 5 символов");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <Field
        value={password}
        label="Пароль"
        onChange={handleChange}
        error={error}
        type="password"
        name="password"
        attrs={{}}
        className="input__default"
        required
      />
    </div>
  );
};