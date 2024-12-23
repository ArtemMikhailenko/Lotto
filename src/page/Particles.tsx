import React, { useEffect, useState } from 'react';
import styles from './TonLotteryCard.module.css';

const Particles: React.FC = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; directionX: number; directionY: number }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now(),
        x: Math.random() * 100,  // Позиція за шириною
        y: Math.random() * 100,  // Позиція за висотою
        size: Math.random() * 8 + 4,  // Розмір частинки
        directionX: Math.random() * 2 - 1,  // Рух ліво/право
        directionY: Math.random() * 2 - 1   // Рух вверх/вниз
      };
      setParticles((prev) => [...prev, newParticle]);

      // Видалення частинки через 5 секунд
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 3000);
    }, 1550);  // Створюємо нову частинку кожні 250 мс

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={styles.particle}
          style={{
            '--x': `${particle.x}%`,
            '--y': `${particle.y}%`,
            '--size': `${particle.size}px`,
            '--dx': `${particle.directionX * 80}px`,  // Напрямок по x
            '--dy': `${particle.directionY * 80}px`   // Напрямок по y
          } as React.CSSProperties}
        />
      ))}
    </>
  );
};

export default Particles;
