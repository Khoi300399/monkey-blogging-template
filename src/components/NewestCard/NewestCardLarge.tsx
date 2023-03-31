import React from "react";

type Props = {};

const NewstCardLarge = (props: Props) => {
  return (
    <div className="newest-card-large">
      <div className="newest-card-large-image">
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
          alt=""
        />
      </div>
      <div className="newest-card-large-category">Kiến thức</div>
      <h3 className="newest-card-large-title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </h3>
      <div className="newest-card-large-info">
        <span className="newest-card-large-time">Mar 23</span>
        <span className="newest-card-large-dot"></span>
        <span className="newest-card-large-author">Andiez Le</span>
      </div>
    </div>
  );
};

export default NewstCardLarge;
