"use client";

import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AnimatedSection from "../../components/ui/animated-components";
import styles from "./Reviews.module.css";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  imageUrl?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Simulate API call with sample data
      const sampleReviews: Review[] = [
        {
          id: "1",
          name: "Sarah Johnson",
          rating: 5,
          comment:
            "Amazing experience! The hair styling course exceeded my expectations. The instructors are highly professional and knowledgeable.",
          service: "Hair Styling Course",
          date: "2024-01-15",
          imageUrl: "/images/reviews/sarah.jpg",
        },
        {
          id: "2",
          name: "Emily Chen",
          rating: 5,
          comment:
            "Best salon in town! Got a wonderful haircut and the makeup services are top-notch. Highly recommend!",
          service: "Haircut & Makeup",
          date: "2024-01-10",
        },
        {
          id: "3",
          name: "Jessica Miller",
          rating: 4,
          comment:
            "Great learning environment. The makeup artistry course helped me develop professional skills.",
          service: "Makeup Artistry Course",
          date: "2024-01-08",
        },
        {
          id: "4",
          name: "Amanda Rodriguez",
          rating: 5,
          comment:
            "Fantastic nail art course! Learned so many techniques and the certification helped me start my career.",
          service: "Nail Art Course",
          date: "2024-01-05",
        },
        {
          id: "5",
          name: "Maria Garcia",
          rating: 5,
          comment:
            "Professional staff and excellent facilities. The bridal makeup package was perfect for my wedding!",
          service: "Bridal Makeup",
          date: "2024-01-03",
        },
        {
          id: "6",
          name: "Lisa Thompson",
          rating: 4,
          comment:
            "Good overall experience. The eyebrow threading service was precise and the staff was friendly.",
          service: "Eyebrow Threading",
          date: "2024-01-01",
        },
      ];

      setReviews(sampleReviews);
      const avg =
        sampleReviews.reduce((sum, review) => sum + review.rating, 0) /
        sampleReviews.length;
      setAverageRating(avg);
      setTotalReviews(sampleReviews.length);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((review) =>
          review.service.toLowerCase().includes(filter.toLowerCase())
        );

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ""}`}
      >
        ★
      </span>
    ));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loading}>Loading reviews...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.reviewsPage}>
        {/* Hero Section */}
        <AnimatedSection className={styles.hero} animationType="fade-up">
          <div className="container">
            <h1 className={styles.title}>Client Reviews</h1>
            <p className={styles.subtitle}>
              See what our clients say about their experience at The Fringe
            </p>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>
                  {averageRating.toFixed(1)}
                </div>
                <div className={styles.statStars}>
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className={styles.statLabel}>Average Rating</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>{totalReviews}</div>
                <div className={styles.statLabel}>Total Reviews</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Filter Section */}
        <AnimatedSection className={styles.filters} animationType="fade-up">
          <div className="container">
            <div className={styles.filterButtons}>
              <button
                className={`${styles.filterBtn} ${
                  filter === "all" ? styles.active : ""
                }`}
                onClick={() => setFilter("all")}
              >
                All Reviews
              </button>
              <button
                className={`${styles.filterBtn} ${
                  filter === "course" ? styles.active : ""
                }`}
                onClick={() => setFilter("course")}
              >
                Courses
              </button>
              <button
                className={`${styles.filterBtn} ${
                  filter === "service" ? styles.active : ""
                }`}
                onClick={() => setFilter("service")}
              >
                Services
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Reviews Grid */}
        <AnimatedSection
          className={styles.reviewsSection}
          animationType="fade-up"
        >
          <div className="container">
            <div className={styles.reviewsGrid}>
              {filteredReviews.map((review, index) => (
                <div key={review.id} className={`card ${styles.reviewCard}`}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewerInfo}>
                      <div className={styles.reviewerAvatar}>
                        {review.imageUrl ? (
                          <img src={review.imageUrl} alt={review.name} />
                        ) : (
                          <div className={styles.avatarPlaceholder}>
                            {review.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                      </div>
                      <div className={styles.reviewerDetails}>
                        <h4 className={styles.reviewerName}>{review.name}</h4>
                        <p className={styles.reviewService}>{review.service}</p>
                      </div>
                    </div>
                    <div className={styles.reviewRating}>
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  <div className={styles.reviewContent}>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>

                  <div className={styles.reviewFooter}>
                    <span className={styles.reviewDate}>
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <div style={{ marginBottom: "150px" }}>
          <AnimatedSection className={styles.cta} animationType="scale">
            <div className="container">
              <div className={styles.ctaContent}>
                <h2>Share Your Experience</h2>
                <p>We'd love to hear about your experience with us!</p>
                <a href="/contact" className="btn btn-primary btn-lg">
                  Leave a Review
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
}
