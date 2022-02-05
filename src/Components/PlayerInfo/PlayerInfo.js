import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ShowPlayerInfo from './ShowPlayerInfo';

function PlayerInfo() {
    const [player_name, setName] = useState('')
    const [player_mouse, setMouse] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        let FormData = {player_name, player_mouse};
        await axios.post('http://localhost:5000/playerinfo', FormData)
        setName('')
        setMouse('')
        
    }


  return <div>
      <form onSubmit={handleSubmit}>
          Player Name:
          <input onChange={(e) => setName(e.target.value)} />
          Mouse:
          <input onChange={(e) => setMouse(e.target.value)} />
          <button type='submit'>submit</button>
      </form>
      <Link to='/showplayerinfo'>Player Info</Link>
  </div>;
}

export default PlayerInfo;
