import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>About The Fringe</h2>
            <p className={styles.description}>
              For over a decade, The Fringe has been at the forefront of beauty
              innovation, combining premium salon services with world-class
              education. Our passion for excellence drives everything we do.
            </p>
            <p className={styles.description}>
              Whether you're looking to transform your look or advance your
              career in the beauty industry, we provide the expertise, tools,
              and environment you need to succeed.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>1000+</span>
                <span className={styles.statLabel}>Happy Clients</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>500+</span>
                <span className={styles.statLabel}>Graduates</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Expert Stylists</span>
              </div>
            </div>
          </div>
          <div className={styles.imageContent}>
            <img
              src="/images/about-salon.jpg"
              alt="The Fringe Salon Interior"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
