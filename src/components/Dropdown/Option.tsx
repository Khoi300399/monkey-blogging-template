import React from "react";
import { useDropdown } from "./DropdownContext";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const Option = ({ children, onClick }: Props) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };

  return (
    <div className="option" onClick={handleClick}>
      {children}
    </div>
  );
};

export default Option;
