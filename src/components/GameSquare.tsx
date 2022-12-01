import { Box } from "@chakra-ui/react";
import React from "react";
import { SquareState } from "../types";

export const GameSquare = ({
  onClick,
  current,
}: {
  onClick: () => void;
  current: SquareState;
}) => {
  const getSquareColor = () => {
    switch (current) {
      case SquareState.black:
        return "#000";
      case SquareState.white:
        return "#FFF";
      case SquareState.notPlayed:
        return "transparent";
    }
  };

  return (
    <Box w={40} h={40} border={"1px solid gray"} onClick={onClick}>
      <Box
        w={36}
        h={36}
        mt={1}
        ml={1}
        borderRadius={"50%"}
        bg={getSquareColor()}
      />
    </Box>
  );
};
