import React from "react";

function PlayerCard({text, level, rank, elo, image}) {
  return (
    <div>
      {text ? <h1>{text}</h1> : null}
      {level ? <h3>Level: {level}</h3> : null}
      {rank ? <h3>Rank: {rank}</h3> : null}
      {elo ? <h3>Elo: {elo}</h3> : null}
      {/* <button onClick={getData}>get data</button> */}
      {image ? <img src={image} alt="idk" /> : null}
    </div>
  );
}

export default PlayerCard;
