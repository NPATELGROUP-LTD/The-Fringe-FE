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
      {/* Fixed Hamburger Toggle - Always Visible */}
      <button
        onClick={toggleSidebar}
        className={styles.toggleButton}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

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
