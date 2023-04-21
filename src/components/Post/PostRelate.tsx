import React, { useEffect } from "react";
import { PostCard } from "../PostCard";
import { useDispatch } from "react-redux";
import { DispathType, RootState } from "../../redux/config";
import { getPostRelateApi } from "../../redux/postReducer/postReducer";
import { useSelector } from "react-redux";

type Props = {
  categoryId: string;
};

const PostRelate = ({ categoryId }: Props) => {
  const dispatch = useDispatch<DispathType>();
  const { postRelate } = useSelector((state: RootState) => state.postReducer);

  useEffect(() => {
    dispatch(getPostRelateApi(categoryId));
  }, [categoryId, dispatch]);
  return (
    <div className="grid-layout grid-layout-primary">
      {postRelate.map((post) => {
        return <PostCard key={post.id} post={post}></PostCard>;
      })}
    </div>
  );
};

export default PostRelate;
