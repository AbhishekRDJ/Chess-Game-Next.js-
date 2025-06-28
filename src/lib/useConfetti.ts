
import confetti from 'canvas-confetti';

export function launchConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#fcd34d', '#fbbf24', '#f87171', '#4ade80', '#60a5fa'],
  });
}
