import React from "react";
import { useDropdown } from "./DropdownContext";

type Props = {
  children: React.ReactNode;
};

const List = ({ children }: Props) => {
  const { show } = useDropdown();
  return <>{show && <div className="list">{children}</div>}</>;
};

export default List;
