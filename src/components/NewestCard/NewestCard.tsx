import React from "react";
import { PostCategory, PostImage, PostMeta, PostTitle } from "../Post";

type Props = {};

const NewstCard = (props: Props) => {
  return (
    <div className="newest-card">
      <PostImage
        className="newest"
        src="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80"
        alt="unsplash"
        to="/"
      />
      <div className="newest-card-content">
        <PostCategory className="secondary mb">Kiến thức</PostCategory>
        <PostTitle className="normal black">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
        <PostMeta date="Mar 23" author="Andiez Le"></PostMeta>
      </div>
    </div>
  );
};

export default NewstCard;
