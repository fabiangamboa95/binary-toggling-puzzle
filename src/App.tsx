/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
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
    <div
      css={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh - 40px;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(${side}, minmax(0, 1fr));
            gap: 20px;
          `}
        >
          {grid.map((value, index) => (
            <div
              css={css`
                background-color: var(${value ? "--bWhite" : "--bBlack"});
                border-radius: 99px;
                width: 50px;
                height: 50px;
                box-shadow: rgba(0, 0, 0, 0.5) -0.666667px 5px 5px;
                border: 1px solid black;
              `}
              key={index}
              onClick={() => {
                onClick(index);
                setAnimate(true);
              }}
              onAnimationEnd={() => setAnimate(false)}
            />
          ))}
        </div>
      </div>
      <div
        css={css`
          height: 40px;
          background-color: gray;
          width: 100%;
          padding-top: 3px;
        `}
      >
        <div style={{ marginLeft: 30 }}>
          Side:
          <select
            style={{ margin: "0 12px" }}
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
