import React from "react";
import { PostCategory } from "../Post";

type Props = {};

const FeatureCard = (props: Props) => {
  return (
    <div className="feature-card">
      <img
        src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80"
        alt="unsplash"
        className="feature-card-image"
      />
      <div className="feature-card-overlay"></div>
      <div className="feature-card-content">
        <div className="feature-card-top">
          <PostCategory>Kiến thức</PostCategory>
          <div className="feature-card-info">
            <span className="feature-card-time">Mar 23</span>
            <span className="feature-card-dot"></span>
            <span className="feature-card-author">Andiez Le</span>
          </div>
        </div>
        <h3 className="post-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </h3>
      </div>
    </div>
  );
};

export default FeatureCard;
