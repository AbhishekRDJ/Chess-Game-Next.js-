
export type Piece = {
  type: string;
  color: 'w' | 'b';
};

export type BoardState = (Piece | null)[][];

export type Pos = { row: number; col: number };

export const initialBoard: BoardState = [
  [
    { type: 'rook', color: 'b' },
    { type: 'knight', color: 'b' },
    { type: 'bishop', color: 'b' },
    { type: 'queen', color: 'b' },
    { type: 'king', color: 'b' },
    { type: 'bishop', color: 'b' },
    { type: 'knight', color: 'b' },
    { type: 'rook', color: 'b' },
  ],
  new Array(8).fill({ type: 'pawn', color: 'b' }),
  ...Array(4).fill(Array(8).fill(null)),
  new Array(8).fill({ type: 'pawn', color: 'w' }),
  [
    { type: 'rook', color: 'w' },
    { type: 'knight', color: 'w' },
    { type: 'bishop', color: 'w' },
    { type: 'queen', color: 'w' },
    { type: 'king', color: 'w' },
    { type: 'bishop', color: 'w' },
    { type: 'knight', color: 'w' },
    { type: 'rook', color: 'w' },
  ],
];
export function isKingAlive(board: BoardState, color: 'w' | 'b'): boolean {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'king' && piece.color === color) {
        return true;
      }
    }
  }
  return false; 
}

function isPathClear(board: BoardState, from: Pos, to: Pos): boolean {
  const rowStep = Math.sign(to.row - from.row);
  const colStep = Math.sign(to.col - from.col);

  let r = from.row + rowStep;
  let c = from.col + colStep;

  while (r !== to.row || c !== to.col) {
    if (board[r][c] !== null) return false;
    r += rowStep;
    c += colStep;
  }

  return true;
}

export function isValidMove(
  board: BoardState,
  from: Pos,
  to: Pos,
  turn: 'w' | 'b'
): boolean {
  const piece = board[from.row][from.col];
  if (!piece || piece.color !== turn) return false;

  const target = board[to.row][to.col];
  if (target && target.color === piece.color) return false;

  const direction = piece.color === 'w' ? -1 : 1;
  const rowDiff = to.row - from.row;
  const colDiff = to.col - from.col;
  const absRow = Math.abs(rowDiff);
  const absCol = Math.abs(colDiff);

  switch (piece.type) {
    case 'pawn': {
      const startRow = piece.color === 'w' ? 6 : 1;

      if (colDiff === 0 && rowDiff === direction && !target) return true;

      if (
        colDiff === 0 &&
        rowDiff === 2 * direction &&
        from.row === startRow &&
        !target &&
        !board[from.row + direction][from.col]
      )
        return true;

      if (
        absCol === 1 &&
        rowDiff === direction &&
        target &&
        target.color !== piece.color
      )
        return true;

      return false;
    }

    case 'rook': {
      if (from.row !== to.row && from.col !== to.col) return false;
      return isPathClear(board, from, to);
    }

    case 'knight': {
      return (
        (absRow === 2 && absCol === 1) || (absRow === 1 && absCol === 2)
      );
    }

    case 'bishop': {
      if (absRow !== absCol) return false;
      return isPathClear(board, from, to);
    }

    case 'queen': {
      const isDiagonal = absRow === absCol;
      const isStraight = from.row === to.row || from.col === to.col;
      if (!isDiagonal && !isStraight) return false;
      return isPathClear(board, from, to);
    }

    case 'king': {
      if (absRow <= 1 && absCol <= 1) return true;
      return false;
    }

    default:
      return false;
  }
}

