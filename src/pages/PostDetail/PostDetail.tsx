import { useEffect } from "react";
import { Heading } from "../../components/Heading";
import {
  PostCategory,
  PostImage,
  PostMeta,
  PostRelate,
  PostTitle,
} from "../../components/Post";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DispathType, RootState } from "../../redux/config";
import { useDispatch } from "react-redux";
import { getPostsApi } from "../../redux/postReducer/postReducer";

type Props = {};

const PostDetail = (props: Props) => {
  const dispatch = useDispatch<DispathType>();

  const [params] = useSearchParams();
  const postId = params.get("id");
  const { post } = useSelector((state: RootState) => state.postReducer);

  useEffect(() => {
    dispatch(getPostsApi(postId));
  }, [dispatch, postId]);

  return (
    <div className="detail">
      <div className="container">
        <div className="detail-header">
          <PostImage
            src={post?.image || ""}
            className="newest-large"
          ></PostImage>
          <div className="detail-info">
            <PostCategory className="primary mb">
              {post?.category?.name}
            </PostCategory>
            <PostTitle className="bigest black">{post?.title}</PostTitle>
            <PostMeta
              className="black"
              date={post?.createAt}
              authors={post?.author}
            />
          </div>
        </div>
        <div className="detail-content">
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{
              __html: post?.content || "",
            }}
          ></div>
          <div className="author">
            <div className="author-image">
              <img src={post?.user?.image || ""} alt="avatar" />
            </div>
            <div className="author-content">
              <h3 className="author-name">{post?.author}</h3>
              <p className="author-desc">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos non animi porro voluptates quibusdam optio nulla
                quis nihil ipsa error delectus temporibus nesciunt, nam officiis
                adipisci suscipit voluptate eum totam!
              </p>
            </div>
          </div>
        </div>
        <div className="detail-related">
          <Heading>Bài viết liên quan</Heading>
          <PostRelate categoryId={post?.categoryId || ""}></PostRelate>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
