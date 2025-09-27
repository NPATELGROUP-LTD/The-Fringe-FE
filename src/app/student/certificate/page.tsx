"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentLayout from "../../../components/layout/StudentLayout";
import styles from "./Certificate.module.css";

export default function CertificatePage() {
  const [student, setStudent] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const studentSession = localStorage.getItem("student_session");
    if (!studentSession) {
      router.push("/student/login");
      return;
    }
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch("/api/student/dashboard");
      const data = await response.json();
      if (response.ok) {
        setStudent(data.student);
        setCourse(data.course);
        setProgress(data.progress);
      }
    } catch (error) {
      console.error("Failed to fetch student data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCertificate = async () => {
    if (progress?.progressPercent >= 100) {
      alert(
        "Certificate generated! In a real application, this would create a downloadable PDF certificate."
      );
    } else {
      alert(
        "You must complete 100% of the course to generate your certificate."
      );
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className={styles.loading}>Loading certificate information...</div>
      </StudentLayout>
    );
  }

  const isEligible = progress?.progressPercent >= 100;

  return (
    <StudentLayout>
      <div className={styles.certificatePage}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Certificate</h1>
          <p className={styles.subtitle}>
            Complete your course to earn your professional certificate
          </p>
        </div>

        <div className={styles.certificateContainer}>
          {isEligible ? (
            <div className={styles.certificateCard}>
              <div className={styles.certificatePreview}>
                <div className={styles.certificateHeader}>
                  <h2>Certificate of Completion</h2>
                  <div className={styles.logo}>The Fringe Academy</div>
                </div>

                <div className={styles.certificateBody}>
                  <p className={styles.certificateText}>
                    This is to certify that
                  </p>
                  <h3 className={styles.studentName}>
                    {student?.name || "Student Name"}
                  </h3>
                  <p className={styles.certificateText}>
                    has successfully completed the course
                  </p>
                  <h4 className={styles.courseName}>{course?.title}</h4>
                  <p className={styles.completionDate}>
                    Completed on {new Date().toLocaleDateString()}
                  </p>
                </div>

                <div className={styles.certificateFooter}>
                  <div className={styles.signature}>
                    <div className={styles.signatureLine}></div>
                    <p>Director, The Fringe Academy</p>
                  </div>
                </div>
              </div>

              <div className={styles.certificateActions}>
                <button
                  onClick={generateCertificate}
                  className="btn btn-primary btn-lg"
                >
                  Download Certificate
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn btn-secondary btn-lg"
                >
                  Print Certificate
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.progressCard}>
              <div className={styles.progressHeader}>
                <h2>Course Progress</h2>
                <p>Complete your course to unlock your certificate</p>
              </div>

              <div className={styles.progressDetails}>
                <div className={styles.progressCircle}>
                  <div
                    className={styles.progressRing}
                    style={{
                      background: `conic-gradient(var(--color-text-primary) ${
                        (progress?.progressPercent || 0) * 3.6
                      }deg, var(--color-border) 0deg)`,
                    }}
                  >
                    <div className={styles.progressInner}>
                      <span className={styles.progressPercent}>
                        {Math.round(progress?.progressPercent || 0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.progressInfo}>
                  <h3>{course?.title}</h3>
                  <p>
                    {progress?.completedModules?.length || 0} of{" "}
                    {course?.modules?.length || 0} modules completed
                  </p>
                  <div className={styles.remainingModules}>
                    <p>
                      {Math.max(
                        0,
                        (course?.modules?.length || 0) -
                          (progress?.completedModules?.length || 0)
                      )}{" "}
                      modules remaining
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.encouragement}>
                <p>
                  Keep going! You're{" "}
                  {Math.round(progress?.progressPercent || 0)}% of the way
                  there.
                </p>
                <a href="/student/my-course" className="btn btn-primary">
                  Continue Learning
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
