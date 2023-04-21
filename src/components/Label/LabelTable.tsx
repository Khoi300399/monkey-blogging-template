import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const LabelTable = ({ children, className = "default" }: Props) => {
  return (
    <>
      <span className={`labelTable ${className}`}>{children}</span>
    </>
  );
};

export default LabelTable;
