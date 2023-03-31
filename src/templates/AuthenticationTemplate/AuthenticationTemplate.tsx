import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthenticationTemplate = ({ children }: Props) => {
  return (
    <div className="container">
      <img
        className="authentication-logo"
        srcSet="/img/logo.png 2x"
        alt="monkey-blogging"
      />
      <h1 className="authentication-heading">Monkey Blogging</h1>
      {children}
    </div>
  );
};

export default AuthenticationTemplate;
