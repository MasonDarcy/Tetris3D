import React, { useState, useRef, useEffect } from "react";
import "../style/style.css";
import Shape from "./Shape";
import Cube from "./Cube";
import Floor from "./Floor";
import { rotationUtil } from "../helpers/rotationUtil";
import { modelUtil } from "../helpers/modelUtil";
import { collision } from "../helpers/collisionUtil";

const Tetris = () => {
  /*Default starting position of the root contextShape cube*/
  const START_X = 4;
  const START_Y = 4;
  const START_Z = 0;
  /*-------------------------------------------------------------------*/
  /*Keep track of xyz position of the contextShape---------------------*/
  let x = useRef(START_X);
  let y = useRef(START_Y);
  let z = useRef(START_Z);
  /*-------------------------------------------------------------------*/
  /*The model (for now, contains <Cube/> objects*/
  //TODO create a bare model
  const [model, setModel] = useState(modelUtil.createBareModel(10, 10, 10));
  /*-------------------------------------------------------------------*/
  /*List of existing [<Cube/>, position] tuple objects to render.------*/
  const [existingShapes, setExistingShapes] = useState([]);
  /*-------------------------------------------------------------------*/
  /*Collection of [<Cube/> refs, position] tuple objects for animating.*/
  const refData = useRef([]);
  /*-------------------------------------------------------------------*/
  /*Context shape and its transform refs.------------------------------*/

  let [cubeCoords, setCubeCoords] = useState({
    coords: [
      [0, 0, 0],
      [-1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    colors: ["orange", "blue", "red", "green", "pink", "yellow"],
  });

  let rotationRef = useRef(null);
  let horizontalRef = useRef(null);
  let verticalRef = useRef(null);
  /*-------------------------------------------------------------------*/
  /*Camera rotation variables------------------------------------------*/
  let cameraRef = useRef(null);
  const [initialMouseYPos, setInitialMouseYPos] = useState(null);
  const [initialMouseXPos, setInitialMouseXPos] = useState(null);
  const [xRotation, setXRotation] = useState(-24);
  const [yRotation, setYRotation] = useState(-24);
  const [mouseDown, setMouseDown] = useState(false);
  /*-------------------------------------------------------------------*/
  /*Event listeners.---------------------------------------------------*/
  const mouseMove = (e) => {
    e.preventDefault();
    if (mouseDown) {
      let changeY = e.pageX - initialMouseYPos;
      let changeX = initialMouseXPos - e.pageY;
      cameraRef.current.style.setProperty(`--x-rotation`, xRotation + changeX);
      cameraRef.current.style.setProperty(`--y-rotation`, yRotation + changeY);
    }
  };
  const initialRotation = (e) => {
    setMouseDown(true);
    setInitialMouseYPos(e.pageX);
    setInitialMouseXPos(e.pageY);
  };
  const releaseRotation = (e) => {
    setMouseDown(false);
    setXRotation(xRotation + initialMouseXPos - e.pageY);
    setYRotation(yRotation + e.pageX - initialMouseYPos);
  };

  const keydown = (e) => {
    console.log(e.keyCode);
    e.preventDefault();
    //Codes for rotation //w 87 //a 65 //s 83 //d 68
    switch (e.keyCode) {
      case 37:
        //horizontal left
        horizontalRef.current.style.setProperty(`--transformX`, x.current - 1);
        x.current = x.current - 1;
        //co-ordinates to be?
        console.log(cubeCoords.coords);

        // let collided = collisionUtil.collision();
        break;
      case 38:
        //up
        horizontalRef.current.style.setProperty(`--transformY`, y.current - 1);
        y.current = y.current - 1;
        break;
      case 39:
        //right
        horizontalRef.current.style.setProperty(`--transformX`, x.current + 1);
        x.current = x.current + 1;
        break;
      case 40:
        //down
        horizontalRef.current.style.setProperty(`--transformY`, y.current + 1);
        y.current = y.current + 1;

        break;
      case 83:
        //s
        //TODO check for collisions
        setCubeCoords({
          coords: rotationUtil.rotate(cubeCoords.coords, 1),
          colors: rotationUtil.rotateX90(cubeCoords.colors),
        });
        break;
      case 87:
        //w
        //TODO check for collisions
        setCubeCoords({
          coords: rotationUtil.rotate(cubeCoords.coords, 2),
          colors: rotationUtil.rotateXNeg90(cubeCoords.colors),
        });
        break;
      case 65:
        //a
        //TODO check for collisions
        setCubeCoords({
          coords: rotationUtil.rotate(cubeCoords.coords, 3),
          colors: rotationUtil.rotateY90(cubeCoords.colors),
        });
        break;
      case 68:
        //d
        //TODO check for collisions
        setCubeCoords({
          coords: rotationUtil.rotate(cubeCoords.coords, 4),
          colors: rotationUtil.rotateYNeg90(cubeCoords.colors),
        });
        break;
      case 72:
        //h
        fall();
        break;
    }
    //w 87 //a 65 //s 83 //d 68
  };
  /*--------------------------------------------------------------------*/

  const fall = () => {
    let keyframes = [
      { transform: `translateZ(-${z.current * 5}vmin)` },
      { transform: `translateZ(-${(z.current + 1) * 5}vmin)` },
    ];
    console.log(keyframes);
    let timing = {
      duration: 2000,
      iterations: 1,
      fill: "forwards",
    };

    let animation = verticalRef.current.animate(keyframes, timing);
    z.current = z.current + 1;
    console.log(`z: ${z.current}`);
    console.log(`x: ${x.current}`);
    console.log(`y: ${y.current}`);

    if (z.current < 10) {
      animation.onfinish = fall;
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("keydown", keydown);
    };
  });
  /*-------------------------------------------------------------------*/

  return (
    <>
      <div
        className="scene"
        onMouseDown={initialRotation}
        onMouseUp={releaseRotation}
      >
        <div className="camera" ref={cameraRef}>
          <div className="rotationParent" ref={rotationRef}>
            <div className="horizontalParent" ref={horizontalRef}>
              <div className="verticalParent" ref={verticalRef}>
                <Shape cubes={cubeCoords} />
              </div>
            </div>
          </div>
          {existingShapes.map((shape) => {
            return shape;
          })}
          <Floor />
        </div>
      </div>
    </>
  );
};

export default Tetris;
