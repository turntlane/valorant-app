import React from "react";

function PlayerInfoCard({ playerName, sens, mouse }) {
  return (
    <div>
      {playerName ? <h1>Name: {playerName}</h1> : null}
      {mouse ? <h3>Mouse: {mouse}</h3> : null}
      {sens ? <h3>Sens: {sens}</h3> : null}
    </div>
  );
}

export default PlayerInfoCard;
