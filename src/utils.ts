import { GridType, SquareState } from "./types";

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
    const currentColIsRight = currentRow === gridSize - 1;

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
