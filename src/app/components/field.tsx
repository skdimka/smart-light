import React, { useCallback, useRef, useState } from "react";
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
  value,
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

  const handleChange = useCallback((e) => {
    onChange(e.target.value);
  }, []);

  const handleTypeChange = useCallback(() => {
    setType(_type === "password" ? "text" : "password");
  }, [_type]);

  const inputId = uniqueId("input_");

  return (
    <div className={classNames("field", { error })} {...attrs}>
      <div className={"field__inner"}>
        {/* <label htmlFor={inputId}>{label}</label> */}
        <input
          id={inputId}
          placeholder={label}
          name={name}
          type={_type}
          onChange={handleChange}
          value={value}
          required={required}
          className={className}
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

      {error ? <div className={"field__error"}>{error}</div> : undefined}
    </div>
  );
};
