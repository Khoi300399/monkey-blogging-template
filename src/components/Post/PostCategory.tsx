import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
  to?: string;
};

const PostCategory = ({ children, className = "primary", to = "/" }: Props) => {
  return (
    <div className={`post-category ${className}`}>
      <NavLink to={to}>{children}</NavLink>
    </div>
  );
};

export default PostCategory;
