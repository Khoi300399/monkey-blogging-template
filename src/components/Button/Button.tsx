import React from "react";
import { NavLink } from "react-router-dom";
import { Loading } from "../Loading";
type ButtonType = "button" | "submit" | "reset" | undefined;
type Props = {
  children: React.ReactNode;
  className: string;
  type?: ButtonType;
  isLoading?: boolean;
  disabled?: boolean;
  height?: number;
  href?: string;
  style?: Object;
};

const Button = ({
  children,
  className = "button",
  type = "button",
  isLoading,
  disabled,
  href,
  style,
  ...props
}: Props) => {
  const child: React.ReactNode = !!isLoading ? <Loading /> : children;

  if (href !== "" && typeof href === "string") {
    return (
      <NavLink style={style} className={className} to={href}>
        {child}
      </NavLink>
    );
  }
  return (
    <button type={type} disabled={disabled} className={className} {...props}>
      {child}
    </button>
  );
};

export default Button;
