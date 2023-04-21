import { useField } from "formik";
import React from "react";

type Props = {
  children: React.ReactNode;
  checked: boolean;
  name: string;
};

const CheckBox = ({ checked, children, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <div className="checkbox">
      <label>
        <input
          //   onChange={() => {}}
          checked={checked}
          type="checkbox"
          {...props}
          {...field}
        />
        <div className="checkbox-container">
          <div className={`content ${checked ? "checked" : "no-checked"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span>{children}</span>
        </div>
      </label>
    </div>
  );
};

export default CheckBox;
