import React from "react";
import { DropdownProvider } from "./DropdownContext";

type Props = {
  placeholder?: string;
  children: React.ReactNode;
};

const Dropdown = ({ children, ...props }: Props) => {
  return (
    <DropdownProvider {...props}>
      <div className="dropdown">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
