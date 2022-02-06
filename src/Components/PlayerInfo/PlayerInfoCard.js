import React from 'react';

function PlayerInfoCard({text, data}) {
  return <div>
            {text ? <h1>{text}</h1> : null}
      <h3>{data}</h3>
      {/* <h3>{rank}</h3>
      <h3>{elo}</h3> */}

  </div>;
}

export default PlayerInfoCard;
