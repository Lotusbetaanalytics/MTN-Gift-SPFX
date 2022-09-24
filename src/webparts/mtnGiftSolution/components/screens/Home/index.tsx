import * as React from "react";
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <div className="header_logo">
        <img src={require("../../assets/logo.png")} alt="logo" />
      </div>
      <div className="liner">
        <div className="mtn__banner">
            <div className="mtn__logoContainer">
                
                <div className="text">
                    <h3>End of the year</h3>
                    <h1>GIFT COLLECTION </h1>
                    <h1>PORTAL</h1>
                </div>
            </div>
            <div className="btnContainer">
                <Link to={`/home`} className="mtn__btns mtn__black">Proceed</Link>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Home;
