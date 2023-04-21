import React, { memo } from "react";
import { useField } from "formik";

type Props = {
  children: React.ReactNode;
  checked: boolean;
  name: string;
  value: string | number;
  type: string;
};

const Radio = ({ children, checked, ...props }: Props) => {
  const [field] = useField(props);
  return (
    <div className="radio">
      <label>
        <input {...props} {...field} />
        <div className="radio-container">
          <div className={`content ${checked ? "bg-green" : "bg-gray"}`}>
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

export default memo(Radio);
