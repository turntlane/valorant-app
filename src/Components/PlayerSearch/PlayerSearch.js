
// import "./App.css";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlayerCard from "./PlayerCard/PlayerCard";

function PlayerSearch() {
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [tag, setTag] = useState([]);
  const [image, setImage] = useState("");
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [mmr, setMmr] = useState("");
  const [rank, setRank] = useState("");
  const [elo, setElo] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(
        `https://api.henrikdev.xyz/valorant/v1/leaderboard/na`
      );
      // console.log()
      setUsers(
        response.data
          .slice(0, 500)
          .map((name) => `${name.gameName}#${name.tagLine}`)
      );
    };
    loadUsers();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.match(regex);
      });
    }
    console.log(`matches`, matches);
    setSuggestions(matches);
    setText(text);
  };

  const onSuggestHandler = async (text) => {
    setText(text);
    console.log(text);
    const firstHalf = text.split("#")[0];
    const secondHalf = text.split("#")[1];
    console.log(firstHalf);
    console.log(secondHalf);

    await axios
      .get(
        `https://api.henrikdev.xyz/valorant/v1/account/${firstHalf}/${secondHalf}`
      )
      .then((res) => {
        const data = res.data;
        setTag(data.data.tag);
        setLevel(data.data.account_level);
        setImage(data.data.card.large);
        console.log(name);
      });

    await axios
      .get(
        `https://api.henrikdev.xyz/valorant/v1/mmr/na/${firstHalf}/${secondHalf}`
      )
      .then((res) => {
        const mmrData = res.data;
        setRank(mmrData.data.currenttierpatched);
        setElo(mmrData.data.elo);
      });
    setSuggestions([]);
  };

  return (
    <div className="app mt-4 mx-auto">
      <div>
        <div className="container">
          <input
            type="text"
            className="col-md-6 mx-auto input"
            onChange={(e) => onChangeHandler(e.target.value)}
            value={text}
          />
          {suggestions &&
            suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="suggestion col-md-6 justify-content-md-center"
                onClick={() => onSuggestHandler(suggestion)}
              >
                {suggestion}
              </div>
            ))}
        </div>
      </div>
      <PlayerCard text={text} level={level} elo={elo} rank={rank} image={image}/>
      {/* {text ? <h1>{text}</h1> : null}
      {level ? <h3>Level: {level}</h3> : null}
      {rank ? <h3>Rank: {rank}</h3> : null}
      {elo ? <h3>Elo: {elo}</h3> : null}
      {image ? <img src={image} alt="idk" /> : null} */}
      <Link to="leaderboard">Leaderboard</Link>
    </div>
  );
}

export default PlayerSearch;
