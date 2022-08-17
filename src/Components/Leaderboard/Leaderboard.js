import { React, useEffect, useState } from "react";
import axios from "axios";
import data from "../../data";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Leaderboard.css";
import Loader from "../Loading/Loader";

function Leaderboard() {
  const [name, setName] = useState([]);
  const [rank, setRank] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AOS.init();
    axios
      .get(`https://api.henrikdev.xyz/valorant/v2/leaderboard/na`)
      .then((res) => {
        const data = res.data.players.slice(0, 500);
        setName(data);
        setLoaded(true);
      });
  });

  const getData = () => {
    console.log(data);
  };

  return loaded ? (
    <div className="container d-flex flex-column mt-5">
      {name.slice(0, 10).map((n, i) => (
        <li className="leaderboard-list" key={i}>
          <button
            data-aos={"fade-right"}
            onClick={getData}
            className="btn btn-dark text-left mb-3 w-25 text-center"
          >
            {n.gameName} |{" "}
            <span>
              {n.leaderboardRank}{" "}
              <img
                style={{ height: "25px" }}
                src="https://emoji.gg/assets/emoji/9768_Radiant_Valorant.png"
                alt="radiant"
              />
            </span>
          </button>
        </li>
      ))}
      {/* <Link to="/">Player Search</Link> */}
    </div>
  ) : (
    <Loader />
  );
}

export default Leaderboard;
