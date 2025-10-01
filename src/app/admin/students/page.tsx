"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/layout/AdminLayout";
import styles from "./Students.module.css";

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  progress: number;
  status: "active" | "completed" | "paused";
  certificateUrl?: string;
  invitedBy?: string;
  certificateAssignedBy?: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [certificateStudent, setCertificateStudent] = useState<Student | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    course: "",
    accessExpiryDate: "",
  });
  const [editStudent, setEditStudent] = useState({
    name: "",
    email: "",
    course: "",
    status: "active",
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session");
    if (!adminSession) {
      router.push("/admin/login");
      return;
    }
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/admin/students");
      const data = await response.json();
      if (response.ok) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        setShowAddForm(false);
        setNewStudent({ name: "", email: "", course: "", accessExpiryDate: "" });
        fetchStudents();
        alert("Student added successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to add student");
      }
    } catch (error) {
      alert("Error adding student");
    }
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`/api/admin/students/${studentId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchStudents();
          alert("Student deleted successfully!");
        }
      } catch (error) {
        alert("Error deleting student");
      }
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setEditStudent({
      name: student.name,
      email: student.email,
      course: student.course,
      status: student.status,
    });
    setShowEditForm(true);
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    try {
      const response = await fetch(`/api/admin/students/${editingStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editStudent),
      });

      if (response.ok) {
        setShowEditForm(false);
        setEditingStudent(null);
        setEditStudent({
          name: "",
          email: "",
          course: "",
          status: "active",
        });
        fetchStudents();
        alert("Student updated successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update student");
      }
    } catch (error) {
      alert("Error updating student");
    }
  };

  const handleUploadCertificate = (student: Student) => {
    setCertificateStudent(student);
    setShowCertificateModal(true);
  };

  const handleCertificateUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateStudent || !certificateFile) return;

    const formData = new FormData();
    formData.append("certificate", certificateFile);
    formData.append("studentId", certificateStudent.id);

    try {
      const response = await fetch("/api/admin/students/upload-certificate", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setShowCertificateModal(false);
        setCertificateStudent(null);
        setCertificateFile(null);
        fetchStudents();
        alert("Certificate uploaded successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to upload certificate");
      }
    } catch (error) {
      alert("Error uploading certificate");
    }
  };

  const handleSendInvite = async (studentId: string) => {
    try {
      const response = await fetch(`/api/admin/students/${studentId}/invite`, {
        method: "POST",
      });

      if (response.ok) {
        alert("Invitation sent successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to send invitation");
      }
    } catch (error) {
      alert("Error sending invitation");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading students...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.studentsPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Students Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            Add New Student
          </button>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.statusFilter}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        {/* Students Table */}
        <div className={styles.tableContainer}>
          <table className={styles.studentsTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Enrollment Date</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Certificate</th>
                <th>Invited By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>
                    {new Date(student.enrollmentDate).toLocaleDateString()}
                  </td>
                  <td>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${student.progress}%` }}
                      ></div>
                      <span className={styles.progressText}>
                        {student.progress}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${styles[student.status]}`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td>
                    {student.certificateUrl ? (
                      <span className={styles.certificateStatus}>
                        ✅ Assigned
                        <br />
                        <small>by {student.certificateAssignedBy}</small>
                      </span>
                    ) : (
                      <span className={styles.certificateStatus}>
                        ❌ Not Assigned
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={styles.invitedBy}>
                      {student.invitedBy || "N/A"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={`${styles.actionBtn} ${styles.editBtn}`}
                        onClick={() => handleEditStudent(student)}
                        title="Edit Student"
                      >
                        ✏️
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.certificateBtn}`}
                        onClick={() => handleUploadCertificate(student)}
                        title="Upload Certificate"
                      >
                        🏆
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.inviteBtn}`}
                        onClick={() => handleSendInvite(student.id)}
                        title="Send Invite"
                      >
                        📧
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDeleteStudent(student.id)}
                        title="Delete Student"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Student Modal */}
        {showAddForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Add New Student</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddStudent} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Student Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    required
                    className="input"
                    placeholder="Enter student name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, email: e.target.value })
                    }
                    required
                    className="input"
                    placeholder="Enter email address"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Course</label>
                  <select
                    value={newStudent.course}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, course: e.target.value })
                    }
                    required
                    className="input"
                  >
                    <option value="">Select Course</option>
                    <option value="Hair Styling">Hair Styling</option>
                    <option value="Makeup Artistry">Makeup Artistry</option>
                    <option value="Nail Art">Nail Art</option>
                    <option value="Skin Care">Skin Care</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Access Expiry Date</label>
                  <input
                    type="date"
                    value={newStudent.accessExpiryDate}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, accessExpiryDate: e.target.value })
                    }
                    required
                    className="input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <small className={styles.fieldNote}>
                    Student will receive an email to set their password and will have access until this date.
                  </small>
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
                    Add Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Student Modal */}
        {showEditForm && editingStudent && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Edit Student</h2>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingStudent(null);
                  }}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpdateStudent} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Student Name</label>
                  <input
                    type="text"
                    value={editStudent.name}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, name: e.target.value })
                    }
                    required
                    className="input"
                    placeholder="Enter student name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={editStudent.email}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, email: e.target.value })
                    }
                    required
                    className="input"
                    placeholder="Enter email address"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Course</label>
                  <select
                    value={editStudent.course}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, course: e.target.value })
                    }
                    required
                    className="input"
                  >
                    <option value="">Select Course</option>
                    <option value="Hair Styling">Hair Styling</option>
                    <option value="Makeup Artistry">Makeup Artistry</option>
                    <option value="Nail Art">Nail Art</option>
                    <option value="Skin Care">Skin Care</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select
                    value={editStudent.status}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, status: e.target.value })
                    }
                    required
                    className="input"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setEditingStudent(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Certificate Upload Modal */}
        {showCertificateModal && certificateStudent && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Upload Certificate for {certificateStudent.name}</h2>
                <button
                  onClick={() => {
                    setShowCertificateModal(false);
                    setCertificateStudent(null);
                    setCertificateFile(null);
                  }}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCertificateUpload} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Certificate File</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      setCertificateFile(e.target.files?.[0] || null)
                    }
                    required
                    className="input"
                  />
                  <small className={styles.fileNote}>
                    Supported formats: PDF, JPG, JPEG, PNG (Max: 5MB)
                  </small>
                </div>

                <div className={styles.studentInfo}>
                  <p>
                    <strong>Student:</strong> {certificateStudent.name}
                  </p>
                  <p>
                    <strong>Course:</strong> {certificateStudent.course}
                  </p>
                  <p>
                    <strong>Progress:</strong> {certificateStudent.progress}%
                  </p>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCertificateModal(false);
                      setCertificateStudent(null);
                      setCertificateFile(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Upload Certificate
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
