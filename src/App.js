import logo from './logo.svg';
import './App.css';
import {React, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {

  const [level, setLevel] = useState('')
  const [name, setName] = useState('')
  const [tag, setTag] = useState('')
  const [image, setImage] = useState('')

  const [mmr, setMmr] = useState('')
  const [rank, setRank] = useState('')
  const [elo, setElo] = useState('')

  const getData = async () => {
    try {
      await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`)
      .then(res => {
        const data = res.data
        setTag(data.data.tag)
        setLevel(data.data.account_level)
        setImage(data.data.card.large)
        console.log(name)
      })
      await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/na/${name}/${tag}`)
      .then(res => {
        const mmrData = res.data
        setRank(mmrData.data.currenttierpatched)
        setElo(mmrData.data.elo)
      })
    }
    catch (err) {
      console.error(err)
    }
  }




  return (
    <div className="App">
      <input onChange={e => setName(e.target.value)} />
      <input onChange={e => setTag(e.target.value)} />
      <h1>{name}{`#${tag}`}</h1>
      <h3>{level}</h3>
      <h3>{rank}</h3>
      <h3>{elo}</h3>
      <button onClick={getData}>get data</button>
      <img src={image} alt='idk' />
    <Link to='leaderboard'>Leaderboard</Link>
    </div>
  );
}

export default App;
