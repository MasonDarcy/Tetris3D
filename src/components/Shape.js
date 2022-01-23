import React from "react";
import Cube from "./Cube";
import { v4 as uuidv4 } from 'uuid';

/*
Given an array of co-ordinates as props, creates a collection of cubes.
*/

const Shape = ({ cubes }) => {
  return (
    <div className="shape">
      {cubes.coords.map((cube) => {
        return (
          <Cube key={uuidv4()}
            position={{ x: cube[0], y: cube[1], z: cube[2] }}
            colors={cubes.colors}
          />
        );
      })}
    </div>
  );
};
// return <Cube position={{ x: cube.x, y: cube.y, z: cube.z }} />;

export default Shape;
