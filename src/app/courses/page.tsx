"use client";

import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import styles from "./Courses.module.css";
import { coursesService } from "@/services/courses.service";
import type { Course } from "@/services/courses.service";
import { useAuth } from "@/hooks/useAuth";

export default function CoursesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await coursesService.getAllCourses();
        setCourses(data);
      } catch (error) {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const courseCategoriesFromData = Array.from(
    new Set(courses.map((c) => c.level.toLowerCase()))
  ).map((lvl) => ({ id: lvl, name: lvl[0].toUpperCase() + lvl.slice(1) }));
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEnrollment = async (courseId: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login?redirect=/courses";
      return;
    }

    try {
      await coursesService.enrollInCourse({
        courseId,
        userId: user!.id,
      });
      window.location.href = `/student/my-course/${courseId}`;
    } catch (error) {
      setError("Failed to enroll in the course. Please try again.");
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("ALL") ||
      selectedCategories.includes(course.level.toLowerCase());

    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <p className={styles.error}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.coursesPage}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={styles.pageTitle}>Professional Beauty Courses</h1>
            <p className={styles.pageSubtitle}>
              Launch your beauty career with our comprehensive training programs
            </p>
          </div>

          <div className={styles.filters}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.categoryFilters}>
              <div className={`${styles.filterDropdown} ${dropdownOpen ? styles.open : ""}`}>
                <button
                  className={`btn ${styles.filterButton}`}
                  onClick={() => setDropdownOpen((s) => !s)}
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                >
                  {selectedCategories.length === 0
                    ? "Filter levels"
                    : `${selectedCategories.length} selected`}
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdownMenu} role="menu">
                    <div className={styles.dropdownHeader}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedCategories(["ALL"])}
                      >
                        All
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedCategories([])}
                      >
                        Clear
                      </button>
                    </div>

                    <ul className={styles.dropdownList}>
                      {courseCategoriesFromData.map((c) => (
                        <li key={c.id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={
                                selectedCategories.includes("ALL") ||
                                selectedCategories.includes(c.id)
                              }
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setSelectedCategories((prev) => {
                                  if (checked) {
                                    return Array.from(new Set([...prev, c.id]));
                                  }
                                  return prev.filter(
                                    (x) => x !== c.id && x !== "ALL"
                                  );
                                });
                              }}
                            />{" "}
                            {c.name}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.coursesGrid}>
            {filteredCourses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseImage}>
                  <img src={course.image} alt={course.title} />
                  <div className={styles.courseBadge}>{course.level}</div>
                </div>
                <div className={styles.courseContent}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDescription}>
                    {course.description}
                  </p>

                  <div className={styles.courseStats}>
                    <span>📅 {course.duration}</span>
                    <span>📚 {course.topics.length} modules</span>
                    <span>👨‍🏫 {course.instructor}</span>
                  </div>

                  <div className={styles.courseFooter}>
                    <div className={styles.price}>${course.price}</div>
                    <div className={styles.courseActions}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedCourse(course)}
                      >
                        Learn More
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEnrollment(course.id)}
                        disabled={course.enrollmentStatus !== "open"}
                      >
                        {course.enrollmentStatus === "open"
                          ? "Enroll Now"
                          : "Enrollment Closed"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCourse && (
          <div className={styles.modal} onClick={() => setSelectedCourse(null)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedCourse(null)}
              >
                ×
              </button>

              <div className={styles.modalHeader}>
                <img src={selectedCourse.image} alt={selectedCourse.title} />
                <div className={styles.modalTitle}>
                  <h2>{selectedCourse.title}</h2>
                  <p>{selectedCourse.description}</p>
                </div>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalSection}>
                  <h3>What You'll Learn</h3>
                  <ul>
                    {selectedCourse.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
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
                    <strong>Instructor:</strong> {selectedCourse.instructor}
                  </div>
                  <div className={styles.detailItem}>
                    <strong>Status:</strong> {selectedCourse.enrollmentStatus}
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => handleEnrollment(selectedCourse.id)}
                  disabled={selectedCourse.enrollmentStatus !== "open"}
                >
                  Enroll Now - ${selectedCourse.price}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
