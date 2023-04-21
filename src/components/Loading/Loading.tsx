import React from "react";

type Props = {
  className?: string;
};

const Loading = ({ className }: Props) => {
  return <div className={`loading ${className}`}></div>;
};

export default Loading;
