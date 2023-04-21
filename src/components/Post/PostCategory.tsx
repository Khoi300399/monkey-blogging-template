import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PostCategory = ({ children, className = "primary" }: Props) => {
  return (
    <Link to="" className={`post-category ${className}`}>
      {children}
    </Link>
  );
};

export default PostCategory;
