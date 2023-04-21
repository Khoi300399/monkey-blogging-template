import React from "react";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
  to?: string | undefined;
};

const PostTitle = ({ children, className = "big white", to }: Props) => {
  if (to)
    return (
      <>
        <Link to={to} className={`post-title ${className}`}>
          <h3> {children}</h3>
        </Link>
      </>
    );
  return <h3 className={`post-title ${className}`}> {children}</h3>;
};

export default PostTitle;
