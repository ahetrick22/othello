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
    <Box w={"40px"} h={"40px"} border={"1px solid gray"} onClick={onClick}>
      <Box
        w={"36px"}
        h={"36px"}
        mt={"1px"}
        ml={"1px"}
        borderRadius={"50%"}
        bg={getSquareColor()}
      />
    </Box>
  );
};
