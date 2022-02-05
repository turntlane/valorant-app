import React, { useEffect, useState } from "react";
import axios from "axios";

const styles = {
  height: "10rem",
  width: "15rem",
};

function Bundles() {
  const [bundle, setBundles] = useState([]);
  const [name, setName] = useState([])

  useEffect(() => {
    axios.get(`https://valorant-api.com/v1/bundles`).then((res) => {
      const data = res.data.data;
      console.log(data);
      setBundles(data);
      setName(data.map(n => n.displayName))
      console.log(name)
    });
  }, []);

  const getSkins = () => {
      axios.get(`https://valorant-api.com/v1/weapons/skins`)
      .then(res => {
          
      })
  }

  return (
    <div>
      {/* <img style={styles} src={bundle} /> */}
      {bundle.map((img, i) => (
        <li style={{ listStyle: "none" }} key={i}>
            <h1>{img.displayName}</h1>
          <button>
            <img style={styles} src={img.displayIcon} alt="bundles" />
          </button>
        </li>
      ))}
    </div>
  );
}

export default Bundles;
