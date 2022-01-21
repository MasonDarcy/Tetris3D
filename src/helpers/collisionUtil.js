///Checks for transformation collisions and out of bounds

const collision = (coordCollection, model) => {
  coordCollection.forEach((coord) => {
    let outOfBounds =
      coord[0] > 9 ||
      coord[0] < 0 ||
      coord[1] > 9 ||
      coord[1] < 0 ||
      coord[2] < 0;
    if (model[(coord[0], coord[1], coord[2])] || outOfBounds) {
      return true;
    }
  });
};

const getTrueCoords = (nakedCoords, x, y, z) => {
  let copy = JSON.parse(JSON.stringify(nakedCoords));

  copy.forEach((cube) => {
    cube[0] += x;
    cube[1] += y;
    cube[2] += z;
  });

  return copy;
};

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
  getTrueCoords,
};
