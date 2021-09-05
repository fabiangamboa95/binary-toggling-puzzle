/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useState } from "react";
import produce from "immer";
import { Transition, TransitionStatus } from "react-transition-group";

const newBoard = (side: number): boolean[] => Array(side ** 2).fill(false);
const defaultSide = 5;

const duration = 150;

const transitionStyles = {
  entering: { transform: "scale(1.2)" },
  entered: { transform: "scale(1)" },
  exiting: { transform: "scale(1.2)" },
  exited: { transform: "scale(1)" },
  unmounted: {},
};

const delay = 60;

const delayCI = (current: number, clicked: number, side: number): number => {
  if (Math.floor(current / side) === Math.floor(clicked / side)) {
    return Math.abs(current - clicked);
  }
  if (current % side === clicked % side) {
    return Math.abs(Math.floor(current / side) - Math.floor(clicked / side));
  }
  return 0;
};

const App = () => {
  const [side, setSide] = useState(defaultSide);
  const [grid, setGrid] = useState(Array(side ** 2).fill(false));
  const [clicked, setClicked] = useState(0);

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
          background-color: #eee;
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
            <Transition
              in={!!value}
              timeout={duration + (delayCI(index, clicked, side) * delay) / 1.2}
            >
              {(state: TransitionStatus) => (
                <div
                  style={{ ...transitionStyles[state] }}
                  css={css`
                    background-color: var(${value ? "--bWhite" : "--bBlack"});
                    border-radius: 99px;
                    width: 50px;
                    height: 50px;
                    box-shadow: rgba(0, 0, 0, 0.5) -0.666667px 5px 5px;
                    border: 1px solid black;
                    // pop animation
                    transition: all ${duration}ms ease-in-out;
                    transition-delay: ${delayCI(index, clicked, side) *
                    delay}ms;
                  `}
                  key={index}
                  onClick={() => {
                    setClicked(index);
                    onClick(index);
                  }}
                />
              )}
            </Transition>
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
