import React from "react";
import "./Home.css";
import Leaderboard from "../Leaderboard/Leaderboard";
import HomeContent from "./HomeContent";
import Loader from "../Loading/Loader";

function Home() {
  return (
    <div>
      <div className="stripes">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <HomeContent />
    </div>
  );
}

export default Home;
