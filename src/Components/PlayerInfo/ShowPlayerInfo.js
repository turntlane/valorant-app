import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PlayerInfoCard from './PlayerInfoCard';

function ShowPlayerInfo() {
    const [users, setUsers] = useState([]);
    const [text, setText] = useState("");
    const [mouse, setMouse] = useState("")
    const [data, setData] = useState("")
    const [suggestions, setSuggestions] = useState([]);
  
    useEffect(() => {
      const loadUsers = async () => {
        const response = await axios.get(
          `http://localhost:5000/playerinfo`
        );
        // console.log()
        setUsers(
          response.data
            .map((name) => name.player_name)
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
  
    const onSuggestHandler = async (e, text) => {
      setText(text);
      setData(e.target.getAttribute("data-value"))
      console.log(text);
      const firstHalf = text.split("#")[0];
      const secondHalf = text.split("#")[1];
      console.log(firstHalf);
      console.log(secondHalf);
  
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
                  data-value={suggestion.player_name}
                  className="suggestion col-md-6 justify-content-md-center"
                  onClick={() => onSuggestHandler(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
              <PlayerInfoCard text={text} data={data}/>
          </div>
        </div>
      </div>
    );
}

export default ShowPlayerInfo;
