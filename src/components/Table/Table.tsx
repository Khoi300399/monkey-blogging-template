import React from "react";

type Props = {
  children: React.ReactNode;
};

const Table = ({ children }: Props) => {
  return (
    <div className="table">
      <table>{children}</table>
    </div>
  );
};

export default Table;
