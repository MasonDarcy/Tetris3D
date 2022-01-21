import React from "react";
import "../style/style.css";

/*
Atomic cube shape. Given a set of co-ordinates, creates a cube at that position.
*/
function Cube({ position, colors }) {
  const CUBE_DIMENSION_SIZE = 5;
  const CUBE_UNIT = "vmin";

  return (
    <div
      className="cubeParent"
      style={{
        transform: `translateX(${position.x * CUBE_DIMENSION_SIZE}${CUBE_UNIT}) 
        translateY(${position.y * CUBE_DIMENSION_SIZE}${CUBE_UNIT})
        translateZ(${position.z * -1 * CUBE_DIMENSION_SIZE}${CUBE_UNIT})`,
      }}
    >
      <div className="front" style={{ backgroundColor: `${colors[0]}` }}></div>
      <div className="back" style={{ backgroundColor: `${colors[1]}` }}></div>
      <div className="right" style={{ backgroundColor: `${colors[2]}` }}></div>
      <div className="left" style={{ backgroundColor: `${colors[3]}` }}></div>
      <div className="top" style={{ backgroundColor: `${colors[4]}` }}></div>
      <div className="bottom" style={{ backgroundColor: `${colors[5]}` }}></div>
    </div>
  );
}

export default Cube;
