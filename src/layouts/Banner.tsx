import React from "react";
import { Button } from "../components/Button";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="container">
      <div className="banner">
        <div className="banner-content">
          <h1 className="banner-heading">Monkey Blogging</h1>
          <p className="banner-desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut in
            inventore minus? Voluptatem culpa aliquam numquam, magni labore,
            quaerat dolorum, voluptatum nostrum dolores placeat quis incidunt
            cupiditate consectetur! Veritatis, reiciendis.
          </p>
          <Button className="banner-button" href="/sign-in">
            Get Started
          </Button>
        </div>
        <div className="banner-image">
          <img src="./img/banner.png" alt="banner" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
