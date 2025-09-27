import Layout from "../../components/layout/Layout";
import styles from "./BookNow.module.css";

export default function BookNowPage() {
  return (
    <Layout>
      <section className={styles.bookNowPage}>
        <div className="container">
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.pageTitle}>Book Your Appointment</h1>
            <p className={styles.pageSubtitle}>
              Ready for your transformation? Let's get you scheduled with our
              expert team
            </p>
          </div>

          <div className={styles.bookingContainer}>
            {/* Booking Options */}
            <div className={styles.bookingOptions}>
              <h2 className={styles.sectionTitle}>How to Book</h2>

              <div className={styles.optionCard}>
                <div className={styles.optionIcon}>📞</div>
                <div className={styles.optionContent}>
                  <h3>Call Us</h3>
                  <p>
                    Speak directly with our booking team for personalized
                    service
                  </p>
                  <div className={styles.contactDetails}>
                    <strong>Salon Services:</strong> (555) 123-4567
                    <br />
                    <strong>Academy Courses:</strong> (555) 123-4568
                  </div>
                  <p className={styles.hours}>
                    <strong>Hours:</strong> Mon-Fri 9AM-8PM, Sat 9AM-6PM, Sun
                    11AM-5PM
                  </p>
                </div>
              </div>

              <div className={styles.optionCard}>
                <div className={styles.optionIcon}>💬</div>
                <div className={styles.optionContent}>
                  <h3>Text Us</h3>
                  <p>Quick and convenient booking via text message</p>
                  <div className={styles.contactDetails}>
                    <strong>Text:</strong> (555) 123-4567
                  </div>
                  <p className={styles.textInstructions}>
                    Include: Your name, preferred service, and 2-3 preferred
                    dates/times
                  </p>
                </div>
              </div>

              <div className={styles.optionCard}>
                <div className={styles.optionIcon}>🏢</div>
                <div className={styles.optionContent}>
                  <h3>Visit Us</h3>
                  <p>
                    Stop by our salon for in-person booking and consultation
                  </p>
                  <div className={styles.contactDetails}>
                    <strong>Address:</strong>
                    <br />
                    123 Beauty Street
                    <br />
                    Style City, SC 12345
                  </div>
                  <p className={styles.walkInNote}>
                    Walk-ins welcome subject to availability
                  </p>
                </div>
              </div>
            </div>

            {/* Services & Pricing */}
            <div className={styles.servicesInfo}>
              <h2 className={styles.sectionTitle}>Popular Services</h2>

              <div className={styles.servicesList}>
                <div className={styles.serviceItem}>
                  <div className={styles.serviceDetails}>
                    <h4>Hair Cut & Style</h4>
                    <p>Professional cut with styling</p>
                  </div>
                  <div className={styles.servicePrice}>
                    <span className={styles.duration}>60 min</span>
                    <span className={styles.price}>$85</span>
                  </div>
                </div>

                <div className={styles.serviceItem}>
                  <div className={styles.serviceDetails}>
                    <h4>Hair Color & Highlights</h4>
                    <p>Full color or highlight service</p>
                  </div>
                  <div className={styles.servicePrice}>
                    <span className={styles.duration}>120 min</span>
                    <span className={styles.price}>$150+</span>
                  </div>
                </div>

                <div className={styles.serviceItem}>
                  <div className={styles.serviceDetails}>
                    <h4>Balayage/Ombre</h4>
                    <p>Hand-painted highlighting technique</p>
                  </div>
                  <div className={styles.servicePrice}>
                    <span className={styles.duration}>180 min</span>
                    <span className={styles.price}>$200+</span>
                  </div>
                </div>

                <div className={styles.serviceItem}>
                  <div className={styles.serviceDetails}>
                    <h4>Bridal Makeup</h4>
                    <p>Complete bridal makeup package</p>
                  </div>
                  <div className={styles.servicePrice}>
                    <span className={styles.duration}>90 min</span>
                    <span className={styles.price}>$250</span>
                  </div>
                </div>

                <div className={styles.serviceItem}>
                  <div className={styles.serviceDetails}>
                    <h4>Nail Art & Manicure</h4>
                    <p>Creative nail designs</p>
                  </div>
                  <div className={styles.servicePrice}>
                    <span className={styles.duration}>45 min</span>
                    <span className={styles.price}>$65</span>
                  </div>
                </div>

                <div className={styles.serviceItem}>
                  <div className={styles.serviceDetails}>
                    <h4>Facial Treatment</h4>
                    <p>Deep cleansing facial</p>
                  </div>
                  <div className={styles.servicePrice}>
                    <span className={styles.duration}>75 min</span>
                    <span className={styles.price}>$90</span>
                  </div>
                </div>
              </div>

              <div className={styles.viewAllServices}>
                <a href="/services" className="btn btn-secondary">
                  View All Services
                </a>
              </div>
            </div>
          </div>

          {/* Booking Tips */}
          <div className={styles.bookingTips}>
            <h2 className={styles.sectionTitle}>Booking Tips</h2>
            <div className={styles.tipsGrid}>
              <div className={styles.tip}>
                <div className={styles.tipIcon}>⏰</div>
                <h3>Book in Advance</h3>
                <p>
                  Schedule 1-2 weeks ahead for regular services, 3-4 weeks for
                  special events
                </p>
              </div>

              <div className={styles.tip}>
                <div className={styles.tipIcon}>💭</div>
                <h3>Free Consultations</h3>
                <p>
                  New clients and major changes get complimentary consultations
                </p>
              </div>

              <div className={styles.tip}>
                <div className={styles.tipIcon}>💳</div>
                <h3>Payment Options</h3>
                <p>
                  We accept cash, cards, and digital payments. Deposits may be
                  required
                </p>
              </div>

              <div className={styles.tip}>
                <div className={styles.tipIcon}>📋</div>
                <h3>Preparation</h3>
                <p>
                  Come with clean hair (unless otherwise specified) and bring
                  inspiration photos
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className={styles.contactCta}>
            <h2>Ready to Schedule?</h2>
            <p>
              Our friendly team is standing by to help you book the perfect
              appointment
            </p>
            <div className={styles.ctaButtons}>
              <a href="tel:+15551234567" className="btn btn-primary btn-lg">
                Call Now: (555) 123-4567
              </a>
              <a href="/contact" className="btn btn-secondary btn-lg">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
