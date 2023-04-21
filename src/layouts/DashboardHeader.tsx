import React from "react";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config";

type Props = {};

const DashboardHeader = (props: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.userReducer);

  return (
    <div className="dashboardHeader">
      <Button
        type="button"
        style={{ maxWidth: "200px" }}
        href="/manage/create-post"
        className="button header-button "
      >
        Write new post
      </Button>
      <div className="dashboardHeader-avatar">
        <Link to={`/profile?id=${userInfo.id}`}>
          <img src={userInfo?.image || ""} alt="avatar" />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
