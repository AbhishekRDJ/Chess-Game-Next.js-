![image](https://github.com/user-attachments/assets/8a3ee7c3-75d2-4d35-bcb3-c01644415d15)
# Deployed Link : [Chess-Master-Next-JS](https://chess-next-drab.vercel.app/)
# ♟️ Chess Game - Next.js

A beautiful, interactive chess game built with Next.js, React, and TypeScript, featuring smooth animations, sound effects, and an elegant user interface.



## ✨ Features

### 🎮 Core Gameplay
- **Full Chess Logic**: Complete implementation of chess rules and piece movements
- **Turn-Based Play**: Alternating moves between white and black players
- **Move Validation**: Real-time validation of legal moves for all pieces
- **King Capture Victory**: Game ends when a king is captured (simplified chess rules)
- **Visual Move Indicators**: Highlighted valid moves and target squares

### 🎨 Visual Design
- **Modern UI**: Clean, gradient-based design with glassmorphism effects
- **Smooth Animations**: Piece hover effects, selection animations, and move transitions
- **Responsive Layout**: Optimized for different screen sizes
- **Beautiful Chess Pieces**: Unicode chess symbols with hover effects and shadows
- **Dynamic Board**: Alternating square colors with visual feedback for moves

### 🔊 Interactive Elements
- **Sound Effects**: Move sounds, capture sounds, and victory celebrations
- **Confetti Animation**: Celebration effects when a player wins
- **Hover Effects**: Interactive piece and square highlighting
- **Visual Feedback**: Selected pieces, valid moves, and last move indicators

### 🏆 Game Management
- **Win Detection**: Automatic detection when a king is captured
- **Victory Screen**: Celebratory message with winner announcement
- **Rematch Functionality**: "Play Again" button to reset the game
- **Turn Indicator**: Clear display of whose turn it is to move

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ with App Router
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Hooks (useState)
- **Sound**: Custom sound library integration
- **Animations**: CSS animations and Tailwind transitions

## 📁 Project Structure

```
chess-next/
├── app/
│   ├── page.tsx         → Home screen (Board UI)
│   └── api/
│       └── game/route.ts → Backend route (game data or multiplayer later)
├── components/
│   ├── ChessBoard.tsx   → Renders the board
│   └── Piece.tsx        → Handles rendering individual pieces
├── lib/
│   └── logic.ts         → All game logic (moves, turns, etc.)
├── styles/
│   └── globals.css
├── public/
│   └── pieces/          → Piece images (SVG or PNG)
├── tailwind.config.js
└── next.config.js

```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chess-game-nextjs.git
   cd chess-next
   ```

2. **Install dependencies**
   ```bash
   npm install OR npm i
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start playing!

### Build for Production

```bash
npm run build
npm start
```

## 🎮 How to Play

1. **Start**: White pieces move first
2. **Select**: Click on a piece to select it (highlighted in yellow)
3. **Move**: Click on a valid square to move the piece
4. **Capture**: Move to an opponent's square to capture their piece
5. **Win**: Capture the opponent's king to win the game
6. **Rematch**: Click "Play Again" to start a new game

## 🎯 Key Components

### ChessBoard Component
- Main game component managing board state and user interactions
- Handles piece selection, move validation, and game flow
- Manages animations and visual feedback
- Integrates sound effects and celebrations

### Game Logic (`lib/logic.ts`)
- Complete chess piece movement rules
- Board state management
- Move validation system
- Win condition detection

### Visual Effects
- Piece hover animations with scale and shadow effects
- Board square highlighting for selections and valid moves
- Smooth transitions for piece movements
- Gradient backgrounds and glassmorphism effects

## 🎨 Design Features

- **Color Scheme**: Warm amber and orange gradients with white accents
- **Typography**: Clean, modern fonts with appropriate sizing
- **Spacing**: Generous padding and margins for comfortable gameplay
- **Shadows**: Subtle drop shadows and glows for depth
- **Animations**: Smooth transitions and hover effects throughout

## 🔧 Technical Highlights

- **Type Safety**: Full TypeScript implementation with proper typing
- **Performance**: Optimized rendering with React best practices
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Responsive Design**: Mobile-friendly layout and interactions
- **Modern CSS**: Advanced Tailwind utilities and custom animations

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Future Enhancements

- [ ] **Multiplayer Support**: Online gameplay with WebSocket integration
- [ ] **Chess Timer**: Time controls for competitive play
- [ ] **Move History**: Record and replay game moves
- [ ] **AI Opponent**: Computer player with different difficulty levels
- [ ] **Tournament Mode**: Multi-game tournaments with scoring
- [ ] **Custom Themes**: Different board and piece designs
- [ ] **Chess Notation**: Standard algebraic notation display
- [ ] **Game Analysis**: Move suggestions and position evaluation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Chess piece Unicode symbols
- Tailwind CSS for styling utilities
- Next.js team for the amazing framework
- React team for the powerful library

## 📞 Contact

Your Name - Abhishek Sangule
[@yourusername]([https://instagram.com/yourusername](https://www.instagram.com/abhishekidz207/)) 
email - abhisheksangule6@gmail.com

Project Link: [https://github.com/yourusername/chess-game-nextjs](https://github.com/AbhishekRDJ/chess-game-nextjs)

---

**Built with ❤️ using Next.js and modern web technologies**
