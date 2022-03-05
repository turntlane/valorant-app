import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import Leaderboard from "../Leaderboard/Leaderboard";
import { Link } from "react-router-dom";

function HomeContent() {
    useEffect(() => {
        AOS.init();
      }, []);
  return (
    <div>
      <div style={{ zIndex: "500" }} className="wrapper w-100">
        <div className="body">
            <div className="home-header-text">
          <h1 className="home-title" data-aos={"fade-up"}>
            Welcome to {<br></br>}
            White Rifle
          </h1>
          <div className="col-xl-4 col-lg-6 order-1 order-lg-2 mr-5 float-right" data-aos={"zoom-in"} data-aos-delay={"150"}>
          <img src="https://s3-us-west-2.amazonaws.com/fireshare-prd/projects/caWiteo4FxUhI8tTm8CnHNiP5QdaspkBzmgCBGvR.png" className="img-fluid animated" alt="" />
        </div>
        </div>
          <p className="text-white home-content" data-aos={"fade-up"}>An all in one game tracker.
          {<br></br>} Up to date leaderboards, player profiles, player stats, and more!</p>
          <Link to="playersearch" className="btn btn-outline-light home-button">Search Player</Link>
        </div>
      </div>
      <Leaderboard />
    </div>
  );
}

export default HomeContent;
