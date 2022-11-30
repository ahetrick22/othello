import React from "react";
import { Box } from "@chakra-ui/react";
import { CurrentTurn, SquareAdjacents, SquareState } from "src/types";

type GameState = {
  grid: { [key: number]: { current: SquareState; adjacents: SquareAdjacents } };
  currentTurn: CurrentTurn;
};

const initialGameState: GameState = {
  grid: {},
  currentTurn: CurrentTurn.black,
};

function App() {
  return <Box></Box>;
}

export default App;
