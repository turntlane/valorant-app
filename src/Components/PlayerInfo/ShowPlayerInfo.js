import React, {useState, useEffect} from 'react';
import axios from 'axios';

function ShowPlayerInfo() {
    const [active, setActive] = useState(false)
    const [name, setName] = useState([])
    const [mouse, setMouse] = useState([])
    const [data, setData] = useState('')

    useEffect(() => {
        axios.get(`http://localhost:5000/playerinfo`)
        .then(res => {
            const data = res.data
            setName(data)
            setMouse(data.map(m => m.player_mouse))
        })
    }, [])

    function onClicked(e) {
        setActive(true)
        setData(e.target.getAttribute("data-value"))
    };

  return <div>
      {name.map((n) => (
          <ul key={n.player_id}>
              <button data-value={n.player_mouse} onClick={onClicked}>{n.player_name}</button>
          </ul>
      ))}
      {active ? <ul >
        <li>{data}</li> 
      </ul> : null}
  </div>;
}

export default ShowPlayerInfo;
