'use client';
import { launchConfetti } from '@/lib/useConfetti';

import { playSound } from '@/lib/useSound';
import { isValidMove, initialBoard, BoardState, isKingAlive } from '@/lib/logic';
import { useState } from 'react';

type Pos = { row: number; col: number };

function PieceComponent({ type, color }: { type: string; color: 'w' | 'b' }) {
  const pieceSymbols = {
    king: color === 'w' ? '♔' : '♚',
    queen: color === 'w' ? '♕' : '♛',
    rook: color === 'w' ? '♖' : '♜',
    bishop: color === 'w' ? '♗' : '♝',
    knight: color === 'w' ? '♘' : '♞',
    pawn: color === 'w' ? '♙' : '♟',
  };

  return (
    <div className="group relative">
      <div className={`
        text-4xl font-bold select-none cursor-pointer
        transition-all duration-300 ease-out
        transform group-hover:scale-110 group-hover:-translate-y-1
        filter drop-shadow-lg group-hover:drop-shadow-2xl
        ${color === 'w' ? 'text-white' : 'text-gray-900'}
        animate-[fadeIn_0.5s_ease-out]
      `}>
        {pieceSymbols[type as keyof typeof pieceSymbols]}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
    </div>
  );
}

export default function ChessBoard() {
  const [board, setBoard] = useState<BoardState>(initialBoard);
  const [selectedPos, setSelectedPos] = useState<Pos | null>(null);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [validMoves, setValidMoves] = useState<Set<string>>(new Set());
  const [lastMove, setLastMove] = useState<{ from: Pos, to: Pos } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameOver, setGameOver] = useState<'w' | 'b' | null>(null);

  const getValidMovesForPiece = (pos: Pos) => {
    const moves = new Set<string>();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValidMove(board, pos, { row, col }, turn)) {
          moves.add(`${row}-${col}`);
        }
      }
    }
    return moves;
  };

  const handleRematch = () => {
    setBoard(initialBoard);
    setSelectedPos(null);
    setTurn('w');
    setValidMoves(new Set());
    setLastMove(null);
    setIsAnimating(false);
    setGameOver(null);
  };

  const handleSquareClick = (row: number, col: number) => {
    if (isAnimating || gameOver) return;

    const clickedPiece = board[row][col];

    if (!selectedPos) {
      if (clickedPiece && clickedPiece.color === turn) {
        const newPos = { row, col };
        setSelectedPos(newPos);
        setValidMoves(getValidMovesForPiece(newPos));
      }
      return;
    }

    const from = selectedPos;
    const to = { row, col };

    if ((from.row !== to.row || from.col !== to.col) && isValidMove(board, from, to, turn)) {
      setIsAnimating(true);
      const pieceToMove = board[from.row][from.col];
      const captured = board[to.row][to.col];
      const newBoard = board.map((r) => r.slice());

      newBoard[to.row][to.col] = pieceToMove;
      newBoard[from.row][from.col] = null;

      setTimeout(() => {
        setBoard(newBoard);
        setTurn(turn === 'w' ? 'b' : 'w');
        setLastMove({ from, to });

        if (captured) {
          playSound('capture');
        } else {
          playSound('move');
        }

        const enemy = turn === 'w' ? 'b' : 'w';
        if (!isKingAlive(newBoard, enemy)) {
          setGameOver(turn); 
          playSound('celebration');
          launchConfetti();
        }

        setIsAnimating(false);
      }, 300);
    }

    setSelectedPos(null);
    setValidMoves(new Set());
  };

  const isLastMoveSquare = (row: number, col: number) =>
    lastMove && ((lastMove.from.row === row && lastMove.from.col === col) ||
      (lastMove.to.row === row && lastMove.to.col === col));

  const isValidMoveSquare = (row: number, col: number) =>
    validMoves.has(`${row}-${col}`);

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 p-8 min-h-screen">
      {gameOver && (
        <div className="bg-white/90 shadow-2xl backdrop-blur-sm mt-4 mb-20 px-8 py-6 border border-white/50 rounded-2xl">
          <div className="text-center">
            <div className="mb-4 font-bold text-green-600 text-3xl animate-pulse">
              🎉 {gameOver === 'w' ? 'White' : 'Black'} Wins! 🎉
            </div>
            <p className="mb-4 text-gray-700 text-lg">
              Victory by capturing the king!
            </p>
            <button
              onClick={handleRematch}
              className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl px-8 py-3 rounded-xl font-bold text-white hover:scale-105 transition-all duration-300 transform"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-3 bg-white/80 shadow-lg backdrop-blur-sm px-6 py-3 border border-white/50 rounded-2xl transition-all duration-500 ease-out">
          <div className={`
            w-4 h-4 rounded-full transition-all duration-300
            ${turn === 'w' ? 'bg-white border-2 border-gray-600 shadow-md' : 'bg-gray-800 shadow-md'}
          `} />
          <span className="font-semibold text-lg">
            {turn === 'w' ? 'White' : 'Black'} to move
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 opacity-30 blur-xl rounded-3xl animate-pulse" />
        <div className="relative grid grid-cols-8 bg-amber-100 shadow-2xl border-8 border-amber-800 rounded-2xl overflow-hidden">
          {board.map((row, rowIndex) =>
            row.map((square, colIndex) => {
              const isBlack = (rowIndex + colIndex) % 2 === 1;
              const isSelected = selectedPos?.row === rowIndex && selectedPos?.col === colIndex;
              const isValid = isValidMoveSquare(rowIndex, colIndex);
              const isLast = isLastMoveSquare(rowIndex, colIndex);
              const hasTargetPiece = square && isValid;

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  className={`
                    relative w-20 h-20 flex items-center justify-center cursor-pointer
                    transition-all duration-300 ease-out transform
                    hover:scale-105 hover:z-10
                    ${isBlack ? 'bg-gradient-to-br from-amber-700 to-amber-800' : 'bg-gradient-to-br from-amber-100 to-amber-200'}
                    ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-80 shadow-lg shadow-yellow-400/50 scale-105 z-20' : ''}
                    ${isLast ? 'ring-2 ring-blue-400 ring-opacity-60 bg-gradient-to-br from-blue-200/30 to-blue-300/30' : ''}
                  `}
                >
                  {isValid && !hasTargetPiece && (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <div className="bg-green-400 opacity-70 shadow-lg rounded-full w-6 h-6 animate-pulse" />
                    </div>
                  )}
                  {hasTargetPiece && (
                    <div className="absolute inset-0 bg-red-400/40 border-2 border-red-500 border-dashed rounded-lg animate-pulse" />
                  )}
                  <div className={`absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-200 ${isBlack ? 'bg-white' : 'bg-black'}`} />
                  {square && (
                    <div className={`z-10 transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}>
                      <PieceComponent type={square.type} color={square.color} />
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 via-yellow-400/40 to-yellow-300/30 rounded-lg animate-pulse" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-6 text-gray-600 text-center">
        <div className="bg-white/60 shadow-md backdrop-blur-sm px-4 py-2 rounded-xl">
          <p className="text-sm">Click a piece to select, then click a valid square to move</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}