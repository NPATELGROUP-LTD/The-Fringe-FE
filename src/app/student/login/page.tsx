"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./StudentLogin.module.css";
import { authService } from "@/services/auth.service";

export default function StudentLoginPage() {
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
      const res = await authService.login(credentials);
      
      // Store auth data in both cookies and localStorage for compatibility
      localStorage.setItem("authToken", res.token);
      localStorage.setItem("userRole", res.user.role);
      localStorage.setItem("student_session", res.token);
      
      router.push("/student/dashboard");
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
            <h1 className={styles.title}>Student Portal</h1>
            <p className={styles.subtitle}>
              Access your courses and certificates
            </p>
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
              {isLoading ? "Signing In..." : "Access Portal"}
            </button>
          </form>

          <div className={styles.forgotPassword}>
            <button
              type="button"
              onClick={() => {
                const email = prompt("Enter your email address:");
                if (email) {
                  // API call to send reset email
                  fetch("/api/student/forgot-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  }).then(() => {
                    alert("Password reset instructions sent to your email!");
                  }).catch(() => {
                    alert("Failed to send reset email. Please try again.");
                  });
                }
              }}
              className={styles.forgotLink}
            >
              Forgot Password?
            </button>
          </div>

          <div className={styles.footer}>
            <p>
              Need help?{" "}
              <a href="/contact" className={styles.helpLink}>
                Contact Support
              </a>
            </p>
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
