"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/layout/AdminLayout";
import styles from "./Certificates.module.css";

interface Certificate {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  completionDate: string;
  status: "issued" | "pending" | "revoked";
  certificateUrl?: string;
  generatedBy?: string;
  generatedAt?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  status: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session");
    if (!adminSession) {
      router.push("/admin/login");
      return;
    }
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const [certsResponse, studentsResponse] = await Promise.all([
        fetch("/api/admin/certificates"),
        fetch("/api/admin/students"),
      ]);

      const certsData = await certsResponse.json();
      const studentsData = await studentsResponse.json();

      if (certsResponse.ok) {
        setCertificates(certsData.certificates || []);
      }

      if (studentsResponse.ok) {
        // Filter students who are eligible for certificates (completed courses)
        const eligibleStudents = studentsData.students.filter(
          (student: Student) => student.progress >= 100
        );
        setStudents(eligibleStudents);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCertificate = async (studentId: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/admin/certificates/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });

      if (response.ok) {
        fetchCertificates();
        setShowGenerateModal(false);
        setSelectedStudent(null);
        alert("Certificate generated successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to generate certificate");
      }
    } catch (error) {
      alert("Error generating certificate");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBulkGenerate = async () => {
    if (selectedStudents.length === 0) {
      alert("Please select students to generate certificates for.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/admin/certificates/bulk-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentIds: selectedStudents }),
      });

      if (response.ok) {
        fetchCertificates();
        setShowBulkModal(false);
        setSelectedStudents([]);
        alert(
          `Generated ${selectedStudents.length} certificates successfully!`
        );
      } else {
        const data = await response.json();
        alert(data.error || "Failed to generate certificates");
      }
    } catch (error) {
      alert("Error generating certificates");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRevokeCertificate = async (certificateId: string) => {
    if (confirm("Are you sure you want to revoke this certificate?")) {
      try {
        const response = await fetch(
          `/api/admin/certificates/${certificateId}/revoke`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          fetchCertificates();
          alert("Certificate revoked successfully!");
        }
      } catch (error) {
        alert("Error revoking certificate");
      }
    }
  };

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || cert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading certificates...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.certificatesPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Certificates Management</h1>
          <div className={styles.headerActions}>
            <button
              className="btn btn-secondary"
              onClick={() => setShowBulkModal(true)}
              disabled={students.length === 0}
            >
              Bulk Generate
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowGenerateModal(true)}
              disabled={students.length === 0}
            >
              Generate Certificate
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search certificates..."
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
            <option value="issued">Issued</option>
            <option value="pending">Pending</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>

        {/* Certificates List */}
        <div className={styles.certificatesList}>
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((cert) => (
              <div key={cert.id} className={`card ${styles.certificateCard}`}>
                <div className={styles.certificateInfo}>
                  <h3 className={styles.studentName}>{cert.studentName}</h3>
                  <p className={styles.courseInfo}>
                    <strong>Course:</strong> {cert.courseName}
                  </p>
                  <p className={styles.completionInfo}>
                    <strong>Completed:</strong>{" "}
                    {new Date(cert.completionDate).toLocaleDateString()}
                  </p>
                  {cert.generatedBy && (
                    <p className={styles.generatedInfo}>
                      <strong>Generated by:</strong> {cert.generatedBy}
                    </p>
                  )}
                  <span className={`${styles.status} ${styles[cert.status]}`}>
                    {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                  </span>
                </div>
                <div className={styles.actions}>
                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      View
                    </a>
                  )}
                  {cert.certificateUrl && (
                    <a
                      href={cert.certificateUrl}
                      download
                      className="btn btn-primary btn-sm"
                    >
                      Download
                    </a>
                  )}
                  {cert.status === "issued" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRevokeCertificate(cert.id)}
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noCertificates}>
              <p>No certificates found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Generate Certificate Modal */}
        {showGenerateModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Generate Certificate</h2>
                <button
                  onClick={() => {
                    setShowGenerateModal(false);
                    setSelectedStudent(null);
                  }}
                  className={styles.closeBtn}
                  disabled={isGenerating}
                >
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label>Select Student</label>
                  <select
                    value={selectedStudent?.id || ""}
                    onChange={(e) => {
                      const student = students.find(
                        (s) => s.id === e.target.value
                      );
                      setSelectedStudent(student || null);
                    }}
                    className="input"
                    required
                  >
                    <option value="">Choose a student...</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} - {student.course} ({student.progress}%
                        complete)
                      </option>
                    ))}
                  </select>
                </div>

                {selectedStudent && (
                  <div className={styles.studentPreview}>
                    <h4>Certificate Preview</h4>
                    <div className={styles.previewInfo}>
                      <p>
                        <strong>Student:</strong> {selectedStudent.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedStudent.email}
                      </p>
                      <p>
                        <strong>Course:</strong> {selectedStudent.course}
                      </p>
                      <p>
                        <strong>Progress:</strong> {selectedStudent.progress}%
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowGenerateModal(false);
                    setSelectedStudent(null);
                  }}
                  className="btn btn-secondary"
                  disabled={isGenerating}
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    selectedStudent &&
                    handleGenerateCertificate(selectedStudent.id)
                  }
                  className="btn btn-primary"
                  disabled={!selectedStudent || isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Certificate"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Generate Modal */}
        {showBulkModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Bulk Generate Certificates</h2>
                <button
                  onClick={() => {
                    setShowBulkModal(false);
                    setSelectedStudents([]);
                  }}
                  className={styles.closeBtn}
                  disabled={isGenerating}
                >
                  ×
                </button>
              </div>

              <div className={styles.modalBody}>
                <p className={styles.bulkInfo}>
                  Select students to generate certificates for. Only students
                  who have completed their courses (100% progress) are shown.
                </p>

                <div className={styles.studentsList}>
                  {students.map((student) => (
                    <div key={student.id} className={styles.studentItem}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => toggleStudentSelection(student.id)}
                          className={styles.checkbox}
                        />
                        <div className={styles.studentInfo}>
                          <span className={styles.studentName}>
                            {student.name}
                          </span>
                          <span className={styles.studentCourse}>
                            {student.course}
                          </span>
                          <span className={styles.studentProgress}>
                            {student.progress}% complete
                          </span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                {selectedStudents.length > 0 && (
                  <div className={styles.selectionSummary}>
                    <p>
                      <strong>{selectedStudents.length}</strong> students
                      selected for certificate generation.
                    </p>
                  </div>
                )}
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowBulkModal(false);
                    setSelectedStudents([]);
                  }}
                  className="btn btn-secondary"
                  disabled={isGenerating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkGenerate}
                  className="btn btn-primary"
                  disabled={selectedStudents.length === 0 || isGenerating}
                >
                  {isGenerating
                    ? "Generating..."
                    : `Generate ${selectedStudents.length} Certificates`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
