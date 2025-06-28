import { useState } from 'react';

type Props = {
  type: string;
  color: 'w' | 'b';
  isSelected?: boolean;
  isAnimating?: boolean;
  isDragging?: boolean;
};

const pieceMap: Record<string, { w: string; b: string }> = {
  king: { w: '♔', b: '♚' },
  queen: { w: '♕', b: '♛' },
  rook: { w: '♖', b: '♜' },
  bishop: { w: '♗', b: '♝' },
  knight: { w: '♘', b: '♞' },
  pawn: { w: '♙', b: '♟' },
};

const pieceValues: Record<string, number> = {
  king: 100,
  queen: 9,
  rook: 5,
  bishop: 3,
  knight: 3,
  pawn: 1,
};

export default function Piece({ type, color, isSelected = false, isAnimating = false, isDragging = false }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  
  const pieceSymbol = pieceMap[type]?.[color];
  const pieceValue = pieceValues[type] || 0;
  
  if (!pieceSymbol) return null;

  return (
    <div 
      className="relative flex justify-center items-center w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Piece Glow Effect */}
      {(isSelected || isHovered) && (
        <div className={`absolute inset-0 rounded-full blur-sm transition-all duration-300 ${
          color === 'w' 
            ? 'bg-white bg-opacity-40 shadow-lg shadow-white/30' 
            : 'bg-gray-900 bg-opacity-60 shadow-lg shadow-gray-900/40'
        } ${isSelected ? 'animate-pulse scale-110' : 'scale-105'}`} />
      )}
      
      {/* Main Piece */}
      <span 
        className={`
          relative z-10 select-none font-bold transition-all duration-200 ease-out
          ${color === 'w' 
            ? 'text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] filter brightness-110' 
            : 'text-gray-900 drop-shadow-[1px_1px_2px_rgba(255,255,255,0.3)]'
          }
          ${isSelected ? 'text-4xl animate-bounce' : 'text-3xl'}
          ${isHovered ? 'scale-110 rotate-1' : 'scale-100'}
          ${isAnimating ? 'transition-transform duration-300 ease-in-out' : ''}
          ${isDragging ? 'scale-125 rotate-12 drop-shadow-2xl' : ''}
          hover:cursor-pointer
        `}
        style={{
          textShadow: color === 'w' 
            ? '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(255,255,255,0.3)' 
            : '1px 1px 2px rgba(255,255,255,0.5), 0 0 4px rgba(0,0,0,0.3)',
          filter: `contrast(1.1) saturate(1.2) ${isHovered ? 'brightness(1.2)' : 'brightness(1)'}`,
        }}
      >
        {pieceSymbol}
      </span>
      
      {/* Piece Value Indicator (for educational purposes) */}
      {isHovered && pieceValue > 0 && (
        <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
          color === 'w' 
            ? 'bg-blue-500 text-white' 
            : 'bg-red-500 text-white'
        } animate-fadeIn`}>
          {pieceValue === 100 ? '∞' : pieceValue}
        </div>
      )}
      
      {/* Selection Ring */}
      {isSelected && (
        <div className="absolute inset-0 opacity-75 border-2 border-yellow-400 rounded-full animate-ping" />
      )}
      
      {/* Hover Ring */}
      {isHovered && !isSelected && (
        <div className={`absolute inset-0 rounded-full border border-opacity-50 transition-all duration-200 ${
          color === 'w' ? 'border-white' : 'border-gray-700'
        }`} />
      )}
    </div>
  );
}