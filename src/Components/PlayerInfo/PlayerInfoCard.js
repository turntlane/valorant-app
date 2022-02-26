import React from "react";

function PlayerInfoCard({ text, sens, mouse }) {
  return (
    <div>
      {text ? <h1>{text}</h1> : null}
      {mouse ? <h3>Mouse: {mouse}</h3> : null}
      {sens ? <h3>Sens: {sens}</h3> : null}
      {/* <h3>{rank}</h3>
      <h3>{elo}</h3> */}
    </div>
  );
}

export default PlayerInfoCard;
