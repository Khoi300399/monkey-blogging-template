import React from "react";
import { useField } from "formik";

type Props = {
  disabled?: boolean;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  value?: string;
};

const Input = ({ className = "", children, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div className="relative">
        <input
          className={`input ${children ? "input-active-eye" : ""} ${
            meta.touched && meta.error ? "input-error" : ""
          }`}
          {...props}
          {...field}
        />
        {children}
      </div>
      {meta.touched && meta.error ? (
        <span className="error-massage">
          <i className="fa-solid fa-circle-exclamation"></i> {meta.error}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
