import React, { useState, useEffect } from "react";
import styles from "./TicketSelector.module.css";
import { Link } from "react-router-dom";

// Оголошуємо тип для частинок
type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
};

// Тип для карточок з бекенду
type Card = {
  _id: string; // або number, якщо id числовий
  id: number;
};

const TicketSelector: React.FC = () => {
  const [ticketNumber, setTicketNumber] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [availableCards, setAvailableCards] = useState<Card[]>([]); // Типізація масиву карток

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    fetch("https://ref-app-backend.onrender.com/cards")
      .then((res) => res.json())
      .then((data: Card[]) => {
        console.log("Полученные карточки:", data);
        setAvailableCards(data); // Очікуємо масив об'єктів типу Card
      })
      .catch((err) => console.error("Ошибка при получении карточек:", err));
  }, []);

  const generateRandomTicket = () => {
    const randomNumber = Math.floor(Math.random() * 1000 + 1);
    setTicketNumber(randomNumber.toString().padStart(4, "0"));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setTicketNumber(value);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.particlesContainer}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.speed}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.card}>
        <div className={styles.cornerTL} />
        <div className={styles.cornerTR} />
        <div className={styles.cornerBL} />
        <div className={styles.cornerBR} />

        <div className={styles.header}>
          <div className={styles.glowCircle} />
          <h1 className={styles.title}>TON LOTTERY</h1>
          <div className={styles.statusBar}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>MAINNET CONNECTED</span>
            <div className={styles.statusLine} />
          </div>
        </div>

        <div className={styles.ticketSection}>
          <div className={styles.decorativeCircle}>
            <div className={styles.circleInner} />
          </div>

          <div className={styles.inputContainer}>
            <div
              className={`${styles.inputWrapper} ${
                isInputFocused ? styles.inputWrapperFocused : ""
              }`}
            >
              <input
                type="text"
                value={ticketNumber}
                onChange={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder="0000"
                className={styles.input}
                maxLength={4}
              />
              <div className={styles.inputOverlay} />
            </div>

            <button
              onClick={generateRandomTicket}
              className={styles.randomButton}
            >
              <span className={styles.buttonGlow} />
              <span className={styles.buttonText}>RANDOM</span>
            </button>
          </div>
        </div>

        <button className={styles.checkButton}>
          <span className={styles.buttonRipple} />
          <span className={styles.buttonContent}>
            CHECK TICKET
            <svg className={styles.buttonArrow} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </button>

        <div className={styles.infoPanel}>
          <div className={styles.infoPanelItem}>
            <span className={styles.infoLabel}>POOL</span>
            <span className={styles.infoValue}>156.8K TON</span>
          </div>
          <div className={styles.infoPanelItem}>
            <span className={styles.infoLabel}>TIME LEFT</span>
            <span className={styles.infoValue}>24H</span>
          </div>
        </div>

        <div className={styles.availableCards}>
          <h2 className={styles.availableCardsTitle}>AVAILABLE CARDS</h2>

          <div className={styles.cardsListWrapper}>
            <div className={styles.cardsGrid}>
              {availableCards.map((cardData) => (
                <Link
                key={cardData._id}
                to={`/lottery-ticket/${cardData._id}`}
                className={styles.cardItem}
              >
                <span className={styles.cardNumber}>#{cardData.id}</span>
              </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelector;
