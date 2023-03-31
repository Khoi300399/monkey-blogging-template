import React from "react";
import Banner from "../../layouts/Banner";
import Feature from "../../layouts/Feature";
import Header from "../../layouts/Header";
import Newest from "../../layouts/Newest";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="home wrapper">
      <Header></Header>
      <Banner></Banner>
      <Feature></Feature>
      <Newest></Newest>
    </div>
  );
};

export default Home;
