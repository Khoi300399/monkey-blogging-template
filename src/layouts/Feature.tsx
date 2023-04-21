import { memo, useEffect } from "react";
import { FeatureCard } from "../components/FeatureCard";
import { Heading } from "../components/Heading";
import { useSelector } from "react-redux";
import { DispathType, RootState } from "../redux/config";
import { PostType, getPostFeatureApi } from "../redux/postReducer/postReducer";
import { useDispatch } from "react-redux";

type Props = {};

const Feature = (props: Props) => {
  const dispatch = useDispatch<DispathType>();
  useEffect(() => {
    dispatch(getPostFeatureApi());
  }, [dispatch]);
  const { postFeature } = useSelector((state: RootState) => state.postReducer);
  if (!postFeature) return null;
  return (
    <div className="feature">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          {postFeature?.map((item: PostType) => {
            return <FeatureCard key={item.id} data={item}></FeatureCard>;
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(Feature);
