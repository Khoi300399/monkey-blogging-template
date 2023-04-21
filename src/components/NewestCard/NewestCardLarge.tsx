import { memo } from "react";
import { PostCategory, PostImage, PostMeta, PostTitle } from "../Post";
import { PostType } from "../../redux/postReducer/postReducer";

type Props = {
  data: PostType;
};

const NewstCardLarge = ({ data }: Props) => {
  const url = "/post-detail?id=" + data?.id;
  return (
    <div>
      <PostImage
        to={`/post-detail?id=${data?.id || ""}`}
        className="newest-large"
        src={data?.image || ""}
        alt="unsplash"
      />
      <PostCategory className="primary mb">
        {data?.category?.name || ""}
      </PostCategory>

      <PostTitle to={url} className="big black">
        {data?.title}
      </PostTitle>
      <PostMeta date={data?.createAt} authors={data?.author}></PostMeta>
    </div>
  );
};

export default memo(NewstCardLarge);
