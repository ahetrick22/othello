import { GridSquare, GridType, SquareState } from "./types";

export const initializeGrid = (gridSize: number) => {
  if (gridSize % 2 !== 0 || gridSize < 4) {
    throw new Error("Grid size must be an even number greater than 2");
  }

  const gridIndexMax = gridSize * gridSize;

  const grid: GridType = {};

  for (let i = 0; i < gridIndexMax; i++) {
    const currentRow = Math.floor(i / gridSize);
    const currentCol = i % gridSize;

    // set the conditionals for the edges
    const currentRowIsTop = currentRow === 0;
    const currentRowIsBottom = currentRow === gridSize - 1;
    const currentColIsLeft = currentCol === 0;
    const currentColIsRight = currentCol === gridSize - 1;

    // build the grid of an empty square and all adjacents for each key (null if no adjacent in position)
    grid[i] = {
      current: SquareState.notPlayed,
      adjacents: {
        top: currentRowIsTop ? null : i - gridSize,
        topRight:
          currentRowIsTop || currentColIsRight ? null : i - gridSize + 1,
        topLeft: currentRowIsTop || currentColIsLeft ? null : i - gridSize - 1,
        left: currentColIsLeft ? null : i - 1,
        right: currentColIsRight ? null : i + 1,
        bottomRight:
          currentRowIsBottom || currentColIsRight ? null : i + gridSize + 1,
        bottom: currentRowIsBottom ? null : i + gridSize,
        bottomLeft:
          currentRowIsBottom || currentColIsLeft ? null : i + gridSize - 1,
      },
    };

    // set the starters
    const gridMidpoint = gridIndexMax / 2;
    if (i === gridMidpoint - gridSize / 2 - 1) {
      grid[i].current = SquareState.white;
    }
    if (i === gridMidpoint - gridSize / 2) {
      grid[i].current = SquareState.black;
    }
    if (i === gridMidpoint + gridSize / 2 - 1) {
      grid[i].current = SquareState.black;
    }
    if (i === gridMidpoint + gridSize / 2) {
      grid[i].current = SquareState.white;
    }
  }

  return grid;
};

export const getCurrentScore = (grid: GridType) => {
  const black = Object.values(grid).filter(
    (square) => square.current === SquareState.black
  );
  const white = Object.values(grid).filter(
    (square) => square.current === SquareState.white
  );
  return {
    black: black.length,
    white: white.length,
  };
};

export const checkSquare = (
  currentSquare: GridSquare,
  currentSquareIndex: string,
  playerColor: SquareState,
  opponentColor: SquareState,
  adjSquareDirection: string,
  positionsToSwap: string[],
  grid: GridType
) => {
  // invalid move - we either hit the edge or an unplayed square
  if (
    (currentSquare.adjacents[adjSquareDirection] === null ||
      currentSquare.current === SquareState.notPlayed) &&
    currentSquare.current !== playerColor
  ) {
    return null;
  }
  // if still the opponent color, continue to recurse over direction
  else if (currentSquare.current === opponentColor) {
    positionsToSwap.push(currentSquareIndex);
    return checkSquare(
      grid[currentSquare.adjacents[adjSquareDirection]],
      currentSquare.adjacents[adjSquareDirection],
      playerColor,
      opponentColor,
      adjSquareDirection,
      positionsToSwap,
      grid
    );
    // valid move and complete array
  } else {
    positionsToSwap.push(currentSquareIndex);
  }
  return positionsToSwap;
};
