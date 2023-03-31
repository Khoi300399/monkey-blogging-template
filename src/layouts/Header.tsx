import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../components/Button";
import { IconSearch } from "../components/Icon";
import { RootState } from "../redux/config";

type Props = {};
const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/",
    title: "Blog",
  },
  {
    url: "/",
    title: "Contact",
  },
];
const Header = (props: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.userReducer);
  function getLastName(name: string | null | undefined) {
    if (!name) return "User";
    const length = name.split(" ").length;
    return name.split(" ")[length - 1];
  }
  return (
    <div className="container">
      <div className="header">
        <Link to="/">
          <img srcSet="./img/logo.png 2x" alt="logo" className="header-logo" />
        </Link>

        <ul className="header-menu">
          {menuLinks.map(({ title, url }, index) => (
            <li className="menu-item" key={title}>
              <NavLink to={url}>{title}</NavLink>
            </li>
          ))}
        </ul>
        <div className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search posts ..."
          />
          <span className="search-icon">
            <IconSearch />
          </span>
        </div>
        {!userInfo ? (
          <Button
            type="button"
            style={{ maxWidth: "150px" }}
            href="/sign-up"
            className="button header-button "
          >
            Sign Up
          </Button>
        ) : (
          <div className="header-auth">
            <span className="text-auth">Welcome back, </span>
            <span className="text-primary">{getLastName(userInfo?.name)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
