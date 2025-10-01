"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./StudentLayout.module.css";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("student_session");
    router.push("/student/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.studentLayout}>
      {/* Mobile Hamburger Button - Always visible on mobile */}
      <button
        onClick={toggleSidebar}
        className={styles.mobileToggle}
        aria-label="Toggle sidebar"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>

      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className={styles.sidebarOverlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.open : styles.closed
        }`}
      >
        <div className={styles.sidebarHeader}>
          <Link href="/student/dashboard" className={styles.logo}>
            <span className={styles.logoText}>The Fringe</span>
            <span className={styles.logoSubtext}>Student Portal</span>
          </Link>
          
          {/* Hamburger Toggle - Right side of sidebar */}
          <button
            onClick={toggleSidebar}
            className={styles.toggleButton}
            aria-label="Toggle sidebar"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        <nav className={styles.nav}>
          <Link href="/student/dashboard" className={styles.navLink}>
            <span className={styles.navIcon}>📊</span>
            <span className={styles.navText}>Dashboard</span>
          </Link>

          <Link href="/student/my-course" className={styles.navLink}>
            <span className={styles.navIcon}>📚</span>
            <span className={styles.navText}>My Course</span>
          </Link>

          <Link href="/student/certificate" className={styles.navLink}>
            <span className={styles.navIcon}>🏆</span>
            <span className={styles.navText}>Certificate</span>
          </Link>

          <Link href="/student/profile" className={styles.navLink}>
            <span className={styles.navIcon}>👤</span>
            <span className={styles.navText}>Profile</span>
          </Link>

          <Link href="/student/settings" className={styles.navLink}>
            <span className={styles.navIcon}>⚙️</span>
            <span className={styles.navText}>Settings</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.navIcon}>🚪</span>
            <span className={styles.navText}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`${styles.main} ${
          isSidebarOpen ? styles.mainWithSidebar : styles.mainFullWidth
        }`}
      >
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
