import React from "react";

type Props = {
  children: React.ReactNode;
};

const Tag = ({ children }: Props) => {
  return <span className="tag">{children}</span>;
};

export default Tag;
