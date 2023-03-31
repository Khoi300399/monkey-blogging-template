import React from "react";
import PostCategory from "../Post/PostCategory";

type Props = {};

const PostCard = (props: Props) => {
  return (
    <div className="post-card">
      <div className="post-card-image">
        <img
          src="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
          alt=""
        />
      </div>
      <PostCategory>Kiến thức</PostCategory>

      <h3 className="post-card-title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </h3>
      <div className="post-card-info">
        <span className="post-card-time">Mar 23</span>
        <span className="post-card-dot"></span>
        <span className="post-card-author">Andiez Le</span>
      </div>
    </div>
  );
};

export default PostCard;
