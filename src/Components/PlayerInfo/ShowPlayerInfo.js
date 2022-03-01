import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerInfoCard from "./PlayerInfoCard";

function ShowPlayerInfo() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [mouse, setMouse] = useState("");
  const [sens, setSens] = useState("");
  const [name, setName] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get(`http://localhost:5000/playerinfo`);
      setUsers(response.data.map((name) => name.player_name));
      console.log(response.data.map((mouse) => mouse.player_mouse));
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
    setText(text)
  };

  const onSuggestHandler = async (text) => {
    setText(text);
    setName(text)
    console.log(text);
    await axios
    .get(`http://localhost:5000/players?name=${text}`)
    .then((res) => {
      setMouse(res.data.map((d) => d.player_mouse));
      setSens(res.data.map((d) => d.player_sensitivity));
    });
    
    setSuggestions([]);
  };

  return (
    <div className="app mt-4 mx-auto">
      <div>
        <div className="container">
          <input
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
          <PlayerInfoCard playerName={name} mouse={mouse} sens={sens} />
        </div>
      </div>
    </div>
  );
}

export default ShowPlayerInfo;
