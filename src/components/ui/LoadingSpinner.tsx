import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  progress?: number; // For progress bar (0-100)
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'primary', 
  text,
  progress 
}: LoadingSpinnerProps) {
  return (
    <div className={`${styles.loadingContainer} ${styles[size]}`}>
      {progress !== undefined ? (
        // Progress bar for file uploads
        <div className={styles.progressContainer}>
          <div className={`${styles.progressBar} ${styles[color]}`}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          {text && (
            <div className={styles.progressText}>
              {text} ({Math.round(progress)}%)
            </div>
          )}
        </div>
      ) : (
        // Spinning loader
        <>
          <div className={`${styles.spinner} ${styles[color]}`}>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
            <div className={styles.spinnerRing}></div>
          </div>
          {text && <div className={styles.loadingText}>{text}</div>}
        </>
      )}
    </div>
  );
}

// Overlay loading component for full-screen loading
export function LoadingOverlay({ 
  text = "Loading...", 
  progress 
}: { 
  text?: string; 
  progress?: number; 
}) {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.overlayContent}>
        <LoadingSpinner 
          size="large" 
          color="primary" 
          text={text} 
          progress={progress}
        />
      </div>
    </div>
  );
}