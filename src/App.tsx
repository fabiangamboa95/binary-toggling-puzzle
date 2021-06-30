import { useState } from "react";
import produce from "immer";

const App = () => {
  const side = 5;
  const [grid, setGrid] = useState(Array(side ** 2).fill(false));

  const onClick = (index: number) => {
    const row = Math.floor(index / side);
    const column = index % side;
    setGrid(
      produce(grid, (draft) => {
        for (let i = 0; i < side; i++) {
          draft[row * side + i] = !draft[row * side + i];
          draft[i * side + column] = !draft[i * side + column];
          draft[index] = !draft[index];
        }
      })
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div
        className={`grid grid-cols-${side} gap-3 grid-cols`}
        style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
      >
        {grid.map((value, index) => (
          <div
            className={`${
              value ? "bg-yellow-400" : "bg-black"
            } rounded-full w-10 h-10`}
            key={index}
            onClick={() => onClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
