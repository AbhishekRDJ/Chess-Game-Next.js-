
export const playSound = (type: 'move' | 'capture' | 'check' | 'gameover'| 'celebration') => {
  const sounds: Record<string, string> = {
    move: '/pieces/move2.mp3',
    capture: '/pieces/capture2.mp3',
    // check: '/sounds/check.mp3',
    // gameover: '/sounds/gameover.mp3',
    celebration: '/celebration.mp3',
  };

  const sound = new Audio(sounds[type]);
  sound.play().catch((err) => console.error('Sound play error:', err));
};

