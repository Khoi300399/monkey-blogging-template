import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PostCategory = ({
  children,
  className = "post-category-primary",
}: Props) => {
  return <div className={`post-category ${className}`}>{children}</div>;
};

export default PostCategory;
