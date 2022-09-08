import * as React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="logo">
        <img src={require("../../assets/logo.png")} alt="logo" />
      </div>
      <h5>Welcome to the Gift</h5>
      <br />
    </div>
  );
};

export default Home;
