import React, { useState } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { CurrentTurn, GridSquare, GridType, SquareState } from "./types";
import { initializeGrid } from "./utils";
import { GameSquare } from "./components/GameSquare";

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

  const checkSquare = (
    currentSquare: GridSquare,
    currentSquareIndex: string,
    playerColor: SquareState,
    opponentColor: SquareState,
    adjSquareDirection: string,
    positionsToSwap: string[]
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
        positionsToSwap
      );
      // valid move and complete array
    } else {
      positionsToSwap.push(currentSquareIndex);
    }
    return positionsToSwap;
  };

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
    const opponentAdjacent = adjacentSquares.filter(
      (key) =>
        squareValue.adjacents[key] &&
        grid[squareValue.adjacents[key]].current === opponentColor
    );

    // if the spot isn't adjacent to any opponent piece, it's not valid
    if (!opponentAdjacent.length) {
      return null;
    }

    let updatedGrid = {
      ...grid,
    };
    let moveWasMade = false;

    // otherwise, check validity of move across each adjacent direction
    opponentAdjacent.forEach((adjSquareDirection) => {
      const firstSquareToCheck =
        grid[squareValue.adjacents[adjSquareDirection]];
      const positionsToSwap: string[] = [squareIndex];

      const positions = checkSquare(
        firstSquareToCheck,
        squareValue.adjacents[adjSquareDirection],
        playerColor,
        opponentColor,
        adjSquareDirection,
        positionsToSwap
      );

      if (positions) {
        moveWasMade = true;

        positions.forEach((pos) => {
          updatedGrid = {
            ...updatedGrid,
            [pos]: { ...updatedGrid[pos], current: playerColor },
          };
        });
      }
    });
    if (moveWasMade) {
      const newPlayerTurn =
        currentTurn === CurrentTurn.white
          ? CurrentTurn.black
          : CurrentTurn.white;

      // check if the game is over
      if (!isRemainingValidMove(newPlayerTurn, updatedGrid)) {
        setState((prevState) => ({
          ...prevState,
          grid: updatedGrid,
          currentTurn: CurrentTurn.endState,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          grid: updatedGrid,
          currentTurn: newPlayerTurn,
        }));
      }
    }
  };

  const isRemainingValidMove = (
    currentPlayerTurn: CurrentTurn,
    currentGrid: GridType
  ) => {
    // if game happens to be over already, no valid moves
    if (currentPlayerTurn === CurrentTurn.endState) {
      return false;
    }

    // if all spaces are played, no valid moves
    if (
      !Object.keys(currentGrid).find(
        (key) => currentGrid[key].current === SquareState.notPlayed
      )
    ) {
      return false;
    }

    const opponentColor =
      currentPlayerTurn === CurrentTurn.black
        ? SquareState.white
        : SquareState.black;
    const playerColor =
      opponentColor === SquareState.black
        ? SquareState.white
        : SquareState.black;

    let validMoveFound = false;

    Object.keys(currentGrid).forEach((key) => {
      // if we haven't already found a valid move, keep checking
      if (!validMoveFound) {
        const squareValue = currentGrid[key];

        const adjacentSquares = Object.keys(squareValue.adjacents);
        const opponentAdjacent = adjacentSquares.filter(
          (key) =>
            squareValue.adjacents[key] &&
            grid[squareValue.adjacents[key]].current === opponentColor
        );

        // See if there are valid positions
        opponentAdjacent.forEach((adjSquareDirection) => {
          const firstSquareToCheck =
            grid[squareValue.adjacents[adjSquareDirection]];
          const positionsToSwap: string[] = [key];

          const positions = checkSquare(
            firstSquareToCheck,
            squareValue.adjacents[adjSquareDirection],
            playerColor,
            opponentColor,
            adjSquareDirection,
            positionsToSwap
          );

          if (positions) {
            validMoveFound = true;
          }
        });
      }
    });
    return validMoveFound;
  };

  const resetGame = () => setState(initialGameState);

  return (
    <Box>
      <Heading>OTHELLO</Heading>
      <SimpleGrid columns={GRID_SIZE} spacing={0} maxWidth={42 * GRID_SIZE}>
        {Object.keys(grid).map((squareKey, i) => (
          <GameSquare
            key={i}
            onClick={() => handleSquareSelect(squareKey)}
            current={grid[squareKey].current}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default App;
