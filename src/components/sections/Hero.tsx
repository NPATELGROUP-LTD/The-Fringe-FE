"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import styles from "./Hero.module.css";

export default function Hero() {
  const [showOffer, setShowOffer] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
      };

      video.addEventListener("loadeddata", handleLoadedData);

      // If video is already loaded
      if (video.readyState >= 2) {
        setVideoLoaded(true);
      }

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, []);

  const toggleOffer = () => {
    setShowOffer(!showOffer);
  };

  const scrollToServices = () => {
    scrollTo("#services", { duration: 1.5 });
  };

  return (
    <section className={styles.hero}>
      {/* Background Video */}
      <div className={styles.videoBackground}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`${styles.video} ${videoLoaded ? styles.videoLoaded : ""}`}
          poster="/video-poster.jpg"
          preload="metadata"
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay}></div>
      </div>

      {/* Hero Content */}
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.contentWrapper}>
          <h1 className={`${styles.heroTitle} font-heading`}>
            <span className="gradient-text-accent">Transform Your Look</span>
            <br />
            <span className="text-primary">Advance Your Career</span>
          </h1>

          <p className={`${styles.heroDescription} font-subheading`}>
            Experience premium salon services and professional beauty education
            at The Fringe. Where style meets expertise, and dreams become
            reality.
          </p>

          <div className={styles.ctaContainer}>
            <Link
              href="/book-now"
              className="btn btn-primary btn-lg font-accent"
            >
              Book Appointment
            </Link>
            <Link
              href="/courses"
              className="btn btn-secondary btn-lg font-accent"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator - At very bottom */}
      <div className={styles.scrollIndicator} onClick={scrollToServices}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel}></div>
        </div>
        <span className={`${styles.scrollText} font-accent`}>
          Scroll to explore our services
        </span>
      </div>

      {/* Special Offer Popup */}
      {showOffer && (
        <div className={styles.offerModal}>
          <div className={styles.offerContent}>
            <button
              className={styles.closeButton}
              onClick={toggleOffer}
              aria-label="Close offer"
            >
              ×
            </button>
            <h3 className={styles.offerTitle}>Special Offer!</h3>
            <p className={styles.offerDescription}>
              Get 20% off your first service or course enrollment. Use code:
              WELCOME20
            </p>
            <div className={styles.offerActions}>
              <Link href="/book-now" className="btn btn-primary">
                Book Now
              </Link>
              <Link href="/courses" className="btn btn-secondary">
                View Courses
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Offer Toggle Button */}
      <button
        className={styles.offerToggle}
        onClick={toggleOffer}
        aria-label="Toggle special offer"
      >
        🎁
      </button>
    </section>
  );
}
