"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./AdminLayout.module.css";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    router.push("/admin/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.adminLayout}>
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
          <Link href="/admin/dashboard" className={styles.logo}>
            <span className={styles.logoText}>The Fringe</span>
            <span className={styles.logoSubtext}>Admin</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/admin/dashboard" className={styles.navLink}>
            <span className={styles.navIcon}>📊</span>
            <span className={styles.navText}>Dashboard</span>
          </Link>

          <Link href="/admin/courses" className={styles.navLink}>
            <span className={styles.navIcon}>📚</span>
            <span className={styles.navText}>Courses</span>
          </Link>

          <Link href="/admin/services" className={styles.navLink}>
            <span className={styles.navIcon}>💼</span>
            <span className={styles.navText}>Services</span>
          </Link>

          <Link href="/admin/students" className={styles.navLink}>
            <span className={styles.navIcon}>👥</span>
            <span className={styles.navText}>Students</span>
          </Link>

          <Link href="/admin/newsletter" className={styles.navLink}>
            <span className={styles.navIcon}>📧</span>
            <span className={styles.navText}>Newsletter</span>
          </Link>

          <Link href="/admin/certificates" className={styles.navLink}>
            <span className={styles.navIcon}>🏆</span>
            <span className={styles.navText}>Certificates</span>
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
