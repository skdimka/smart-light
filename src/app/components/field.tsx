import React, { useCallback, useState } from "react";
import classNames from "classnames";
import { uniqueId } from "lodash-es";
import { ReactSVG } from "react-svg";

interface FieldProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  name?: string;
  attrs?: any;
  className?: string;
  required?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  value = '',
  label,
  onChange,
  error,
  type = "text",
  name,
  attrs,
  className,
  required,
}) => {
  const isPasswordType = type === "password";

  const [_type, setType] = useState(type);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  }, [onChange, type]);

  const handleTypeChange = useCallback(() => {
    setType(_type === "password" || "confirm_password" ? "text" : "password");
  }, [_type]);

  const inputId = uniqueId("input_");


  return (
    <div className={classNames("field", {  error })} {...attrs}>
      <div className={"field__inner"}>
        <input
          id={inputId}
          placeholder={label}
          name={name}
          type={_type}
          onChange={handleChange}
          value={value}
          required={required}
          className={className}
          autoComplete={type === 'password' ? 'current-password' : type === 'email' ? 'email' : undefined}
        />

        {isPasswordType ? (
          <a
            role={"button"}
            className={"field-switch"}
            onClick={handleTypeChange}
          >
            <ReactSVG src="/svg/eyeClose.svg" />
          </a>
        ) : undefined}
      </div>
    </div>
  );
};
