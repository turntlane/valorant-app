import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="red"
      ariaLabel="three-dots-loading"
      wrapperStyle
      wrapperClass
    />
  );
}

export default Loader;
