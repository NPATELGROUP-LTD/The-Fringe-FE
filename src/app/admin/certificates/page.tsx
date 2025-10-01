"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/layout/AdminLayout";
import LoadingSpinner, { LoadingOverlay } from "../../../components/ui/LoadingSpinner";
import { uploadFile, apiCall, API_CONFIG } from "../../../config/api";
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
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
      // Use external API endpoints
      const [certsData, studentsData] = await Promise.all([
        apiCall(API_CONFIG.ENDPOINTS.ADMIN.CERTIFICATES.LIST).catch(() => ({ certificates: [] })),
        apiCall(API_CONFIG.ENDPOINTS.ADMIN.STUDENTS.LIST).catch(() => ({ students: [] }))
      ]);

      setCertificates(certsData.certificates || []);
      
      // Filter students who are eligible for certificates (completed courses)
      const eligibleStudents = (studentsData.students || []).filter(
        (student: Student) => student.progress >= 100
      );
      setStudents(eligibleStudents);
      
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // Set some mock data for development
      setStudents([
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          course: "Hair Styling Fundamentals",
          progress: 100,
          status: "completed"
        },
        {
          id: "2", 
          name: "Jane Smith",
          email: "jane@example.com",
          course: "Makeup Artistry",
          progress: 100,
          status: "completed"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !certificateFile) {
      setUploadMessage("Error: Please select a student and choose a certificate file.");
      setTimeout(() => setUploadMessage(""), 5000);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append("certificate", certificateFile);
      formData.append("studentId", selectedStudent.id);
      formData.append("studentName", selectedStudent.name);
      formData.append("courseName", selectedStudent.course);

      const response = await uploadFile(
        API_CONFIG.ENDPOINTS.ADMIN.CERTIFICATES.UPLOAD,
        formData,
        (progress) => setUploadProgress(progress)
      );

      // Success
      fetchCertificates();
      setShowGenerateModal(false);
      setSelectedStudent(null);
      setCertificateFile(null);
      setUploadProgress(0);
      setUploadMessage("Certificate uploaded successfully!");
      setTimeout(() => setUploadMessage(""), 5000);
      
    } catch (error: any) {
      setUploadProgress(0);
      setUploadMessage(`Error: ${error.message || "Failed to upload certificate"}`);
      setTimeout(() => setUploadMessage(""), 5000);
    } finally {
      setIsUploading(false);
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
              className="btn btn-primary"
              onClick={() => setShowGenerateModal(true)}
              disabled={students.length === 0}
            >
              <i className="ri-upload-line"></i>
              Upload Certificate
            </button>
          </div>
        </div>

        {/* Upload Message */}
        {uploadMessage && (
          <div className={`${styles.uploadMessage} ${uploadMessage.includes('Error') ? styles.error : styles.success}`}>
            {uploadMessage}
          </div>
        )}

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

        {/* Upload Progress Overlay */}
      {isUploading && uploadProgress > 0 && (
        <LoadingOverlay 
          text="Uploading Certificate" 
          progress={uploadProgress}
        />
      )}

      {/* Upload Certificate Modal */}
        {showGenerateModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Upload Certificate</h2>
                <button
                  onClick={() => {
                    setShowGenerateModal(false);
                    setSelectedStudent(null);
                    setCertificateFile(null);
                    setUploadMessage("");
                  }}
                  className={styles.closeBtn}
                  disabled={isUploading}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUploadCertificate} className={styles.modalBody}>
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

                <div className={styles.formGroup}>
                  <label>Certificate File</label>
                  <div 
                    className={`${styles.fileUploadArea} ${isDragOver ? styles.dragOver : ''}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      
                      const files = e.dataTransfer.files;
                      if (files.length > 0) {
                        const file = files[0];
                        
                        // Validate file size (10MB max)
                        if (file.size > 10 * 1024 * 1024) {
                          setUploadMessage("Error: File size must be less than 10MB");
                          setTimeout(() => setUploadMessage(""), 5000);
                          return;
                        }
                        
                        // Validate file type
                        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
                        if (!allowedTypes.includes(file.type)) {
                          setUploadMessage("Error: Please select a valid file type (PDF, JPG, JPEG, PNG)");
                          setTimeout(() => setUploadMessage(""), 5000);
                          return;
                        }
                        
                        setCertificateFile(file);
                      }
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validate file size (10MB max)
                          if (file.size > 10 * 1024 * 1024) {
                            setUploadMessage("Error: File size must be less than 10MB");
                            setTimeout(() => setUploadMessage(""), 5000);
                            e.target.value = "";
                            return;
                          }
                          
                          // Validate file type
                          const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
                          if (!allowedTypes.includes(file.type)) {
                            setUploadMessage("Error: Please select a valid file type (PDF, JPG, JPEG, PNG)");
                            setTimeout(() => setUploadMessage(""), 5000);
                            e.target.value = "";
                            return;
                          }
                          
                          setCertificateFile(file);
                        } else {
                          setCertificateFile(null);
                        }
                      }}
                      required
                      className={styles.fileInput}
                      id="certificate-file"
                    />
                    <label htmlFor="certificate-file" className={styles.fileUploadLabel}>
                      <div className={styles.uploadIcon}>
                        <i className={certificateFile ? "ri-file-check-line" : "ri-upload-cloud-line"}></i>
                      </div>
                      <div className={styles.uploadText}>
                        <span className={styles.uploadTitle}>
                          {certificateFile ? certificateFile.name : "Choose certificate file"}
                        </span>
                        <span className={styles.uploadSubtitle}>
                          {isDragOver ? "Drop file here" : "or drag and drop here"}
                        </span>
                      </div>
                    </label>
                  </div>
                  <small className={styles.fileNote}>
                    Supported formats: PDF, JPG, JPEG, PNG (Max: 10MB)
                  </small>
                </div>

                {selectedStudent && (
                  <div className={styles.studentPreview}>
                    <h4>Student Information</h4>
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

                {certificateFile && (
                  <div className={styles.filePreview}>
                    <h4>Selected File</h4>
                    <div className={styles.fileInfo}>
                      <p>
                        <strong>File Name:</strong> {certificateFile.name}
                      </p>
                      <p>
                        <strong>File Size:</strong> {(certificateFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p>
                        <strong>File Type:</strong> {certificateFile.type}
                      </p>
                    </div>
                  </div>
                )}

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowGenerateModal(false);
                      setSelectedStudent(null);
                      setCertificateFile(null);
                      setUploadMessage("");
                    }}
                    className="btn btn-secondary"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!selectedStudent || !certificateFile || isUploading}
                  >
                    {isUploading ? (
                      <LoadingSpinner 
                        size="small" 
                        color="white" 
                        text={uploadProgress > 0 ? `Uploading ${Math.round(uploadProgress)}%` : "Uploading..."}
                      />
                    ) : (
                      "Upload Certificate"
                    )}
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
