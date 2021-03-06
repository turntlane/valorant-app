import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PlayerInfo() {
    const [player_name, setName] = useState('')
    const [player_mouse, setMouse] = useState('')
    const [player_sensitivity, setPlayerSensitivity] = useState('')


    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            // e.preventDefault()
            let FormData = {player_name, player_mouse, player_sensitivity};
            await axios.post('http://localhost:5000/playerinfo', FormData)
            alert('user created')
            setName('')
            setMouse('')
            setPlayerSensitivity('')
        }
        catch(err) {
            alert('Error adding user')
            console.error(err.message)
        }
        
    }


  return <div>
      <form onSubmit={handleSubmit}>
          Player Name:
          <input onChange={(e) => setName(e.target.value)} />
          Mouse:
          <input onChange={(e) => setMouse(e.target.value)} />
          Sensitivity:
          <input onChange={(e) => setPlayerSensitivity(e.target.value)} />
          <button type='submit'>submit</button>
      </form>
      <Link to='/showplayerinfo'>Player Info</Link>
  </div>;
}

export default PlayerInfo;
