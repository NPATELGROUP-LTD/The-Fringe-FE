"use client";
import { useState } from "react";
import styles from "./homePage-header.module.css";
import Image from "next/image";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";
import FlowingMenu from "./navLinks/FlowingMenu";

export default function HomepageHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setNavOpen(false);
      setIsClosing(false);
    }, 400); // Match animation duration
  };

  const demoItems = [
    {
      link: "#",
      text: "Home",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "#",
      text: "About Us",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      link: "#",
      text: "Services",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      link: "#",
      text: "Courses",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "#",
      text: "Team",
      image: "https://picsum.photos/600/400?random=4",
    },
    {
      link: "#",
      text: "Contact Us",
      image: "https://picsum.photos/600/400?random=3",
    },
  ];

  return (
    <>
      <div className={styles.headerSpacer}>
        <div className={styles.headerContainer}>
          <div className={styles.headerLogo_container}>
            <img src="/logoDark-0.svg" />
          </div>
          <div className={styles.headerLinks}>
            <button
              className={`${styles.headerCTA_button} ${styles.headerCTA_header}`}
            >
              Book Now
            </button>
            <button
              className={styles.headerMenu_button}
              onClick={() => setNavOpen(true)}
              aria-label="Open navigation"
            >
              <i className="ri-menu-4-fill"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Pop Up Menu */}
      {navOpen && (
        <div className={styles.headerNav_popup}>
          {/* Navigation Pop Up Menu Left */}
          <div
            className={
              isClosing
                ? `${styles.headerNav_popup_left} ${styles.slideOutLeft}`
                : `${styles.headerNav_popup_left} ${styles.slideInLeft}`
            }
          >
            <div className={styles.headerNav_popup_left_content}>
              <div className={styles.headerNav_popup_left_content_top}>
                <h1>The</h1>
                <p>
                  <span
                    className={
                      styles.headerNav_popup_left_content_top_p_firstLetter
                    }
                  >
                    F
                  </span>
                  ringe
                </p>
              </div>
            </div>
          </div>
          {/* Navigation Pop Up Menu Right */}
          <div
            className={
              isClosing
                ? `${styles.headerNav_popup_right} ${styles.slideOutRight}`
                : `${styles.headerNav_popup_right} ${styles.slideInRight}`
            }
          >
            {/* Navigation Pop Up Menu Right Div's Top Left Corner Logo */}
            <div className={styles.headerNav_popup_logo_container}>
              <Link href="/">
                {" "}
                <Image
                  src="/logo.png"
                  alt="The Fringe Logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            {/* Navigation Pop Up Menu Close Button */}
            <div className={styles.headerNav_popup_close_container}>
              <button
                className={styles.headerNav_popup_close_button}
                onClick={handleClose}
                aria-label="Close navigation"
              >
                Close
              </button>
            </div>

            {/* Navigation Pop Up Menu Links */}
            <div className={styles.headerNav_popup_menu_container}>
              <div
                style={{ height: "600px", width: "100%", position: "relative" }}
              >
                <FlowingMenu items={demoItems} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
