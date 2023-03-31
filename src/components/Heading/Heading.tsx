import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Heading = ({ children }: Props) => {
  return (
    <>
      <h2 className="heading">{children}</h2>
    </>
  );
};

export default Heading;
