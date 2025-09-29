"use client";
import { useEffect, useState } from "react";
import styles from "./textLoop.module.css";

export default function TextLoop() {
  const [isVisible, setIsVisible] = useState(false);

  const words = [
    "Excellence",
    "Innovation", 
    "Beauty",
    "Expertise",
    "Transformation",
    "Quality",
    "Elegance",
    "Artistry",
    "Professional",
    "Luxury"
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`${styles.scrollContainer} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.scrollTrack}>
        {/* Create multiple sets for seamless loop */}
        {Array.from({ length: 4 }, (_, setIndex) =>
          words.map((word, wordIndex) => (
            <span 
              key={`${setIndex}-${wordIndex}`} 
              className={styles.word}
              style={{ 
                animationDelay: `${(setIndex * words.length + wordIndex) * 0.1}s` 
              }}
            >
              {word}
            </span>
          ))
        )}
      </div>
      
      <div className={styles.gradientOverlay}>
        <div className={styles.gradientLeft}></div>
        <div className={styles.gradientRight}></div>
      </div>
    </div>
  );
}
