import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../../layouts/DashboardHeader";
import Sidebar from "../../layouts/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config";
import NotFound from "../../pages/NotFound/NotFound";

type Props = {};

const DashboardTemplate = (props: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.userReducer);
  if (!userInfo) return <NotFound></NotFound>;
  return (
    <div className="dashboard">
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
