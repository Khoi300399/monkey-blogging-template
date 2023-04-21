import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFound = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <div className="content">
        <img src="/img/404.png" alt="notfound" className="image" />
        <h1 className="heading">404 - Looks like you're lost.</h1>
        <p className="description">
          Maybe this page used to exist or you just spelled something wrong.
          Chances are your spelled something wrong, so can you double check the
          URL?
        </p>
        <button onClick={() => navigate("/")} className="back">
          Go home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
