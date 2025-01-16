'use client';

import styles from './buttons.module.css';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Pencil, Gamepad2, Image, Eraser, Shapes, Sparkles } from 'lucide-react';

type Mode = 'freedraw' | 'snake' | 'picture' | 'shapes' | 'rain' | 'eraser';
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const INITIAL_SNAKE: Position[] = [{ x: 62, y: 62 }];

export default function ButtonsPage() {
  const generateNewFood = (existingSnake: Position[], existingFood: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * 125),
        y: Math.floor(Math.random() * 125)
      };
    } while (
      existingSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y) ||
      existingFood.some(food => food.x === newFood.x && food.y === newFood.y)
    );
    return newFood;
  };

  const generateInitialFood = () => {
    const food1 = generateNewFood(INITIAL_SNAKE, []);
    const food2 = generateNewFood(INITIAL_SNAKE, [food1]);
    const food3 = generateNewFood(INITIAL_SNAKE, [food1, food2]);
    return [food1, food2, food3];
  };

  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<Mode>('freedraw');
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [foodItems, setFoodItems] = useState<Position[]>(generateInitialFood());
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [gameLoopRef, nextDirectionRef] = [useRef<NodeJS.Timeout | undefined>(undefined), useRef<Direction>('RIGHT')];

  // Initial state setup
  const initializeGame = () => {
    const newFood1 = generateNewFood(INITIAL_SNAKE, []);
    const newFood2 = generateNewFood(INITIAL_SNAKE, [newFood1]);
    const newFood3 = generateNewFood(INITIAL_SNAKE, [newFood1, newFood2]);

    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    setGameStarted(false);
    setFoodItems([newFood1, newFood2, newFood3]);
  };

  // Reset game with initial food
  useEffect(() => {
    if (currentMode === 'snake') {
      initializeGame();
    }
    return () => clearInterval(gameLoopRef.current);
  }, [currentMode]);

  // Update the reset button click handler
  const handleReset = () => {
    initializeGame();
  };

  // Game logic
  useEffect(() => {
    if (currentMode === 'snake' && gameStarted && !isGameOver) {
      const baseSpeed = 8;
      const minSpeed = 6;
      const speedReduction = 0.05;

      const currentSpeed = Math.max(minSpeed, baseSpeed - (score * speedReduction));

      const moveSnake = () => {
        setSnake(prevSnake => {
          setDirection(nextDirectionRef.current);
          const head = { ...prevSnake[0] };

          switch (nextDirectionRef.current) {
            case 'UP':
              head.y = (head.y - 1 + 125) % 125;
              break;
            case 'DOWN':
              head.y = (head.y + 1) % 125;
              break;
            case 'LEFT':
              head.x = (head.x - 1 + 125) % 125;
              break;
            case 'RIGHT':
              head.x = (head.x + 1) % 125;
              break;
          }

          if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
            setIsGameOver(true);
            return prevSnake;
          }

          const newSnake = [head, ...prevSnake];

          // Check if any food is eaten
          const eatenFoodIndex = foodItems.findIndex(food => food.x === head.x && food.y === head.y);

          if (eatenFoodIndex !== -1) {
            setScore(prev => prev + 1);
            setFoodItems(prev => {
              const newFood = generateNewFood(newSnake, prev);
              const additionalFood = generateNewFood(newSnake, [...prev, newFood]);
              return [...prev.filter((_, i) => i !== eatenFoodIndex), newFood, additionalFood];
            });
          } else {
            newSnake.pop();
          }

          return newSnake;
        });
      };

      gameLoopRef.current = setInterval(moveSnake, currentSpeed);

      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [currentMode, direction, gameStarted, isGameOver, score]);

  // Free Draw Logic
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridRef.current || currentMode !== 'freedraw') return;

    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastPos.current) {
      const { x: lastX, y: lastY } = lastPos.current;
      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(Math.floor(distance / 4), 1);

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

  const modes = [
    { id: 'freedraw', icon: Pencil, label: 'Free Draw' },
    { id: 'snake', icon: Gamepad2, label: 'Snake Game' },
    { id: 'picture', icon: Image, label: 'Picture Mode' },
    { id: 'shapes', icon: Shapes, label: 'Shapes' },
    { id: 'rain', icon: Sparkles, label: 'Matrix Rain' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
  ];

  // Keyboard controls
  useEffect(() => {
    if (currentMode === 'snake') {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (!gameStarted && e.key === ' ') {
          setGameStarted(true);
          return;
        }

        switch (e.key) {
          case 'ArrowUp':
            if (direction !== 'DOWN') nextDirectionRef.current = 'UP';
            break;
          case 'ArrowDown':
            if (direction !== 'UP') nextDirectionRef.current = 'DOWN';
            break;
          case 'ArrowLeft':
            if (direction !== 'RIGHT') nextDirectionRef.current = 'LEFT';
            break;
          case 'ArrowRight':
            if (direction !== 'LEFT') nextDirectionRef.current = 'RIGHT';
            break;
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [direction, currentMode, gameStarted]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.controlPanel}>
        {modes.map((mode) => (
          <button
            key={mode.id}
            className={`${styles.modeButton} ${currentMode === mode.id ? styles.active : ''}`}
            onClick={() => setCurrentMode(mode.id as Mode)}
          >
            <mode.icon size={20} />
            <span>{mode.label}</span>
          </button>
        ))}

        {currentMode === 'snake' && (
          <div className={styles.scoreBoard}>
            <h3>Score: {score}</h3>
            {!gameStarted && !isGameOver && (
              <p>Press SPACE to start</p>
            )}
            {isGameOver && (
              <div>
                <p>Game Over!</p>
                <button
                  className={styles.resetButton}
                  onClick={handleReset}
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.container}>
        <div
          ref={gridRef}
          className={styles.grid}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background grid */}
          {Array.from({ length: 125 }, (_, y) =>
            Array.from({ length: 125 }, (_, x) => (
              <button
                key={`${x}-${y}`}
                data-x={x}
                data-y={y}
                className={styles.button}
                onClick={() => handleClick(`btn-${x}-${y}`)}
              />
            ))
          )}

          {/* Snake body */}
          {currentMode === 'snake' && snake.map((segment, index) => (
            <div
              key={`snake-${index}`}
              className={index === 0 ? styles.snakeHead : styles.snake}
              style={{
                transform: `translate(${segment.x * 8}px, ${segment.y * 8}px)`
              }}
            />
          ))}

          {/* Multiple Food Items */}
          {currentMode === 'snake' && foodItems.map((food, index) => (
            <div
              key={`food-${index}`}
              className={styles.food}
              style={{
                transform: `translate(${food.x * 8}px, ${food.y * 8}px)`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
