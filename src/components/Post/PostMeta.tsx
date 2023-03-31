import React from "react";

type Props = {
  date: string;
  author: string;
  className?: string;
};

const PostMeta = ({
  date = "Mar 23",
  author = "Andiez Le",
  className = "black",
}: Props) => {
  return (
    <div className={`post-meta ${className}`}>
      <span className="time">{date}</span>
      <span className="dot"></span>
      <span className="author">{author}</span>
    </div>
  );
};

export default PostMeta;
