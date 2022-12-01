export enum CurrentTurn {
  white = "White",
  black = "Black",
  endState = "Game over",
}

export enum SquareState {
  notPlayed = "notPlayed",
  white = "white",
  black = "black",
}

type AdjacentType = number | null;

type SquareAdjacents = {
  topLeft: AdjacentType;
  top: AdjacentType;
  topRight: AdjacentType;
  left: AdjacentType;
  right: AdjacentType;
  bottomRight: AdjacentType;
  bottom: AdjacentType;
  bottomLeft: AdjacentType;
};

export type GridSquare = {
  current: SquareState;
  adjacents: SquareAdjacents;
};

export type GridType = {
  [key: string]: GridSquare;
};
