const createBareModel = (xMax, yMax, zMax) => {
  return new Array(xMax).fill(
    new Array(yMax).fill(new Array(zMax).fill(false))
  );
};

export const modelUtil = {
  createBareModel,
};
