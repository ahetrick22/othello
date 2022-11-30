import React, { useState } from "react";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { CurrentTurn, GridType } from "./types";
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

  const resetGame = () => setState(initialGameState);

  return (
    <Box>
      <Heading>OTHELLO</Heading>
      <SimpleGrid columns={GRID_SIZE} spacing={0} maxWidth={42 * GRID_SIZE}>
        {Object.keys(grid).map((square, i) => (
          <Box w={40} h={40} key={i} border={"1px solid gray"}>
            {grid[square].current[0]}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default App;
