import React from "react";

const Square = React.forwardRef(({ handler }, ref) => {
  return <div className="protoPart" ref={ref} onClick={handler}></div>;
});

export default Square;
