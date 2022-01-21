import React, { useState, useEffect, useRef } from "react";
import Square from "./Square";
import "../../style/style.css";

function MassAnimation() {
  const [existingShapes, setExistingShapes] = useState([]);
  const refData = useRef([]);

  const keydown = (e) => {
    //This is how we'll test it. This should be able to animate the square.
    let keyframes = [
      { transform: `translate(0%, 0%)` },
      { transform: `translate(50%, 0%)` },
    ];
    let timing = {
      duration: 5000,
      iterations: 1,
      fill: "forwards",
    };

    //  refData.current[0].animate(keyframes, timing);
    let t1 = refData.current[0].ref.animate(keyframes, timing);
    t1.onfinish = () => {
      console.log("t1");
    };

    let keyframes1 = [
      { transform: `translate(0%, 0%)` },
      { transform: `translate(0%, 50%)` },
    ];
    let timing1 = {
      duration: 5000,
      iterations: 1,
      fill: "forwards",
    };

    let t2 = refData.current[1].ref.animate(keyframes1, timing1);
    t2.onfinish = () => {
      console.log("t2");
    };
  };

  useEffect(() => {
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
    };
  });

  useEffect(() => {
    console.log("run once");
    protoPopulate();
    console.log(refData.current.length);
    console.log(refData.current);
  }, []);

  const protoPopulate = () => {
    //We want to test if we can create some dynamic Squares
    //We also need to store their references, and data about where they are?
    //So here I declared a JSX object
    //Also, I set its ref (which actually gets forwarded
    //But I also set its ref.. to a function, which returns the ref to an array?

    let p1 = (
      <Square
        ref={(ref) => {
          refData.current.push({ ref: ref, position: 1, shape: p1 });
        }}
      />
    );

    let p2 = (
      <Square
        ref={(ref) => {
          refData.current.push({ ref: ref, position: 2, shape: p2 });
        }}
      />
    );

    console.log(p2);

    setExistingShapes((old) => {
      return [...old, { shape: p1 }, { shape: p2 }];
    });
  };

  return (
    <>
      <div className="scene">
        {existingShapes.map((shape) => {
          return shape.shape;
        })}
      </div>
    </>
  );
}

export default MassAnimation;
