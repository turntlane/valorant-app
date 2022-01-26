import React from "react";

function PlayerCard({ text, level, rank, elo, image }) {
  return (
    <div>
      {text ? <h1>{text}</h1> : null}
      <h3>{level}</h3>
      <h3>{rank}</h3>
      <h3>{elo}</h3>
      {image ? <img src={image} alt="player" /> : null}
    </div>
  );
}

export default PlayerCard;
