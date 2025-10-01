import { Metadata } from 'next';
import Layout from '../../components/layout/Layout';
import styles from './CookiePolicy.module.css';

export const metadata: Metadata = {
  title: 'Cookie Policy | The Fringe Beauty Academy',
  description: 'Learn about how The Fringe Beauty Academy uses cookies and similar technologies to enhance your browsing experience and provide personalized services.',
  keywords: 'cookie policy, cookies, tracking, web analytics, The Fringe Beauty Academy',
  openGraph: {
    title: 'Cookie Policy | The Fringe Beauty Academy',
    description: 'Learn about how The Fringe Beauty Academy uses cookies and similar technologies.',
    type: 'website',
  },
};

export default function CookiePolicyPage() {
  const lastUpdated = "December 15, 2024";

  return (
    <Layout>
      <div className={styles.cookiePage}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Cookie Policy</h1>
            <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section className={styles.section}>
              <h2>2. How We Use Cookies</h2>
              <p>We use cookies for several purposes:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>3. Types of Cookies We Use</h2>
              
              <div className={styles.cookieType}>
                <h3>Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function and cannot be switched off. They are usually set in 
                  response to actions made by you, such as logging in or filling in forms.
                </p>
                <div className={styles.cookieTable}>
                  <div className={styles.tableHeader}>
                    <span>Cookie Name</span>
                    <span>Purpose</span>
                    <span>Duration</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>session_id</span>
                    <span>Maintains your login session</span>
                    <span>Session</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>csrf_token</span>
                    <span>Security protection</span>
                    <span>Session</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>cookie_consent</span>
                    <span>Remembers your cookie preferences</span>
                    <span>1 year</span>
                  </div>
                </div>
              </div>

              <div className={styles.cookieType}>
                <h3>Performance Cookies</h3>
                <p>
                  These cookies collect information about how visitors use our website, such as which pages are visited most often. 
                  This data helps us improve how our website works.
                </p>
                <div className={styles.cookieTable}>
                  <div className={styles.tableHeader}>
                    <span>Cookie Name</span>
                    <span>Purpose</span>
                    <span>Duration</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>_ga</span>
                    <span>Google Analytics - distinguishes users</span>
                    <span>2 years</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>_ga_*</span>
                    <span>Google Analytics - session tracking</span>
                    <span>2 years</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>_gid</span>
                    <span>Google Analytics - distinguishes users</span>
                    <span>24 hours</span>
                  </div>
                </div>
              </div>

              <div className={styles.cookieType}>
                <h3>Functionality Cookies</h3>
                <p>
                  These cookies allow the website to remember choices you make and provide enhanced, more personal features.
                </p>
                <div className={styles.cookieTable}>
                  <div className={styles.tableHeader}>
                    <span>Cookie Name</span>
                    <span>Purpose</span>
                    <span>Duration</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>user_preferences</span>
                    <span>Stores your site preferences</span>
                    <span>1 year</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>language</span>
                    <span>Remembers your language choice</span>
                    <span>1 year</span>
                  </div>
                </div>
              </div>

              <div className={styles.cookieType}>
                <h3>Marketing Cookies</h3>
                <p>
                  These cookies are used to deliver advertisements more relevant to you and your interests. They may be set by 
                  us or by third-party providers whose services we use.
                </p>
                <div className={styles.cookieTable}>
                  <div className={styles.tableHeader}>
                    <span>Cookie Name</span>
                    <span>Purpose</span>
                    <span>Duration</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>_fbp</span>
                    <span>Facebook Pixel - tracks conversions</span>
                    <span>3 months</span>
                  </div>
                  <div className={styles.tableRow}>
                    <span>ads_preferences</span>
                    <span>Stores advertising preferences</span>
                    <span>1 year</span>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>4. Third-Party Cookies</h2>
              <p>We may also use third-party services that set cookies on our website:</p>
              <ul>
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Facebook Pixel:</strong> For advertising and conversion tracking</li>
                <li><strong>YouTube:</strong> For embedded video content</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>5. Managing Your Cookie Preferences</h2>
              <p>You have several options for managing cookies:</p>
              
              <h3>Browser Settings</h3>
              <p>
                Most web browsers allow you to control cookies through their settings. You can usually find these options 
                in the "Privacy" or "Security" section of your browser's settings.
              </p>

              <h3>Cookie Consent Banner</h3>
              <p>
                When you first visit our website, you'll see a cookie consent banner where you can choose which types of 
                cookies to accept or reject.
              </p>

              <h3>Opt-Out Links</h3>
              <ul>
                <li>
                  <a href="https://tools.google.com/dlpage/gaoptout" className={styles.link} target="_blank" rel="noopener noreferrer">
                    Google Analytics Opt-out
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/settings?tab=ads" className={styles.link} target="_blank" rel="noopener noreferrer">
                    Facebook Ad Preferences
                  </a>
                </li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>6. Impact of Disabling Cookies</h2>
              <p>
                If you choose to disable cookies, some features of our website may not function properly. This could affect:
              </p>
              <ul>
                <li>Your ability to log in and access your account</li>
                <li>Personalized content and recommendations</li>
                <li>Shopping cart functionality</li>
                <li>Form submissions and contact features</li>
                <li>Website performance and analytics</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>7. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, 
                legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </section>

            <section className={styles.section}>
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className={styles.contactInfo}>
                <p><strong>The Fringe Beauty Academy</strong></p>
                <p>Email: <a href="mailto:privacy@thefringe.com" className={styles.link}>privacy@thefringe.com</a></p>
                <p>Phone: <a href="tel:+15551234567" className={styles.link}>+1 (555) 123-4567</a></p>
                <p>
                  Privacy Policy: <a href="/privacy-policy" className={styles.link}>View our Privacy Policy</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}