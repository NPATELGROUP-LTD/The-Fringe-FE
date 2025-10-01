"use client";

import 'remixicon/fonts/remixicon.css'
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>The Fringe</h3>
            <p className={styles.description}>
              Premium salon services and professional beauty education.
              Transform your look and advance your career with us.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <span><i className="ri-facebook-fill"></i></span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <span><i className="ri-instagram-line"></i></span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Whatsapp">
                <span><i className="ri-whatsapp-line"></i></span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <nav className={styles.linkList}>
              <Link href="/about" className={styles.footerLink}>
                About Us
              </Link>
              <Link href="/services" className={styles.footerLink}>
                Services
              </Link>
              <Link href="/courses" className={styles.footerLink}>
                Courses
              </Link>
              <Link href="/team" className={styles.footerLink}>
                Team
              </Link>
              <Link href="/reviews" className={styles.footerLink}>
                Reviews
              </Link>
              <Link href="/contact" className={styles.footerLink}>
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Services</h4>
            <nav className={styles.linkList}>
              <Link href="/services#hair" className={styles.footerLink}>
                Hair Styling
              </Link>
              <Link href="/services#color" className={styles.footerLink}>
                Hair Coloring
              </Link>
              <Link href="/services#makeup" className={styles.footerLink}>
                Makeup
              </Link>
              <Link href="/services#nails" className={styles.footerLink}>
                Nail Art
              </Link>
              <Link href="/services#skincare" className={styles.footerLink}>
                Skincare
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Contact Us</h4>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>
                <strong>Phone:</strong> (555) 123-4567
              </p>
              <p className={styles.contactItem}>
                <strong>Email:</strong> info@thefringe.com
              </p>
              <p className={styles.contactItem}>
                <strong>Address:</strong> 123 Beauty St, Style City, SC 12345
              </p>
              <p className={styles.contactItem}>
                <strong>Hours:</strong> Mon-Sat 9AM-8PM, Sun 11AM-6PM
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <h4 className={styles.newsletterTitle}>Stay Updated</h4>
            <p className={styles.newsletterDescription}>
              Get the latest beauty tips, course updates, and special offers.
            </p>
          </div>
          <form className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              className={`input ${styles.newsletterInput}`}
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              © {currentYear} The Fringe. All rights reserved.
            </p>
            <nav className={styles.legalLinks}>
              <Link href="/privacy-policy" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className={styles.legalLink}>
                Cookies Policy
              </Link>
              <Link href="/student/dashboard" className={styles.legalLink}>
                Student
              </Link>
              <Link href="/admin/dashboard" className={styles.legalLink}>
                Staff
              </Link>
            </nav>
          </div>
        </div>
        <div className={styles.fringeText}>FRINGE</div>
      </div>
    </footer>
  );
}
