'use client';

import styles from './buttons.module.css';
import { useState, useEffect, useRef } from 'react';

export default function ButtonsPage() {
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridRef.current) return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // If we have a last position, fill in the gaps
    if (lastPos.current) {
      const { x: lastX, y: lastY } = lastPos.current;
      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(Math.floor(distance / 4), 1); // One step per 4 pixels

      for (let i = 0; i <= steps; i++) {
        const stepX = lastX + (dx * i) / steps;
        const stepY = lastY + (dy * i) / steps;
        const buttonX = Math.floor(stepX / 8);
        const buttonY = Math.floor(stepY / 8);
        const button = document.querySelector(
          `[data-x="${buttonX}"][data-y="${buttonY}"]`
        ) as HTMLButtonElement;

        if (button) {
          button.classList.add(styles.hovered);
          setTimeout(() => {
            button.classList.remove(styles.hovered);
          }, 1200);
        }
      }
    }

    lastPos.current = { x, y };
  };

  const handleMouseLeave = () => {
    lastPos.current = null;
  };

  const handleClick = (id: string) => {
    setLastClicked(id);
    setTimeout(() => setLastClicked(null), 300);
  };

  return (
    <div className={styles.container}>
      <div
        ref={gridRef}
        className={styles.grid}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: 125 }, (_, y) =>
          Array.from({ length: 125 }, (_, x) => (
            <button
              key={`${x}-${y}`}
              data-x={x}
              data-y={y}
              className={`${styles.button} ${
                lastClicked === `btn-${x}-${y}` ? styles.clicked : ''
              }`}
              onClick={() => handleClick(`btn-${x}-${y}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
