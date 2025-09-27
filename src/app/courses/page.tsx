"use client";

import { useState } from "react";
import Layout from "../../components/layout/Layout";
import styles from "./Courses.module.css";

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const courses = [
    {
      id: 1,
      title: "Professional Hair Styling Certification",
      description:
        "Comprehensive course covering cutting, styling, and finishing techniques",
      category: "PROFESSIONAL",
      isPublic: true,
      duration: "12 weeks",
      price: 2500,
      thumbnail: "/images/courses/hair-styling-course.jpg",
      modules: 24,
      students: 156,
      rating: 4.9,
      level: "Beginner to Advanced",
      whatYouLearn: [
        "Fundamental cutting techniques",
        "Advanced styling methods",
        "Product knowledge and application",
        "Client consultation skills",
        "Salon safety and hygiene",
      ],
      requirements: [
        "No prior experience required",
        "Basic English proficiency",
        "Commitment to attend all sessions",
      ],
    },
    {
      id: 2,
      title: "Advanced Color Theory & Application",
      description:
        "Master the art of hair coloring with professional techniques",
      category: "PROFESSIONAL",
      isPublic: true,
      duration: "10 weeks",
      price: 2200,
      thumbnail: "/images/courses/color-theory.jpg",
      modules: 20,
      students: 142,
      rating: 4.8,
      level: "Intermediate",
      whatYouLearn: [
        "Color wheel and theory",
        "Balayage and highlighting techniques",
        "Color correction methods",
        "Chemical processes and safety",
        "Trend forecasting",
      ],
      requirements: [
        "Basic hair styling knowledge",
        "Previous salon experience preferred",
        "Color vision test required",
      ],
    },
    {
      id: 3,
      title: "Professional Makeup Artistry",
      description: "Complete makeup training for aspiring makeup artists",
      category: "PROFESSIONAL",
      isPublic: true,
      duration: "8 weeks",
      price: 1800,
      thumbnail: "/images/courses/makeup-artistry.jpg",
      modules: 16,
      students: 203,
      rating: 4.9,
      level: "Beginner to Advanced",
      whatYouLearn: [
        "Facial anatomy and structure",
        "Color matching and application",
        "Bridal and special event makeup",
        "Photography makeup techniques",
        "Business and client management",
      ],
      requirements: [
        "No prior experience required",
        "Own basic makeup kit",
        "Portfolio development included",
      ],
    },
    {
      id: 4,
      title: "Nail Technology & Art",
      description: "Professional nail care and artistic design techniques",
      category: "ACADEMY",
      isPublic: true,
      duration: "6 weeks",
      price: 1200,
      thumbnail: "/images/courses/nail-technology.jpg",
      modules: 12,
      students: 98,
      rating: 4.7,
      level: "Beginner",
      whatYouLearn: [
        "Nail anatomy and health",
        "Manicure and pedicure techniques",
        "Gel and acrylic application",
        "Nail art and design",
        "Sanitation and safety protocols",
      ],
      requirements: [
        "No experience necessary",
        "Must provide own tools",
        "State licensing preparation included",
      ],
    },
    {
      id: 5,
      title: "Salon Business Management",
      description: "Learn to run a successful beauty salon business",
      category: "MASTERCLASS",
      isPublic: true,
      duration: "4 weeks",
      price: 999,
      thumbnail: "/images/courses/business-management.jpg",
      modules: 8,
      students: 67,
      rating: 4.6,
      level: "Advanced",
      whatYouLearn: [
        "Business planning and strategy",
        "Financial management",
        "Staff recruitment and training",
        "Marketing and social media",
        "Customer service excellence",
      ],
      requirements: [
        "Salon experience required",
        "Basic business knowledge helpful",
        "Access to computer for assignments",
      ],
    },
    {
      id: 6,
      title: "Skincare & Facial Treatments",
      description: "Professional skincare analysis and treatment techniques",
      category: "ACADEMY",
      isPublic: true,
      duration: "7 weeks",
      price: 1500,
      thumbnail: "/images/courses/skincare.jpg",
      modules: 14,
      students: 124,
      rating: 4.8,
      level: "Beginner to Intermediate",
      whatYouLearn: [
        "Skin analysis and consultation",
        "Facial massage techniques",
        "Product knowledge and selection",
        "Treatment protocols",
        "Client aftercare guidance",
      ],
      requirements: [
        "Interest in skincare field",
        "No prior experience needed",
        "Certification preparation included",
      ],
    },
  ];

  const categories = [
    { value: "ALL", label: "All Courses" },
    { value: "PROFESSIONAL", label: "Professional Certification" },
    { value: "ACADEMY", label: "Academy Training" },
    { value: "MASTERCLASS", label: "Masterclass" },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      selectedCategory === "ALL" || course.category === selectedCategory
  );

  const openModal = (course: any) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  return (
    <Layout>
      <section className={styles.coursesPage}>
        <div className="container">
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.pageTitle}>Professional Beauty Courses</h1>
            <p className={styles.pageSubtitle}>
              Launch your beauty career with our comprehensive training programs
            </p>
          </div>

          {/* Category Filters */}
          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.value ? styles.active : ""
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className={styles.coursesGrid}>
            {filteredCourses.map((course) => (
              <div key={course.id} className={`card ${styles.courseCard}`}>
                <div className={styles.courseImage}>
                  <img src={course.thumbnail} alt={course.title} />
                  <div className={styles.courseBadge}>{course.category}</div>
                </div>

                <div className={styles.courseContent}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDescription}>
                    {course.description}
                  </p>

                  <div className={styles.courseStats}>
                    <span className={styles.duration}>
                      📅 {course.duration}
                    </span>
                    <span className={styles.modules}>
                      📚 {course.modules} modules
                    </span>
                    <span className={styles.students}>
                      👥 {course.students} students
                    </span>
                  </div>

                  <div className={styles.courseRating}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(course.rating)
                              ? styles.starFilled
                              : styles.star
                          }
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className={styles.ratingText}>({course.rating})</span>
                  </div>

                  <div className={styles.courseFooter}>
                    <div className={styles.price}>${course.price}</div>
                    <div className={styles.courseActions}>
                      <button
                        onClick={() => openModal(course)}
                        className="btn btn-secondary btn-sm"
                      >
                        Learn More
                      </button>
                      <button className="btn btn-primary btn-sm">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Modal */}
        {selectedCourse && (
          <div className={styles.modal} onClick={closeModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeModal}>
                ×
              </button>

              <div className={styles.modalHeader}>
                <img
                  src={selectedCourse.thumbnail}
                  alt={selectedCourse.title}
                />
                <div className={styles.modalTitle}>
                  <h2>{selectedCourse.title}</h2>
                  <p>{selectedCourse.description}</p>
                </div>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalSection}>
                  <h3>What You'll Learn</h3>
                  <ul>
                    {selectedCourse.whatYouLearn.map(
                      (item: any, index: any) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div className={styles.modalSection}>
                  <h3>Requirements</h3>
                  <ul>
                    {selectedCourse.requirements.map(
                      (item: any, index: any) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div className={styles.courseDetails}>
                  <div className={styles.detailItem}>
                    <strong>Duration:</strong> {selectedCourse.duration}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Level:</strong> {selectedCourse.level}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Modules:</strong> {selectedCourse.modules}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Price:</strong> ${selectedCourse.price}
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button className="btn btn-primary btn-lg">
                  Enroll Now - ${selectedCourse.price}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
