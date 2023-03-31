import React from "react";
import { PostCategory, PostImage, PostMeta, PostTitle } from "../Post";

type Props = {};

const FeatureCard = (props: Props) => {
  return (
    <div className="feature-card">
      <PostImage
        className="feature"
        src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80"
        alt="unsplash"
      />
      <div className="feature-card-overlay"></div>
      <div className="feature-card-content">
        <div className="feature-card-top">
          <PostCategory>Kiến thức</PostCategory>
          <PostMeta
            className="white"
            date="Mar 23"
            author="Andiez Le"
          ></PostMeta>
        </div>
        <PostTitle>
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
      </div>
    </div>
  );
};

export default FeatureCard;
