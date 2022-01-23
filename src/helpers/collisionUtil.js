///Checks for transformation collisions and out of bounds

const collision = (coordCollection, model, x, y, z) => {

let mutated = getMutatedCoords(coordCollection, x, y, z)
let output = false;
  mutated.forEach((coord) => {
    // console.log(`coord[0]: ${mutated[0]}`);
    // console.log(`coord[1]: ${mutated[1]}`);
    // console.log(`coord[2]: ${mutated[2]}`);
    // console.log(`coord[3]: ${mutated[3]}`)


    let outOfBounds =
      coord[0] > 9 ||
      coord[0] < 0 ||
      coord[1] > 9 ||
      coord[1] < 0 ||
      coord[2] > 9;

    //  console.log(outOfBounds);
    if (outOfBounds) {
      output = true;
    } 
  });
  return output;
};
//model[coord[0]][coord[1]][coord[2]]


const getMutatedCoords = (nakedCoords, x, y, z) => {

  let copy = JSON.parse(JSON.stringify(nakedCoords));

  copy.forEach((cube) => {
    cube[0] += x;
    cube[1] += y;
    cube[2] += z;
  });
 
  return copy;
};

export const collisionUtil = {
  collision,
  getMutatedCoords,
};
