import React from "react";
import Banner from "../../layouts/Banner";
import Feature from "../../layouts/Feature";
import Newest from "../../layouts/Newest";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Banner></Banner>
      <Feature></Feature>
      <Newest></Newest>
    </>
  );
};

export default Home;
