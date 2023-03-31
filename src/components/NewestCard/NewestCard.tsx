import React from "react";
import { PostCategory } from "../Post";

type Props = {};

const NewstCard = (props: Props) => {
  return (
    <div className="newest-card">
      <div className="newest-card-image">
        <img
          src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
          alt=""
        />
      </div>
      <div className="newest-card-content">
        <PostCategory className="post-category-secondary">
          Kiến thức
        </PostCategory>

        <h3 className="newest-card-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3>
        <div className="newest-card-info">
          <span className="newest-card-time">Mar 23</span>
          <span className="newest-card-dot"></span>
          <span className="newest-card-author">Andiez Le</span>
        </div>
      </div>
    </div>
  );
};

export default NewstCard;
