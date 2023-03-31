import React from "react";
import { FeatureCard } from "../components/FeatureCard";
import { Heading } from "../components/Heading";

type Props = {};

const Feature = (props: Props) => {
  return (
    <div className="feature">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        <div className="grid-layout">
          <FeatureCard></FeatureCard>
          <FeatureCard></FeatureCard>
          <FeatureCard></FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default Feature;
