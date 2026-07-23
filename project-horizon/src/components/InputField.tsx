import type { ChangeEvent } from "react";

export interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function InputField({
  id,
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={error ? "error" : ""}
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default InputField;
