"use client";

import { useState } from "react";
import styles from "./Newsletter.module.css";
import { newsletterService } from "@/services/newsletter.service";
import type { ApiError } from "@/lib/api";

const preferenceOptions = [
  "Hair Styling Updates",
  "Makeup Tips & Trends",
  "Special Offers",
  "Events & Workshops",
  "New Services",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await newsletterService.subscribe({
        email,
        name,
      });

      setIsSuccess(true);
      setMessage("Successfully subscribed to our newsletter!");

      // Reset form
      setEmail("");
      setName("");
    } catch (error) {
      const apiError = error as ApiError;
      setIsSuccess(false);
      setMessage(apiError.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Stay in the Loop</h2>
            <p className={styles.description}>
              Get the latest beauty tips, course updates, special offers, and
              exclusive content delivered straight to your inbox.
            </p>
            <ul className={styles.benefits}>
              <li>💄 Weekly beauty tips and tutorials</li>
              <li>📚 Early access to new courses</li>
              <li>🎯 Exclusive member discounts</li>
              <li>✨ Industry news and trends</li>
            </ul>
          </div>

          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              {message && (
                <div
                  className={`${styles.message} ${
                    isSuccess ? styles.success : styles.error
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </button>

              <p className={styles.privacy}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
