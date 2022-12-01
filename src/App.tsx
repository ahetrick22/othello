import React, { useState } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { CurrentTurn, GridSquare, GridType, SquareState } from "./types";
import { initializeGrid } from "./utils";

type GameState = {
  grid: GridType;
  currentTurn: CurrentTurn;
};

const GRID_SIZE = 8;

const initialGameState: GameState = {
  grid: initializeGrid(GRID_SIZE),
  currentTurn: CurrentTurn.black,
};

function App() {
  const [{ grid, currentTurn }, setState] =
    useState<GameState>(initialGameState);

  const handleSquareSelect = (squareIndex: string) => {
    const squareValue = grid[squareIndex];
    // if the game is over, nothing is valid
    if (currentTurn === CurrentTurn.endState) {
      return null;
    }

    // if the selected square is already played, it's not valid
    if (squareValue.current !== SquareState.notPlayed) {
      return null;
    }

    const opponentColor =
      currentTurn === CurrentTurn.black ? SquareState.white : SquareState.black;
    const playerColor =
      opponentColor === SquareState.black
        ? SquareState.white
        : SquareState.black;

    // find the valid adjacent squares - these are the ones that might turn
    const adjacentSquares = Object.keys(squareValue.adjacents);
    console.log({ adjacentSquares }, squareValue.adjacents);
    const opponentAdjacent = adjacentSquares.filter(
      (key) =>
        squareValue.adjacents[key] &&
        grid[squareValue.adjacents[key]].current === opponentColor
    );

    // if the spot isn't adjacent to any opponent piece, it's not valid
    if (!opponentAdjacent.length) {
      return null;
    }

    // otherwise, check validity of move across each adjacent direction
    opponentAdjacent.forEach((adjSquareDirection) => {
      let positionsToSwap: string[] = [squareIndex];

      const checkSquare = (
        currentSquare: GridSquare,
        currentSquareIndex: string
      ) => {
        // valid move and complete array
        if (currentSquare.current === playerColor) {
          positionsToSwap.forEach((pos) => {
            setState((prevState) => ({
              ...prevState,
              grid: {
                ...prevState.grid,
                [pos]: { ...prevState.grid[pos], current: playerColor },
              },
            }));
          });
        }
        // invalid move - we either hit the edge or an unplayed square
        if (
          currentSquare.adjacents[adjSquareDirection] === null ||
          currentSquare.current === SquareState.notPlayed
        ) {
          positionsToSwap = [];
        }
        // if still the opponent color, continue to recurse over direction
        if (currentSquare.current === opponentColor) {
          positionsToSwap.push(currentSquareIndex);
          checkSquare(
            grid[currentSquare.adjacents[adjSquareDirection]],
            currentSquare.adjacents[adjSquareDirection]
          );
        }
      };
      const firstSquareToCheck =
        grid[squareValue.adjacents[adjSquareDirection]];

      checkSquare(
        firstSquareToCheck,
        squareValue.adjacents[adjSquareDirection]
      );
    });

    // check if the game is over, otherwise update the turn
    if (currentTurn === CurrentTurn.black) {
      setState((prevState) => ({
        ...prevState,
        currentTurn: CurrentTurn.white,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        currentTurn: CurrentTurn.black,
      }));
    }
  };

  const resetGame = () => setState(initialGameState);

  return (
    <Box>
      <Heading>OTHELLO</Heading>
      <SimpleGrid columns={GRID_SIZE} spacing={0} maxWidth={42 * GRID_SIZE}>
        {Object.keys(grid).map((square, i) => (
          <Box
            w={40}
            h={40}
            key={i}
            border={"1px solid gray"}
            onClick={() => handleSquareSelect(square)}
          >
            {grid[square].current[0]}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default App;
