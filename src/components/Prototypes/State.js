import React, { useState, useEffect, useRef } from "react";
import "../../style/style.css";
import Square from "./Square";

function State() {
  const target = useRef(null);
  const [currentShape, setCurrentShape] = useState({
    comp: <Square ref={target} handler={handler} />,
    compType: "Square",
  });

  const [existingShapes, setExistingShapes] = useState([]);

  const parent = useRef(null);
  const numRef = useRef(0);
  const testRef = useRef(null);
  const dynamicElementRefArray = useRef([]);

  const keydown = (e) => {
    let keyframes = [
      { transform: `translate(0%, 0%)` },
      { transform: `translate(${numRef.current}%, 0%)` },
    ];
    let timing = {
      duration: 0,
      iterations: 1,
      fill: "forwards",
    };

    parent.current.animate(keyframes, timing);
  };

  function handler() {
    let current = `${numRef.current * 50}%`;
    let targ = `${(numRef.current + 1) * 50}%`;

    let keyframes = [
      { transform: `translate(${current}, 0%)` },
      { transform: `translate(${targ}, 0%)` },
    ];

    let timing = {
      duration: 1000,
      iterations: 1,
      fill: "forwards",
    };

    const transfer = () => {
      setExistingShapes((old) => {
        return [
          ...old,
          <Square
            ref={(ref) => {
              dynamicElementRefArray.current.push({ ref: ref, position: 1 });
            }}
          />,
        ];
      });

      console.log(dynamicElementRefArray.current[0]);
    };

    let animation = target.current.animate(keyframes, timing);

    animation.onfinish = transfer;
    numRef.current = numRef.current + 1;
  }

  const animationEnd = (e) => {
    console.log("These don't work with the web animations API");
  };

  const animationStart = (e) => {
    console.log("These don't work with the web animations API");
  };

  useEffect(() => {
    window.addEventListener("animationend", animationEnd);
    window.addEventListener("animationstart", animationStart);
    window.addEventListener("keydown", keydown);
    console.log("UseEffect called");
    console.log(existingShapes);

    return () => {
      window.removeEventListener("animationend", animationEnd);
      window.removeEventListener("animationstart", animationStart);
      window.removeEventListener("keydown", keydown);
    };
  });

  return (
    <>
      <div className="scene">
        <div className="camera">
          {currentShape.comp}
          {existingShapes.map((shape) => {
            return shape;
          })}
        </div>
      </div>
    </>
  );
}

export default State;

//   el.current.style.setProperty(
//     `--color${sliceNum * 54 + i * 18 + cubeIndex * 6 + (sideIndex + 1)}`,
//     color
//   );
