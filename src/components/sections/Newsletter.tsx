'use client';

import { useState } from 'react';
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage('Thank you! Check your email for confirmation.');
        setEmail('');
        setName('');
      } else {
        setIsSuccess(false);
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="newsletter" className={`section ${styles.newsletter}`}>
      <div className="container">
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
            {message && (
              <div className={`${styles.message} ${isSuccess ? styles.success : styles.error}`}>
                {message}
              </div>
            )}
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input ${styles.nameInput}`}
                />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input ${styles.emailInput}`}
                  required
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
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
