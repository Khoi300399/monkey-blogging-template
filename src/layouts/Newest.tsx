import React from "react";
import { Heading } from "../components/Heading";
import { NewstCard, NewstCardLarge } from "../components/NewestCard";
import { PostCard } from "../components/PostCard";

type Props = {};

const Newest = (props: Props) => {
  return (
    <div className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <NewstCardLarge></NewstCardLarge>
          <div className="sidebar">
            <NewstCard></NewstCard>
            <NewstCard></NewstCard>
            <NewstCard></NewstCard>
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          <PostCard></PostCard>
          <PostCard></PostCard>
          <PostCard></PostCard>
          <PostCard></PostCard>
        </div>
      </div>
    </div>
  );
};

export default Newest;
