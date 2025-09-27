"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "remixicon/fonts/remixicon.css";
import FlowingMenu from "../navigation/FlowingMenu";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [navOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setNavOpen(false);
      setIsClosing(false);
    }, 400); // Match animation duration
  };

  // Improved navigation items with better organization
  const navigationItems = [
    {
      link: "/",
      text: "Home",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "/about",
      text: "About Us",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      link: "/services",
      text: "Services",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      link: "/courses",
      text: "Courses",
      image: "https://picsum.photos/600/400?random=4",
    },
    {
      link: "/team",
      text: "Team",
      image: "https://picsum.photos/600/400?random=5",
    },
    {
      link: "/contact",
      text: "Contact Us",
      image: "https://picsum.photos/600/400?random=6",
    },
  ];

  // Check if current page should show different header style
  const isHomePage = pathname === "/";
  const isAuthPage = pathname.includes("/login");

  return (
    <>
      <div
        className={`${styles.headerSpacer} ${
          scrolled ? styles.headerScrolled : ""
        } ${isAuthPage ? styles.headerAuth : ""}`}
      >
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.headerLogo_container}>
            <Image
              src="/logoDark-0.svg"
              alt="The Fringe Logo"
              width={80}
              height={80}
              priority
              className={styles.headerLogo}
            />
          </Link>

          <nav className={styles.headerNav} aria-label="Main navigation">
            <div className={styles.headerLinks}>
              <Link href="/book-now">
                <button
                  className={`${styles.headerCTA_button} ${styles.headerCTA_header}`}
                  aria-label="Book appointment"
                >
                  Book Now
                </button>
              </Link>
              <button
                className={styles.headerMenu_button}
                onClick={() => setNavOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={navOpen}
              >
                <i className="ri-menu-4-fill" aria-hidden="true"></i>
              </button>
            </div>
          </nav>
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
                <Image
                  src="/logo.svg"
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
                <FlowingMenu items={navigationItems} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
