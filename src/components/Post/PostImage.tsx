import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  src: string;
  alt?: string;
  to?: string;
  className: string;
};

const PostImage = ({ src, alt, className, to }: Props) => {
  if (to)
    return (
      <NavLink to={to} style={{ display: "block" }}>
        <div className={`post-image ${className}`}>
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </NavLink>
    );
  return (
    <div className={`post-image ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
};

export default PostImage;
