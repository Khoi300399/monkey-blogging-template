import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
  to?: string;
};

const PostTitle = ({ children, className = "big white", to = "/" }: Props) => {
  return (
    <>
      <h3 className={`post-title ${className}`}>
        <NavLink to={to}>{children}</NavLink>
      </h3>
    </>
  );
};

export default PostTitle;
