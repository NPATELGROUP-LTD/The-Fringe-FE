"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./VideoPlayer.module.css";

interface VideoPlayerProps {
  src: string;
  onProgress?: (progress: number, watchTime: number) => void;
  startTime?: number;
}

export default function VideoPlayer({
  src,
  onProgress,
  startTime = 0,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [watchTime, setWatchTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set start time
    if (startTime > 0) {
      video.currentTime = startTime;
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setWatchTime((prev) => prev + 1);

      // Report progress every 5 seconds
      if (watchTime % 5 === 0 && onProgress) {
        const progress = (video.currentTime / video.duration) * 100;
        onProgress(progress, watchTime);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [watchTime, onProgress, startTime]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    video.currentTime = seekTime;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.videoPlayer}>
      <div className={styles.videoContainer}>
        <video ref={videoRef} className={styles.video} onClick={togglePlay}>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.controls}>
          <button
            onClick={togglePlay}
            className={styles.playButton}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <div className={styles.progressContainer}>
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className={styles.progressSlider}
            />
          </div>

          <div className={styles.timeDisplay}>
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
