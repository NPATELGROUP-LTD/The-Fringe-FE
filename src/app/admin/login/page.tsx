"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminLogin.module.css";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const user = await login(credentials.email, credentials.password);
      if (user.role !== 'admin') {
        setError("Access denied. Admin privileges required.");
        return;
      }
      // Navigation is handled in useAuth hook
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Admin Login</h1>
            <p className={styles.subtitle}>Access The Fringe Admin Panel</p>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="input"
                placeholder="admin@thefringe.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="input"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary btn-lg ${styles.submitButton}`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              <a href="/" className={styles.backLink}>
                ← Back to Website
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
