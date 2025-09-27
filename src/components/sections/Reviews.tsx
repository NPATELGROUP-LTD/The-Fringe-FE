import styles from "./Reviews.module.css";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      text: "Amazing experience at The Fringe! The stylists are incredibly talented and the education program helped me launch my career.",
      service: "Hair Styling & Course",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      text: "Professional service and excellent results. I've been coming here for years and they never disappoint.",
      service: "Hair Color",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 5,
      text: "The best beauty academy in the city! The instructors are top-notch and the facilities are state-of-the-art.",
      service: "Makeup Course",
    },
  ];

  return (
    <section id="reviews" className={`section ${styles.reviews}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>What Our Clients Say</h2>
          <p className={styles.subtitle}>
            Don't just take our word for it - hear from our satisfied clients
            and graduates
          </p>
        </div>

        <div className={styles.reviewGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={`card ${styles.reviewCard}`}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={styles.star}>
                    ⭐
                  </span>
                ))}
              </div>
              <p className={styles.reviewText}>"{review.text}"</p>
              <div className={styles.reviewer}>
                <strong className={styles.reviewerName}>{review.name}</strong>
                <span className={styles.reviewerService}>{review.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
