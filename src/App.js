import Shape from "./components/Shape";
import State from "./components/Prototypes/State";
import MassAnimation from "./components/Prototypes/MassAnimation";
import Tetris from "./components/Tetris";
import "./style/style.css";

const App = () => {
  return (
    <>
      {/* <div className="scene">
        <div>
          <Shape
            cubes={[
              { x: 0, y: 0, z: 0 },
              { x: 1, y: 0, z: 0 },
            ]}
          />
        </div>
      </div> */}
      {/* <MassAnimation /> */}
      <Tetris />
    </>
  );
};

export default App;
