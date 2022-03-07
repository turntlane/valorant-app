import React from "react";

function PlayerCard({ playerName, level, rank, elo, image }) {
  return (
    <div>
      {image ? <h1>{playerName}</h1> : null}
      <h3>{level}</h3>
      <h3>{rank}</h3>
      <h3>{elo}</h3>
      {image ? <img src={image} alt="player" /> : null}
    </div>
  );
}

export default PlayerCard;
