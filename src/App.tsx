import { useState } from "react";
import produce from "immer";

const newBoard = (side: number): boolean[] => Array(side ** 2).fill(false);
const defaultSide = 5;

const App = () => {
  const [side, setSide] = useState(defaultSide);
  const [grid, setGrid] = useState(Array(side ** 2).fill(false));
  const [animate, setAnimate] = useState(false);

  const onClick = (index: number) => {
    const row = Math.floor(index / side);
    const column = index % side;
    setGrid(
      produce(grid, (draft) => {
        for (let i = 0; i < side; i++) {
          draft[row * side + i] = !draft[row * side + i];
          draft[i * side + column] = !draft[i * side + column];
        }
        draft[index] = !draft[index];
      })
    );
  };

  const blankGame = (side: number) => {
    setSide(side);
    setGrid(newBoard(side));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {/* next hack worked but is a little ugly */}
      <div className="invisible grid grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9" />
      <div
        className={`grid grid-cols-${side} gap-3`}
        // style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
      >
        {grid.map((value, index) => (
          <div
            className={`${
              value ? "bg-yellow-400" : "bg-black"
            } rounded-full w-10 h-10 ${animate && " animate-ping"}`}
            key={index}
            onClick={() => {
              onClick(index);
              setAnimate(true);
            }}
            onAnimationEnd={() => setAnimate(false)}
          />
        ))}
      </div>
      <div className="absolute bottom-0 h-20 bg-gray-400 w-full pt-3">
        <div className="container mx-auto px-10">
          Side:
          <select
            className="mx-2"
            defaultValue={defaultSide}
            onChange={(e) => blankGame(parseInt(e.target.value))}
          >
            {[3, 4, 5, 6, 7, 8, 9].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
