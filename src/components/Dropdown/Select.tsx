import React from "react";
import { useDropdown } from "./DropdownContext";

type Props = {
  placeholder: string;
};

const Select = ({ placeholder = "" }: Props) => {
  const { toggle, show } = useDropdown();
  return (
    <div className="select" onClick={toggle}>
      <span>{placeholder}</span>
      {show ? (
        <span className="select-icon">
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
              d="M5 15l7-7 7 7"
            />
          </svg>
        </span>
      ) : (
        <span className="select-icon">
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default Select;
