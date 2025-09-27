"use client";
import styles from "./textLoop.module.css";

export default function TextLoop() {
  const words = [
    "Excellence",
    "Quality",
    "Care",
    "Salon",
    "Academy",
    "Excellence",
    "Quality",
    "Care",
    "Salon",
    "Academy",
  ];

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollTrack}>
        {[...words, ...words, ...words].map((word, i) => (
          <span key={i} className={styles.word}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
