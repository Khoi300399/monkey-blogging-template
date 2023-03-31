import React from "react";
import { PostCategory, PostImage, PostMeta, PostTitle } from "../Post";

type Props = {};

const NewstCardLarge = (props: Props) => {
  return (
    <div>
      <PostImage
        className="newest-large"
        src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
        alt="unsplash"
      />
      <PostCategory className="primary mb">Kiến thức</PostCategory>

      <PostTitle className="big black">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta date="Mar 23" author="Andiez Le"></PostMeta>
    </div>
  );
};

export default NewstCardLarge;
