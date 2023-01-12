import React, { useState, useEffect } from "react";
import "./Home.css";
import Leaderboard from "../Leaderboard/Leaderboard";
import HomeContent from "./HomeContent";
import Loader from "../Loading/Loader";

function Home({ setAuth }) {
  return (
    <div>
      <div className="stripes">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <HomeContent setAuth={setAuth} />
    </div>
  );
}

export default Home;
