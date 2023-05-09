import { ChangeEvent } from "react";

interface IInputProps {
  label: string;
  className: string;
  hasError: boolean;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  error: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  className,
  hasError,
  type,
  placeholder,
  name,
  value,
  error,
  onChange,
}: IInputProps) {
  let inputClassName = className;
  if (hasError != undefined) {
    inputClassName += hasError ? " is-invalid" : " is-valid";
  }
  return (
    <>
      <label>{label}</label>
      <input
        className={inputClassName}
        type={type || "text"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {hasError && <div className="invalid-feedback">{error}</div>}
    </>
  );
}
