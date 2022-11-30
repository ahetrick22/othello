export enum CurrentTurn {
  white = "white",
  black = "black",
  endState = "endState",
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

export type GridType = {
  [key: number]: {
    current: SquareState;
    adjacents: SquareAdjacents;
  };
};
