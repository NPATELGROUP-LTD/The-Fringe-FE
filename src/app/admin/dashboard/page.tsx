"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/layout/AdminLayout";
import styles from "./Dashboard.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    totalServices: 0,
    newsletterSubscribers: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check admin authentication
    const adminSession = localStorage.getItem("admin_session");
    if (!adminSession) {
      router.push("/admin/login");
      return;
    }

    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      const data = await response.json();

      if (response.ok) {
        setStats(data.stats);
        setRecentActivity(data.recentActivity);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome back! Here's your salon overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>👥</div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.totalStudents}</h3>
              <p className={styles.statLabel}>Total Students</p>
            </div>
          </div>

          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>📚</div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.activeCourses}</h3>
              <p className={styles.statLabel}>Active Courses</p>
            </div>
          </div>

          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>💼</div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.totalServices}</h3>
              <p className={styles.statLabel}>Total Services</p>
            </div>
          </div>

          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>📧</div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>
                {stats.newsletterSubscribers}
              </h3>
              <p className={styles.statLabel}>Newsletter Subscribers</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <a
              href="/admin/students/create"
              className={`card ${styles.actionCard}`}
            >
              <div className={styles.actionIcon}>👤</div>
              <div className={styles.actionContent}>
                <h3>Add Student</h3>
                <p>Create new student account</p>
              </div>
            </a>

            <a
              href="/admin/courses/create"
              className={`card ${styles.actionCard}`}
            >
              <div className={styles.actionIcon}>➕</div>
              <div className={styles.actionContent}>
                <h3>Create Course</h3>
                <p>Add new training course</p>
              </div>
            </a>

            <a
              href="/admin/services/create"
              className={`card ${styles.actionCard}`}
            >
              <div className={styles.actionIcon}>✨</div>
              <div className={styles.actionContent}>
                <h3>Add Service</h3>
                <p>Create new salon service</p>
              </div>
            </a>

            <a href="/admin/newsletter" className={`card ${styles.actionCard}`}>
              <div className={styles.actionIcon}>📊</div>
              <div className={styles.actionContent}>
                <h3>Newsletter Export</h3>
                <p>Download subscriber list</p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.recentActivity}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={`card ${styles.activityCard}`}>
            {recentActivity.length > 0 ? (
              <div className={styles.activityList}>
                {recentActivity.map((activity: any, index) => (
                  <div key={index} className={styles.activityItem}>
                    <div className={styles.activityIcon}>
                      {activity.type === "student"
                        ? "👤"
                        : activity.type === "course"
                        ? "📚"
                        : activity.type === "newsletter"
                        ? "📧"
                        : "💼"}
                    </div>
                    <div className={styles.activityContent}>
                      <p className={styles.activityText}>
                        {activity.description}
                      </p>
                      <span className={styles.activityTime}>
                        {activity.timeAgo}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noActivity}>
                <p>No recent activity to show.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
