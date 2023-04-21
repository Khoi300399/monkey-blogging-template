import { memo } from "react";
import PostCategory from "../Post/PostCategory";
import PostImage from "../Post/PostImage";
import PostMeta from "../Post/PostMeta";
import PostTitle from "../Post/PostTitle";
import { PostType } from "../../redux/postReducer/postReducer";

type Props = {
  post: PostType;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="post-card">
      <PostImage
        to={`/post-detail?id=${post.id}`}
        className="post"
        src={post.image || ""}
        alt="unsplash"
      />
      <PostCategory className="primary mb">{post.category?.name}</PostCategory>

      <PostTitle to={`/post-detail?id=${post.id}`} className="normal black">
        {post.title}
      </PostTitle>
      <PostMeta date={post.createAt} authors={post.author}></PostMeta>
    </div>
  );
};

export default memo(PostCard);
