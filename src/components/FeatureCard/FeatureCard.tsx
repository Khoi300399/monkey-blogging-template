import { memo, useEffect } from "react";
import { PostCategory, PostImage, PostMeta, PostTitle } from "../Post";
import {
  PostType,
  getCategoriesApi,
} from "../../redux/postReducer/postReducer";
import { useDispatch } from "react-redux";
import { DispathType, RootState } from "../../redux/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Props = {
  data: PostType;
};

const FeatureCard = ({ data }: Props) => {
  const dispatch = useDispatch<DispathType>();
  const { categories } = useSelector((state: RootState) => state.postReducer);
  useEffect(() => {
    dispatch(getCategoriesApi());
  }, [dispatch]);
  if (data && data.image)
    return (
      <div className="feature-card">
        <PostImage
          to={`/post-detail?id=${data.id}`}
          className="feature"
          src={data?.image}
          alt={data?.imageName}
        />
        <Link
          to={`/post-detail?id=${data.id}`}
          className="feature-card-overlay"
        ></Link>
        <div className="feature-card-content">
          <div className="feature-card-top">
            <PostCategory>{categories[0]?.name}</PostCategory>
            <PostMeta
              className="white feature"
              date={data.createAt}
              authors={data?.author}
            ></PostMeta>
          </div>
          <PostTitle to={`/post-detail?id=${data.id}`}>{data?.title}</PostTitle>
        </div>
      </div>
    );
  return null;
};

export default memo(FeatureCard);
