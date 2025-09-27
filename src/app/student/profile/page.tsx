"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentLayout from "../../../components/layout/StudentLayout";
import styles from "./Profile.module.css";

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  progress: number;
  status: "active" | "completed" | "paused";
  certificateUrl?: string;
}

export default function StudentProfile() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();

  useEffect(() => {
    const studentSession = localStorage.getItem("student_session");
    if (!studentSession) {
      router.push("/student/login");
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/student/profile");
      const data = await response.json();
      if (response.ok) {
        setProfile(data.profile);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    try {
      const response = await fetch("/api/student/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setShowPasswordReset(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        alert("Password changed successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to change password");
      }
    } catch (error) {
      alert("Error changing password");
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className={styles.loading}>Loading profile...</div>
      </StudentLayout>
    );
  }

  if (!profile) {
    return (
      <StudentLayout>
        <div className={styles.error}>Failed to load profile</div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
          <button
            onClick={() => setShowPasswordReset(true)}
            className="btn btn-secondary"
          >
            Change Password
          </button>
        </div>

        <div className={styles.profileContent}>
          {/* Profile Information */}
          <div className={`card ${styles.profileCard}`}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar}>
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>{profile.name}</h2>
                <p className={styles.profileEmail}>{profile.email}</p>
                <span className={`${styles.status} ${styles[profile.status]}`}>
                  {profile.status.charAt(0).toUpperCase() +
                    profile.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Course Information */}
          <div className={`card ${styles.courseCard}`}>
            <h3 className={styles.sectionTitle}>Course Details</h3>
            <div className={styles.courseInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Enrolled Course:</span>
                <span className={styles.infoValue}>{profile.course}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Enrollment Date:</span>
                <span className={styles.infoValue}>
                  {new Date(profile.enrollmentDate).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Progress:</span>
                <div className={styles.progressContainer}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${profile.progress}%` }}
                    ></div>
                  </div>
                  <span className={styles.progressText}>
                    {profile.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Status */}
          <div className={`card ${styles.certificateCard}`}>
            <h3 className={styles.sectionTitle}>Certificate Status</h3>
            <div className={styles.certificateInfo}>
              {profile.certificateUrl ? (
                <div className={styles.certificateAvailable}>
                  <div className={styles.certificateIcon}>🏆</div>
                  <div>
                    <p className={styles.certificateText}>
                      Congratulations! Your certificate is ready.
                    </p>
                    <a
                      href={profile.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Download Certificate
                    </a>
                  </div>
                </div>
              ) : (
                <div className={styles.certificateNotAvailable}>
                  <div className={styles.certificateIcon}>📋</div>
                  <div>
                    <p className={styles.certificateText}>
                      Certificate not yet available.
                    </p>
                    <p className={styles.certificateSubtext}>
                      Complete your course to receive your certificate.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Password Reset Modal */}
        {showPasswordReset && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Change Password</h2>
                <button
                  onClick={() => {
                    setShowPasswordReset(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handlePasswordReset} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    className="input"
                    placeholder="Enter current password"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    className="input"
                    placeholder="Enter new password"
                    minLength={6}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="input"
                    placeholder="Confirm new password"
                    minLength={6}
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordReset(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Change Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
