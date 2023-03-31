import React from "react";
import PostCategory from "../Post/PostCategory";
import PostImage from "../Post/PostImage";
import PostMeta from "../Post/PostMeta";
import PostTitle from "../Post/PostTitle";

type Props = {};

const PostCard = (props: Props) => {
  return (
    <div className="post-card">
      <PostImage
        className="post"
        src="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
        alt="unsplash"
      />
      <PostCategory className="primary mb">Kiến thức</PostCategory>

      <PostTitle className="normal black">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta date="Mar 23" author="Andiez Le"></PostMeta>
    </div>
  );
};

export default PostCard;
