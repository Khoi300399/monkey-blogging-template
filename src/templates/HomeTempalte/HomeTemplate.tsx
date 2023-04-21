import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/Header";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <div className="home wrapper">
      <Header></Header>
      <Outlet />
    </div>
  );
};

export default HomeTemplate;
