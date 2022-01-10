import logo from "./logo.svg";
import "./App.css";
import { React, useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

function App() {
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
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
      setUsers(response.data.slice(0, 10).map((name) => name.gameName));
      console.log(response.data.slice(0, 10).map((name) => name.gameName));
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


  const onSuggestHandler = (text) => {
    setText(text)
    console.log(text)
    setSuggestions([])
    }

  // const getData = async () => {
  //   try {
  //     await axios
  //       .get(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`)
  //       .then((res) => {
  //         const data = res.data;
  //         setTag(data.data.tag);
  //         setLevel(data.data.account_level);
  //         setImage(data.data.card.large);
  //         console.log(name);
  //       });
  //     await axios
  //       .get(`https://api.henrikdev.xyz/valorant/v1/mmr/na/${name}/${tag}`)
  //       .then((res) => {
  //         const mmrData = res.data;
  //         setRank(mmrData.data.currenttierpatched);
  //         setElo(mmrData.data.elo);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="App">
      {/* <input onChange={(e) => setName(e.target.value)} />
      <input onChange={(e) => setTag(e.target.value)} />
      <h1>
        {name}
        {`#${tag}`}
      </h1>
      <h3>{level}</h3>
      <h3>{rank}</h3>
      <h3>{elo}</h3>
      <button onClick={getData}>get data</button>
      <img src={image} alt="idk" />
      <Link to="leaderboard">Leaderboard</Link> */}
      <div>
        <div className="container">

          <input
            type="text"
            className="col-md-12 input"
            onChange={(e) => onChangeHandler(e.target.value)}
            value={text}
            // onBlur={() => setSuggestions([])}
          />
          {suggestions &&
            suggestions.map((suggestion, i) => (
              <div key={i} className="suggestion col-md-12 justify-content-md-center" onClick={() => onSuggestHandler(suggestion)}>
                {suggestion}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
