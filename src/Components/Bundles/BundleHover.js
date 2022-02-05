import React from 'react';

const styles = {
    height: "10rem",
    width: "15rem",
  };

function BundleHover({onMouseOver, }) {
  return <div onMouseOver={}>
                <button onMouseOver={onMouseOver}>
            <img style={styles} src={img.displayIcon} alt="bundles" />
          </button>
  </div>;
}

export default BundleHover;
