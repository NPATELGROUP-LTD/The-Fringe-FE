"use client";

import { useState } from "react";
import Layout from "../../components/layout/Layout";
import styles from "./Contact.module.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 2000);
  };

  return (
    <Layout>
      <section className={styles.contactPage}>
        <div className="container">
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.pageTitle}>Contact Us</h1>
            <p className={styles.pageSubtitle}>
              Get in touch with us for appointments, questions, or course
              information
            </p>
          </div>

          <div className={styles.contactContainer}>
            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <h2 className={styles.sectionTitle}>Get in Touch</h2>

              <div className={styles.infoCard}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📍</div>
                  <div className={styles.infoContent}>
                    <h3>Visit Us</h3>
                    <p>
                      123 Beauty Street
                      <br />
                      Style City, SC 12345
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📞</div>
                  <div className={styles.infoContent}>
                    <h3>Call Us</h3>
                    <p>
                      Salon: (555) 123-4567
                      <br />
                      Academy: (555) 123-4568
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>✉️</div>
                  <div className={styles.infoContent}>
                    <h3>Email Us</h3>
                    <p>
                      info@thefringe.com
                      <br />
                      academy@thefringe.com
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>🕒</div>
                  <div className={styles.infoContent}>
                    <h3>Hours</h3>
                    <p>
                      Mon-Fri: 9:00 AM - 8:00 PM
                      <br />
                      Sat: 9:00 AM - 6:00 PM
                      <br />
                      Sun: 11:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.emergencyContact}>
                <h3>Emergency Cancellations</h3>
                <p>
                  For same-day cancellations or emergencies, please call us
                  directly at <strong>(555) 123-4567</strong>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactForm}>
              <h2 className={styles.sectionTitle}>Send us a Message</h2>

              {submitStatus === "success" && (
                <div className={styles.successMessage}>
                  <p>
                    Thank you! Your message has been sent successfully. We'll
                    get back to you within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="service">Service Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Select a service...</option>
                    <option value="hair-styling">Hair Styling</option>
                    <option value="hair-coloring">Hair Coloring</option>
                    <option value="makeup">Makeup Services</option>
                    <option value="nail-art">Nail Art</option>
                    <option value="skincare">Skincare</option>
                    <option value="course-inquiry">Course Information</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input"
                    placeholder="Tell us about your needs, preferred appointment times, or any questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary btn-lg ${styles.submitButton}`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={styles.faqSection}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>How far in advance should I book?</h3>
                <p>
                  We recommend booking 1-2 weeks in advance for regular
                  services, and 3-4 weeks for special events or color services.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3>What's your cancellation policy?</h3>
                <p>
                  Please provide at least 24 hours notice for cancellations.
                  Same-day cancellations may incur a fee.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3>Do you offer consultations?</h3>
                <p>
                  Yes! We offer complimentary consultations for all new clients
                  and major color or cut changes.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3>What payment methods do you accept?</h3>
                <p>
                  We accept cash, all major credit cards, and digital payments
                  including Apple Pay and Google Pay.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3>Do you offer group bookings?</h3>
                <p>
                  Absolutely! We specialize in bridal parties, special events,
                  and group appointments. Contact us for special rates.
                </p>
              </div>

              <div className={styles.faqItem}>
                <h3>How do I enroll in courses?</h3>
                <p>
                  Course enrollment can be done online, over the phone, or in
                  person. Financial aid options are available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
