import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { CurrentTurn, GridType } from "./types";
import { initializeGrid } from "./utils";

type GameState = {
  grid: GridType;
  currentTurn: CurrentTurn;
};

const initialGameState: GameState = {
  grid: initializeGrid(8),
  currentTurn: CurrentTurn.black,
};

function App() {
  const [{ grid, currentTurn }, setState] =
    useState<GameState>(initialGameState);

  console.log(grid);

  return <Box></Box>;
}

export default App;
