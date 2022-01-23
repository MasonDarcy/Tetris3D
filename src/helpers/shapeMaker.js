

const tetriminoArray = [ 
    //Knight
    [
        [0, 0, 0],
        [-1, 0, 0],
        [1, 0, 0],
        [1, 1, 0],
      ],
      //Line
    [
        [0, 0, 0],
        [-1, 0, 0],
        [1, 0, 0],
        [2, 0, 0],
    ],
    //Block
    [
     [0, 0, 0],
     [1, 0 ,0],
     [0, 1, 0],
     [1, 1, 0],
    ],
    //Zigzag
    [
    [0, 0, 0],
    [0, 1, 0],
    [-1, 1, 0],
    [1, 0, 0]
    ],
    //podium
    [
        [0, 0, 0],
        [-1, 0, 0],
        [1, 0, 0],
        [0, -1, 0]
    ]
];

const colorArray =  ["orange", "blue", "red", "green", "pink", "yellow"];

export const getRandomShape = () => {
    return {
        coords: tetriminoArray[Math.floor(Math.random() * 5)],
        colors: colorArray
    }
}

