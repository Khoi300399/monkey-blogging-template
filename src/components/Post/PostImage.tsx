import React from "react";
import { Link } from "react-router-dom";

type Props = {
  src: string;
  alt?: string;
  to?: string;
  className: string;
};

const PostImage = ({ src, alt, className, to }: Props) => {
  if (to)
    return (
      <Link
        className={`post-image ${className}`}
        to={to}
        style={{ display: "block" }}
      >
        <img src={src} alt={alt} loading="lazy" />
      </Link>
    );
  return (
    <div className={`post-image ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
};

export default PostImage;
