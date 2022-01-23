import React, { useState, useRef, useEffect } from "react";
import "../style/style.css";
import Shape from "./Shape";
import Cube from "./Cube";
import Floor from "./Floor";
import { rotationUtil } from "../helpers/rotationUtil";
import { modelUtil } from "../helpers/modelUtil";
import { collisionUtil } from "../helpers/collisionUtil";
import {getRandomShape} from "../helpers/shapeMaker"
import { v4 as uuidv4 } from 'uuid';

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
    /*Lever to control user input.*/
    const inputLever = useRef(true);
    /*-------------------------------------------------------------------*/
  /*Context shape and its transform refs.------------------------------*/

 let [cubeCoords, setCubeCoords] = useState(getRandomShape());
  let cordRef = useRef(JSON.parse(JSON.stringify(cubeCoords)));

  // {
  //   coords: [[0, 0, 0],
  //   [-1, 0, 0],
  //   [1, 0, 0],
  //   [1, 1, 0]],
  //   colors: ["orange", "blue", "red", "green", "pink", "yellow"]
  // }
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
  
    e.preventDefault();
    let rotatedCoords;
    if(inputLever.current) {
    //Codes for rotation //w 87 //a 65 //s 83 //d 68
    switch (e.keyCode) {
      case 37:
        //horizontal left
        //co-ordinates to be?
        if(!collisionUtil.collision(cubeCoords.coords, model, x.current - 1, y.current , z.current)) {
        horizontalRef.current.style.setProperty(`--transformX`, x.current - 1);
        x.current = x.current - 1;
        }
        break;
      case 38:
        //up
        if(!collisionUtil.collision(cubeCoords.coords, model, x.current, y.current - 1, z.current)) {

        horizontalRef.current.style.setProperty(`--transformY`, y.current - 1);
        y.current = y.current - 1;
        }
        break;
      case 39:
        //right

        if(!collisionUtil.collision(cubeCoords.coords, model, x.current + 1, y.current, z.current)) {

        horizontalRef.current.style.setProperty(`--transformX`, x.current + 1);
        x.current = x.current + 1;
        }
        break;
      case 40:
        //down
        if(!collisionUtil.collision(cubeCoords.coords, model, x.current, y.current + 1, z.current)) {

        horizontalRef.current.style.setProperty(`--transformY`, y.current + 1);
        y.current = y.current + 1;
        }
        break;
      case 83:
        //s
        //TODO check for collisions
        //rotatedCoords = rotationUtil.rotate(cubeCoords.coords, 1);
        rotatedCoords = rotationUtil.rotate(cordRef.current.coords, 1);

        if(!collisionUtil.collision(rotatedCoords, model, x.current, y.current, z.current)) {
          setCubeCoords({
            coords: rotatedCoords,
            colors: rotationUtil.rotateX90(cubeCoords.colors),
          });

          cordRef.current.coords = rotatedCoords;
          cordRef.current.colors = rotationUtil.rotateX90(cordRef.current.colors);

        }
        break;
      case 87:
        //w
        //TODO check for collisions
      //  rotatedCoords = rotationUtil.rotate(cubeCoords.coords, 2);
        rotatedCoords = rotationUtil.rotate(cordRef.current.coords, 2);

        if(!collisionUtil.collision(rotatedCoords, model, x.current, y.current, z.current)) {
          setCubeCoords({
            coords: rotatedCoords,
            colors: rotationUtil.rotateXNeg90(cubeCoords.colors),
          });
          cordRef.current.coords = rotatedCoords;
          cordRef.current.colors = rotationUtil.rotateXNeg90(cordRef.current.colors);
        
        }
        break;
      case 65:
        //a
        //TODO check for collisions
     //   rotatedCoords = rotationUtil.rotate(cubeCoords.coords, 3);
        rotatedCoords = rotationUtil.rotate(cordRef.current.coords, 3);

        if(!collisionUtil.collision(rotatedCoords, model, x.current, y.current, z.current)) {
          setCubeCoords({
            coords: rotatedCoords,
            colors: rotationUtil.rotateY90(cubeCoords.colors),
          });
          cordRef.current.coords = rotatedCoords;
          cordRef.current.colors = rotationUtil.rotateY90(cordRef.current.colors);
        }
       
        break;
      case 68:
        //d
        //TODO check for collisions
      //  rotatedCoords = rotationUtil.rotate(cubeCoords.coords, 4);

        rotatedCoords = rotationUtil.rotate(cordRef.current.coords, 4);

        if(!collisionUtil.collision(rotatedCoords, model, x.current, y.current, z.current)) {
          setCubeCoords({
            coords: rotatedCoords,
            colors: rotationUtil.rotateYNeg90(cubeCoords.colors),
          });
          cordRef.current.coords = rotatedCoords;
          cordRef.current.colors = rotationUtil.rotateYNeg90(cordRef.current.colors);
        }
        break;
      case 72:
        //h
        fall();
        break;
    }
  }
    //w 87 //a 65 //s 83 //d 68
  };
  /*--------------------------------------------------------------------*/

  const fall = () => {
    
    let keyframes = [
      { transform: `translateZ(-${z.current * 5}vmin)` },
      { transform: `translateZ(-${(z.current + 1) * 5}vmin)` },
    ];

    let timing = {
      duration: 1000,
      iterations: 1,
      fill: "forwards",
    };

    let animation = verticalRef.current.animate(keyframes, timing);


/*Disable input here, otherwise the user has a brief window to rotate
the shape after a collision has been detected.*/
inputLever.current = false;
let collision = collisionUtil.collision(cordRef.current.coords, model, x.current, y.current, z.current + 1);


    if (!collision) {
      inputLever.current = true;
      z.current = z.current + 1;
      animation.onfinish = fall;
    } else {
      /*this resolves a discrepancy in the color if the user is mashing rotations */
      setCubeCoords(cordRef.current);
      /*--------------------------------------------------------------------------*/
      animation.onfinish = () => {
        //remove context shape
        setCubeCoords( {
          coords: [
          ],
          colors: [],
        });
   
        //Create new model object
        let mod = JSON.parse(JSON.stringify(model));
        console.log(cordRef.current.colors);
      //add block representation to existingShapes, update model
      let rootCoords = collisionUtil.getMutatedCoords(cordRef.current.coords, x.current, y.current, z.current + 1);
  
      let newShapes = [];
      rootCoords.forEach((coord) => {
        mod[coord[0]][coord[1]][coord[2]] = true; 
        newShapes.push({shape: <Shape key ={uuidv4()} cubes={{
          coords: [coord],
          colors: cordRef.current.colors,
        }}/>, coords: [coord]})
      });

      //Set existing shape
      setModel(mod);
      setExistingShapes((old) => {
        return [...old, ...newShapes]
      });
      
      x.current = START_X;
      y.current = START_Y;
      z.current = START_Z;
      
      cordRef.current = getRandomShape();
      setCubeCoords(JSON.parse(JSON.stringify(cordRef.current)));
      horizontalRef.current.style.setProperty(`--transformX`, x.current);
      horizontalRef.current.style.setProperty(`--transformY`, y.current);


      fall();

      }
    }
  };


  useEffect(() => {


  }, [cubeCoords])
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
                
                {cubeCoords ? <Shape  cubes={cubeCoords} /> : null}
              </div>
            </div>
          </div>
          {existingShapes.map((shape) => {
            return shape.shape;
          })}
          <Floor />
        </div>
      </div>
    </>
  );
};

export default Tetris;
