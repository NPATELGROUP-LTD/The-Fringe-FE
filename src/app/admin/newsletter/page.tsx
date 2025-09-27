"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/layout/AdminLayout";
import styles from "./Newsletter.module.css";

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session");
    if (!adminSession) {
      router.push("/admin/login");
      return;
    }
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/admin/newsletter");
      const data = await response.json();
      if (response.ok) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Email,Subscribe Date\n" +
      subscribers
        .map((sub: any) => `${sub.email},${sub.subscribeDate}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading newsletter data...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.newsletterPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Newsletter Management</h1>
          <button onClick={exportToCSV} className="btn btn-primary">
            Export Subscribers
          </button>
        </div>

        <div className={styles.stats}>
          <div className={`card ${styles.statCard}`}>
            <h3>Total Subscribers</h3>
            <p className={styles.statNumber}>{subscribers.length}</p>
          </div>
        </div>

        <div className={styles.subscribersList}>
          <h2>Recent Subscribers</h2>
          <div className={styles.tableContainer}>
            <table className={styles.subscribersTable}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subscribe Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber: any) => (
                  <tr key={subscriber.id}>
                    <td>{subscriber.email}</td>
                    <td>
                      {new Date(subscriber.subscribeDate).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={styles.activeStatus}>Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
