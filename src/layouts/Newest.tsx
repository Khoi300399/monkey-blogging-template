import { memo, useEffect } from "react";
import { Heading } from "../components/Heading";
import { NewstCard, NewstCardLarge } from "../components/NewestCard";
import { useDispatch } from "react-redux";
import { DispathType, RootState } from "../redux/config";
import { useSelector } from "react-redux";
import { getPostsApi } from "../redux/postReducer/postReducer";

type Props = {};

const Newest = (props: Props) => {
  const dispatch = useDispatch<DispathType>();
  const { posts } = useSelector((state: RootState) => state.postReducer);

  useEffect(() => {
    dispatch(getPostsApi());
  }, [dispatch]);

  return (
    <div className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <NewstCardLarge data={posts[0]}></NewstCardLarge>
          <div className="sidebar">
            {posts.slice(2, 5).map((data) => {
              return <NewstCard key={data.id} data={data}></NewstCard>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Newest);
