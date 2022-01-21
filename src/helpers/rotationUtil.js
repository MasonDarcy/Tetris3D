const X_ROTATION_MATRIX_90 = [
  [1, 0, 0],
  [0, 0, -1],
  [0, 1, 0],
];
const X_ROTATION_MATRIX_NEG_90 = [
  [1, 0, 0],
  [0, 0, 1],
  [0, -1, 0],
];
const Y_ROTATION_MATRIX_90 = [
  [0, 0, 1],
  [0, 1, 0],
  [-1, 0, 0],
];
const Y_ROTATION_MATRIX_NEG_90 = [
  [0, 0, -1],
  [0, 1, 0],
  [1, 0, 0],
];

const getMatrix = (id) => {
  switch (id) {
    case 1:
      return X_ROTATION_MATRIX_90;
    case 2:
      return X_ROTATION_MATRIX_NEG_90;
    case 3:
      return Y_ROTATION_MATRIX_90;
    case 4:
      return Y_ROTATION_MATRIX_NEG_90;
  }
};

const rotateCoord = (coords, id) => {
  let output = [0, 0, 0];

  let rotationMatrix = getMatrix(id);

  rotationMatrix.forEach((row, rindex) => {
    row.forEach((column, cindex) => {
      output[rindex] += column * coords[cindex];
    });
  });

  return output;
};

const rotate = (coords, id) => {
  let output = [];

  coords.forEach((coord) => {
    output.push(rotateCoord([coord[0], coord[1], coord[2]], id));
  });

  return output;
};

const rotateX90 = (colors) => {
  return [colors[4], colors[5], colors[2], colors[3], colors[1], colors[0]];
};

const rotateXNeg90 = (colors) => {
  return [colors[5], colors[4], colors[2], colors[3], colors[0], colors[1]];
};

const rotateY90 = (colors) => {
  return [colors[0], colors[1], colors[5], colors[4], colors[2], colors[3]];
};

const rotateYNeg90 = (colors) => {
  return [colors[0], colors[1], colors[4], colors[5], colors[3], colors[2]];
};

export const rotationUtil = {
  rotate,
  rotateX90,
  rotateXNeg90,
  rotateY90,
  rotateYNeg90,
};
