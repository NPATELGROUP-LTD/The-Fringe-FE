import { Metadata } from 'next';
import Layout from '../../components/layout/Layout';
import styles from './PrivacyPolicy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Fringe Beauty Academy',
  description: 'Learn about how The Fringe Beauty Academy collects, uses, and protects your personal information. Our comprehensive privacy policy explains your rights and our commitments.',
  keywords: 'privacy policy, data protection, personal information, The Fringe Beauty Academy',
  openGraph: {
    title: 'Privacy Policy | The Fringe Beauty Academy',
    description: 'Learn about how The Fringe Beauty Academy collects, uses, and protects your personal information.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 15, 2024";

  return (
    <Layout>
      <div className={styles.privacyPage}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
          </div>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>1. Information We Collect</h2>
              <p>
                At The Fringe Beauty Academy, we collect information you provide directly to us, such as when you:
              </p>
              <ul>
                <li>Create an account or enroll in our courses</li>
                <li>Contact us for support or inquiries</li>
                <li>Subscribe to our newsletter</li>
                <li>Book appointments or services</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              
              <h3>Personal Information</h3>
              <p>This may include:</p>
              <ul>
                <li>Name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely by our payment providers)</li>
                <li>Course progress and certification records</li>
                <li>Photos and videos for portfolio purposes (with consent)</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate about courses, services, and promotional offers</li>
                <li>Monitor and analyze usage patterns to improve user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>3. Information Sharing and Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy:
              </p>
              
              <h3>Service Providers</h3>
              <p>
                We may share your information with third-party service providers who assist us in operating our website, conducting business, or serving you, including:
              </p>
              <ul>
                <li>Payment processors</li>
                <li>Email service providers</li>
                <li>Cloud storage providers</li>
                <li>Analytics services</li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>
                We may disclose your information if required by law or in response to valid requests by public authorities.
              </p>
            </section>

            <section className={styles.section}>
              <h2>4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul>
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>5. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Object to processing of your personal information</li>
                <li>Request restriction of processing</li>
                <li>Data portability (where applicable)</li>
              </ul>
              
              <p>
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@thefringe.com" className={styles.link}>
                  privacy@thefringe.com
                </a>
              </p>
            </section>

            <section className={styles.section}>
              <h2>6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                For detailed information about our use of cookies, please see our{' '}
                <a href="/cookie-policy" className={styles.link}>Cookie Policy</a>.
              </p>
            </section>

            <section className={styles.section}>
              <h2>7. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, 
                unless a longer retention period is required or permitted by law. Course records and certifications may be 
                retained for extended periods for verification purposes.
              </p>
            </section>

            <section className={styles.section}>
              <h2>8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure that such 
                transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
            </section>

            <section className={styles.section}>
              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal 
                information from children under 16. If we become aware that we have collected such information, we will 
                take steps to delete it promptly.
              </p>
            </section>

            <section className={styles.section}>
              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting 
                the new policy on this page and updating the "Last updated" date. Your continued use of our services after 
                such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2>11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className={styles.contactInfo}>
                <p><strong>The Fringe Beauty Academy</strong></p>
                <p>Email: <a href="mailto:privacy@thefringe.com" className={styles.link}>privacy@thefringe.com</a></p>
                <p>Phone: <a href="tel:+15551234567" className={styles.link}>+1 (555) 123-4567</a></p>
                <p>Address: 123 Beauty Street, City, State 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}