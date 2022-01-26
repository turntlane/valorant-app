import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import data from "../../data";

function Leaderboard() {
  const [name, setName] = useState([]);
  const [rank, setRank] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.henrikdev.xyz/valorant/v2/leaderboard/na`)
      .then((res) => {
        const data = res.data.players.slice(0, 500);
        setName(data);
      });
  });

  const getData = () => {
    console.log(data);
  };

  return (
    <div className="container d-flex flex-column mt-5">
      <ol>
        {name.slice(0, 20).map((n, i) => (
          <li key={i}>
            <button
              onClick={getData}
              className="btn  btn-dark text-left mb-3"
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
      </ol>
      {/* <Link to="/">Player Search</Link> */}
    </div>
  );
}

export default Leaderboard;
