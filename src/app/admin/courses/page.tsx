"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/layout/AdminLayout";
import styles from "./Courses.module.css";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  maxStudents: number;
  currentStudents: number;
  status: "active" | "draft" | "archived";
  instructor: string;
  modules: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    maxStudents: "",
    instructor: "",
  });
  const [editCourse, setEditCourse] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    maxStudents: "",
    instructor: "",
  });
  const router = useRouter();

  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session");
    if (!adminSession) {
      router.push("/admin/login");
      return;
    }
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/admin/courses");
      const data = await response.json();
      if (response.ok) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newCourse,
          price: parseFloat(newCourse.price),
          maxStudents: parseInt(newCourse.maxStudents),
        }),
      });

      if (response.ok) {
        setShowAddForm(false);
        setNewCourse({
          title: "",
          description: "",
          duration: "",
          price: "",
          maxStudents: "",
          instructor: "",
        });
        fetchCourses();
        alert("Course created successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create course");
      }
    } catch (error) {
      alert("Error creating course");
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setEditCourse({
      title: course.title,
      description: course.description,
      duration: course.duration,
      price: course.price.toString(),
      maxStudents: course.maxStudents.toString(),
      instructor: course.instructor,
    });
    setShowEditForm(true);
  };

  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    try {
      const response = await fetch(`/api/admin/courses/${editingCourse.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editCourse,
          price: parseFloat(editCourse.price),
          maxStudents: parseInt(editCourse.maxStudents),
        }),
      });

      if (response.ok) {
        setShowEditForm(false);
        setEditingCourse(null);
        setEditCourse({
          title: "",
          description: "",
          duration: "",
          price: "",
          maxStudents: "",
          instructor: "",
        });
        fetchCourses();
        alert("Course updated successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update course");
      }
    } catch (error) {
      alert("Error updating course");
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`/api/admin/courses/${courseId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchCourses();
          alert("Course deleted successfully!");
        }
      } catch (error) {
        alert("Error deleting course");
      }
    }
  };

  const toggleCourseStatus = async (
    courseId: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "active" ? "draft" : "active";
    try {
      const response = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchCourses();
      }
    } catch (error) {
      alert("Error updating course status");
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading courses...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.coursesPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Courses Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            Create New Course
          </button>
        </div>

        {/* Courses Grid */}
        <div className={styles.coursesGrid}>
          {courses.map((course) => (
            <div key={course.id} className={`card ${styles.courseCard}`}>
              <div className={styles.courseHeader}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <span className={`${styles.status} ${styles[course.status]}`}>
                  {course.status}
                </span>
              </div>

              <p className={styles.courseDescription}>{course.description}</p>

              <div className={styles.courseDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Duration:</span>
                  <span className={styles.detailValue}>{course.duration}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Price:</span>
                  <span className={styles.detailValue}>${course.price}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Students:</span>
                  <span className={styles.detailValue}>
                    {course.currentStudents}/{course.maxStudents}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Instructor:</span>
                  <span className={styles.detailValue}>
                    {course.instructor}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Modules:</span>
                  <span className={styles.detailValue}>{course.modules}</span>
                </div>
              </div>

              <div className={styles.courseActions}>
                <button
                  className={`btn btn-secondary btn-sm`}
                  onClick={() => handleEditCourse(course)}
                >
                  Edit
                </button>
                <button
                  className={`btn ${
                    course.status === "active" ? "btn-secondary" : "btn-primary"
                  } btn-sm`}
                  onClick={() => toggleCourseStatus(course.id, course.status)}
                >
                  {course.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  className={`btn ${styles.deleteBtn} btn-sm`}
                  onClick={() => handleDeleteCourse(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Course Modal */}
        {showAddForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Create New Course</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddCourse} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Course Title</label>
                  <input
                    type="text"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    required
                    className="input"
                    placeholder="Enter course title"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                    required
                    className={`input ${styles.textarea}`}
                    placeholder="Enter course description"
                    rows={4}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Duration</label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, duration: e.target.value })
                      }
                      required
                      className="input"
                      placeholder="e.g., 8 weeks"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Price ($)</label>
                    <input
                      type="number"
                      value={newCourse.price}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, price: e.target.value })
                      }
                      required
                      className="input"
                      placeholder="Course price"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Max Students</label>
                    <input
                      type="number"
                      value={newCourse.maxStudents}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          maxStudents: e.target.value,
                        })
                      }
                      required
                      className="input"
                      placeholder="Maximum students"
                      min="1"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Instructor</label>
                    <input
                      type="text"
                      value={newCourse.instructor}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          instructor: e.target.value,
                        })
                      }
                      required
                      className="input"
                      placeholder="Instructor name"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Course Modal */}
        {showEditForm && editingCourse && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Edit Course</h2>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingCourse(null);
                  }}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpdateCourse} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Course Title</label>
                  <input
                    type="text"
                    value={editCourse.title}
                    onChange={(e) =>
                      setEditCourse({ ...editCourse, title: e.target.value })
                    }
                    required
                    className="input"
                    placeholder="Enter course title"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={editCourse.description}
                    onChange={(e) =>
                      setEditCourse({
                        ...editCourse,
                        description: e.target.value,
                      })
                    }
                    required
                    className={`input ${styles.textarea}`}
                    placeholder="Enter course description"
                    rows={4}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Duration</label>
                    <input
                      type="text"
                      value={editCourse.duration}
                      onChange={(e) =>
                        setEditCourse({
                          ...editCourse,
                          duration: e.target.value,
                        })
                      }
                      required
                      className="input"
                      placeholder="e.g., 8 weeks"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Price ($)</label>
                    <input
                      type="number"
                      value={editCourse.price}
                      onChange={(e) =>
                        setEditCourse({ ...editCourse, price: e.target.value })
                      }
                      required
                      className="input"
                      placeholder="Course price"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Max Students</label>
                    <input
                      type="number"
                      value={editCourse.maxStudents}
                      onChange={(e) =>
                        setEditCourse({
                          ...editCourse,
                          maxStudents: e.target.value,
                        })
                      }
                      required
                      className="input"
                      placeholder="Maximum students"
                      min="1"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Instructor</label>
                    <input
                      type="text"
                      value={editCourse.instructor}
                      onChange={(e) =>
                        setEditCourse({
                          ...editCourse,
                          instructor: e.target.value,
                        })
                      }
                      required
                      className="input"
                      placeholder="Instructor name"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setEditingCourse(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
