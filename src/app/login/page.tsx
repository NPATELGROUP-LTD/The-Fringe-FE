"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { setAuthToken, setUserRole } from "../../../common/auth";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
      // In the new architecture, this will call the standalone backend
      const response = await fetch("http://localhost:3001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Store session token and user role
        setAuthToken(data.token);
        setUserRole(data.user.role);

        // Redirect based on user role
        if (data.user.role === "ADMIN" || data.user.role === "SUPER_ADMIN") {
          router.push("/admin/dashboard");
        } else if (data.user.role === "STUDENT") {
          router.push("/student/dashboard");
        }
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>The Fringe Salon</h1>
            <p className={styles.subtitle}>Access Your Account</p>
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
                placeholder="your.email@example.com"
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
