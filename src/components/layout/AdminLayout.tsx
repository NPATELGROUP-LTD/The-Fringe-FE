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
          <Link href="/admin/dashboard" className={styles.navLink} title="Dashboard">
            <span className={styles.navIcon}>📊</span>
            <span className={styles.navText}>Dashboard</span>
          </Link>

          <Link href="/admin/courses" className={styles.navLink} title="Courses">
            <span className={styles.navIcon}>📚</span>
            <span className={styles.navText}>Courses</span>
          </Link>

          <Link href="/admin/services" className={styles.navLink} title="Services">
            <span className={styles.navIcon}>💼</span>
            <span className={styles.navText}>Services</span>
          </Link>

          <Link href="/admin/students" className={styles.navLink} title="Students">
            <span className={styles.navIcon}>👥</span>
            <span className={styles.navText}>Students</span>
          </Link>

          <Link href="/admin/newsletter" className={styles.navLink} title="Newsletter">
            <span className={styles.navIcon}>📧</span>
            <span className={styles.navText}>Newsletter</span>
          </Link>

          <Link href="/admin/certificates" className={styles.navLink} title="Certificates">
            <span className={styles.navIcon}>🏆</span>
            <span className={styles.navText}>Certificates</span>
          </Link>

          <Link href="/admin/settings" className={styles.navLink} title="Settings">
            <span className={styles.navIcon}>⚙️</span>
            <span className={styles.navText}>Settings</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <button onClick={handleLogout} className={styles.logoutButton} title="Logout">
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
