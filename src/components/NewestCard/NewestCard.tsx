import { memo } from "react";
import { PostCategory, PostImage, PostMeta, PostTitle } from "../Post";
import { PostType } from "../../redux/postReducer/postReducer";

type Props = {
  data: PostType;
  to?: string;
};

const NewstCard = ({ data }: Props) => {
  return (
    <div className="newest-card">
      <PostImage
        className="newest"
        src={data.image || ""}
        alt="unsplash"
        to={`/post-detail?id=${data.id}`}
      />
      <div className="newest-card-content">
        <PostCategory className="secondary mb">
          {data.category?.name}
        </PostCategory>
        <PostTitle to={`/post-detail?id=${data.id}`} className="normal black">
          {data.title}
        </PostTitle>
        <PostMeta date={data.createAt} authors={data.author}></PostMeta>
      </div>
    </div>
  );
};

export default memo(NewstCard);
