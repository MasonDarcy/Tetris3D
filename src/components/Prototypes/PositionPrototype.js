import React, { useState, useRef, useEffect } from "react";
import "../../style/style.css";
import Square from "./Square";

/*Initialize the position of the square with an animation.*/

function PositionPrototype() {
  //Some state(?)ref(?) to keep track of the target shape's position

  const numRef = useRef(1);
  const [numState, setNumState] = useState(1);
  const parentRef = useRef(null);

  const shiftTarget = () => {
    let targ = `${numState * 25}%`;

    let keyframes = [{ transform: `translate(${targ}, 0%)` }];

    let timing = {
      duration: 0,
      iterations: 1,
      fill: "forwards",
    };

    parentRef.current.animate(keyframes, timing);
  };

  /*Used specifically to set the first alignment, but then subsequent alignments?*/
  useEffect(() => {
    shiftTarget();
    console.log("Use effect called.");
  });

  return (
    <div className="scene">
      <div ref={parentRef}>
        <Square />
      </div>
    </div>
  );
}

export default PositionPrototype;
