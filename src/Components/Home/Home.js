import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
    <div style={{zIndex: '500'}} className="wrapper">
      <div className="body">
        <h1 className="home-title" data-aos={"fade-up"}>
          Valorant Tracker
        </h1>
      </div>
    </div>
      <div className="stripes">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Home;
