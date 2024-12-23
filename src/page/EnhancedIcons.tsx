import React, { useState, useEffect } from 'react';
import styles from './EnhancedIcons.module.css';

const EnhancedIcons = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateTilt = (iconRect, mouseX, mouseY) => {
    if (!iconRect) return { x: 0, y: 0 };
    const centerX = iconRect.left + iconRect.width / 2;
    const centerY = iconRect.top + iconRect.height / 2;
    const maxTilt = 25;
    
    const tiltX = ((mouseY - centerY) / (window.innerHeight / 2)) * maxTilt;
    const tiltY = ((mouseX - centerX) / (window.innerWidth / 2)) * -maxTilt;
    
    return { x: tiltX, y: tiltY };
  };
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 2048 1664"><path fill="currentColor" d="m212 640l623 665l-300-665H212zm812 772l349-772H675zM538 512l204-384H480L192 512h346zm675 793l623-665h-323zM683 512h682l-204-384H887zm827 0h346l-288-384h-262zm141-486l384 512q14 18 13 41.5t-17 40.5l-960 1024q-18 20-47 20t-47-20L17 620Q1 603 0 579.5T13 538L397 26q18-26 51-26h1152q33 0 51 26z"/></svg>
  const svgPaths = [
    "M15.977 7.813c-.587-1.504-2.074-1.641-3.81-1.299l-.613-2.164l-1.315.382l.604 2.087l-1.046.317l-.604-2.113l-1.303.381l.613 2.143l-.836.257V7.8l-1.804.514l.398 1.398s.965-.3.956-.275c.527-.154.789.107.917.36l.703 2.447l.142-.021l-.142.038l.986 3.438c.026.171 0 .463-.364.57c.017.008-.956.278-.956.278l.188 1.637l1.702-.488l.943-.262l.625 2.173l1.299-.377l-.609-2.147l1.046-.291l.613 2.142l1.316-.377L15 16.384c2.164-.758 3.549-1.757 3.15-3.878c-.326-1.706-1.324-2.229-2.657-2.165c.643-.612.921-1.422.493-2.528zm-.489 5.186c.46 1.628-2.374 2.237-3.257 2.498l-.827-2.884c.887-.257 3.596-1.307 4.085.386m-1.774-3.905c.42 1.488-1.954 1.976-2.696 2.19l-.75-2.614c.742-.21 3-1.114 3.446.433z",
    "M19.011 9.201L12.66 19.316a.857.857 0 0 1-1.453-.005L4.98 9.197a1.8 1.8 0 0 1-.266-.943a1.856 1.856 0 0 1 1.881-1.826h10.817c1.033 0 1.873.815 1.873 1.822c0 .334-.094.664-.274.951M6.51 8.863l4.632 7.144V8.143H6.994c-.48 0-.694.317-.484.72m6.347 7.144l4.633-7.144c.214-.403-.005-.72-.485-.72h-4.148z",
    "M16.747 12.16L12 15.24l-4.75-3.08L12 3.5zM12 16.23l-4.75-3.08L12 20.5l4.75-7.351z",
    "M17.42 3a2 2 0 0 1 1.649.868l.087.14L22.49 9.84a2 2 0 0 1-.208 2.283l-.114.123l-9.283 9.283a1.25 1.25 0 0 1-1.666.091l-.102-.09l-9.283-9.284a2 2 0 0 1-.4-2.257l.078-.15l3.333-5.832a2 2 0 0 1 1.572-1.001L6.58 3h10.84Zm0 2H6.58l-3.333 5.833L12 19.586l8.753-8.753L17.42 5ZM15 6a1 1 0 1 1 0 2h-2v1.545c.758.07 1.447.217 2.004.426c.395.148.749.336 1.013.571c.264.234.483.557.483.958c0 .401-.219.724-.483.958c-.264.235-.618.423-1.013.57c-.594.223-1.338.377-2.157.44A.995.995 0 0 1 13 14v2a1 1 0 1 1-2 0v-2c0-.196.056-.378.153-.532c-.819-.063-1.563-.216-2.157-.44c-.395-.147-.749-.335-1.013-.57c-.264-.234-.483-.557-.483-.958c0-.401.219-.724.483-.958c.264-.235.618-.423 1.013-.57c.556-.21 1.245-.357 2.004-.427V8H9a1 1 0 1 1 0-2h6Zm-2.001 4.55a1 1 0 0 1-1.998 0a6.778 6.778 0 0 0-1.654.357c-.33.124-.56.259-.701.383c-.117.104-.14.172-.145.199L8.5 11.5c0 .013.005.085.146.21c.14.124.372.26.701.382c.655.246 1.592.408 2.653.408c1.06 0 1.998-.162 2.653-.408c.329-.123.56-.258.7-.382a.46.46 0 0 0 .14-.178l.007-.032l-.007-.032a.46.46 0 0 0-.14-.178c-.14-.124-.371-.26-.7-.382c-.44-.165-1.008-.293-1.654-.358Z"
  ];

  const iconClasses = [
    styles.iconOne,
    styles.iconTwo,
    styles.iconThree,
    styles.iconFour
  ];

  return (
    <div className={styles.container}>
      {svgPaths.map((path, index) => (
        <div
          key={index}
          className={`${styles.iconWrapper} ${iconClasses[index]}`}
          onMouseEnter={() => setActiveIcon(index)}
          onMouseLeave={() => setActiveIcon(null)}
          style={{
            transform: activeIcon === index
              ? `perspective(1000px) rotateX(${calculateTilt(
                  document.querySelector(`.icon-${index}`)?.getBoundingClientRect(),
                  mousePosition.x,
                  mousePosition.y
                ).x}deg) rotateY(${calculateTilt(
                  document.querySelector(`.icon-${index}`)?.getBoundingClientRect(),
                  mousePosition.x,
                  mousePosition.y
                ).y}deg)`
              : ''
          }}
        >
          <div className={styles.trailEffect} />
          <div className={styles.iconGlow} />
          <svg
            className={`${styles.icon} icon-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d={path}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default EnhancedIcons;