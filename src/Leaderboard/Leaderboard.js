import { React, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [name, setName] = useState([]);
  const [rank, setRank] = useState([]);

  const getBoard = () => {
    axios
      .get(`https://api.henrikdev.xyz/valorant/v2/leaderboard/na`)
      .then((res) => {
        const data = res.data.players.slice(0, 500);
        // setName(data.gameName)
        // setName(data.slice(0, 10).map(name => name.gameName))
        console.log(data)
        setName(data);
      });
  };

  return (
    <div>
      <button onClick={getBoard}>data</button>
      {/* {name.slice(0, 10).map((n, i) =>
        n.leaderboardRank < 6 ? (
          <li key={i}>
            {n.gameName} | <span>{n.leaderboardRank} <img style={{height: '25px'}} src="https://cdna.artstation.com/p/assets/images/images/032/901/292/large/jared-tod-ranka.jpg?1607811047" alt="radiant" /></span>
          </li>
        ) : (
          ""
        )
      )} */}

      {name.slice(0, 20).map((n, i) => (
        <li key={i}>
          {n.gameName} | <span>{n.leaderboardRank} <img style={{height: '25px'}} src="https://cdna.artstation.com/p/assets/images/images/032/901/292/large/jared-tod-ranka.jpg?1607811047" alt="radiant" /></span>
        </li>
      ))}


    </div>
  );
}

export default Leaderboard;
