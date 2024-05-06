import React, { useState, forwardRef } from "react";
import { Field } from "./field";

export const EmailInput: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (value: string) => {
    setEmail(value);
    if (!isValidEmail(value)) {
      setError("Введите корректный email");
    } else {
      setError("");
    }
  };

  const isValidEmail = (value: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(value);
  };

  return (
    <div>
      <Field
        value={email}
        label="Email"
        onChange={handleChange}
        error={error}
        type="email"
        name="email"
        required
        attrs={{}}
        className="input__default"
      />
    </div>
  );
};


