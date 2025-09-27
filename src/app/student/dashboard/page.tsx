"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentLayout from "../../../components/layout/StudentLayout";
import VideoPlayer from "../../../components/ui/VideoPlayer";
import styles from "./Dashboard.module.css";

export default function StudentDashboard() {
  const [student, setStudent] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check student authentication
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
        if (data.course?.modules?.length > 0) {
          setCurrentModule(data.course.modules[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch student data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModuleSelect = (module: any) => {
    setCurrentModule(module);
  };

  const handleVideoProgress = async (
    moduleId: string,
    progress: number,
    watchTime: number
  ) => {
    try {
      await fetch("/api/student/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moduleId,
          progress,
          watchTime,
        }),
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className={styles.loading}>Loading your dashboard...</div>
      </StudentLayout>
    );
  }

  if (!course) {
    return (
      <StudentLayout>
        <div className={styles.noCourse}>
          <h2>No Course Assigned</h2>
          <p>Please contact your instructor to get enrolled in a course.</p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className={styles.dashboard}>
        {/* Course Header */}
        <div className={styles.courseHeader}>
          <div className={styles.courseInfo}>
            <h1 className={styles.courseTitle}>{course.title}</h1>
            <p className={styles.courseDescription}>{course.description}</p>
          </div>

          <div className={styles.progressOverview}>
            <div className={styles.progressCircle}>
              <div className={styles.progressValue}>
                {Math.round(progress?.progressPercent || 0)}%
              </div>
            </div>
            <div className={styles.progressText}>
              <p>Course Progress</p>
              <span>
                {progress?.completedModules || 0} of{" "}
                {course.modules?.length || 0} modules
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {/* Module List */}
          <div className={styles.modulesList}>
            <h2 className={styles.sectionTitle}>Course Modules</h2>
            <div className={styles.modules}>
              {course.modules?.map((module: any, index: number) => (
                <div
                  key={module.id}
                  className={`${styles.moduleItem} ${
                    currentModule?.id === module.id ? styles.active : ""
                  } ${
                    progress?.completedModules?.includes(module.id)
                      ? styles.completed
                      : ""
                  }`}
                  onClick={() => handleModuleSelect(module)}
                >
                  <div className={styles.moduleNumber}>{index + 1}</div>
                  <div className={styles.moduleContent}>
                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                    <p className={styles.moduleDuration}>
                      {module.duration
                        ? `${module.duration} min`
                        : "Duration varies"}
                    </p>
                  </div>
                  <div className={styles.moduleStatus}>
                    {progress?.completedModules?.includes(module.id)
                      ? "✓"
                      : "○"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Player */}
          <div className={styles.videoSection}>
            {currentModule ? (
              <>
                <div className={styles.videoHeader}>
                  <h2 className={styles.moduleTitle}>{currentModule.title}</h2>
                  {currentModule.description && (
                    <p className={styles.moduleDescription}>
                      {currentModule.description}
                    </p>
                  )}
                </div>

                {currentModule.videoUrl ? (
                  <VideoPlayer
                    src={currentModule.videoUrl}
                    onProgress={(progress, watchTime) =>
                      handleVideoProgress(currentModule.id, progress, watchTime)
                    }
                    startTime={
                      progress?.moduleProgress?.[currentModule.id]
                        ?.lastPosition || 0
                    }
                  />
                ) : (
                  <div className={styles.noVideo}>
                    <h3>Content Module</h3>
                    <div className={styles.moduleContentText}>
                      {currentModule.content ||
                        "No content available for this module."}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.selectModule}>
                <h3>Select a Module</h3>
                <p>Choose a module from the list to start learning.</p>
              </div>
            )}
          </div>
        </div>

        {/* Certificate Section */}
        {student?.certificateUrl && (
          <div className={styles.certificateSection}>
            <h2 className={styles.sectionTitle}>Your Certificate</h2>
            <div className={`card ${styles.certificateCard}`}>
              <div className={styles.certificateIcon}>🏆</div>
              <div className={styles.certificateContent}>
                <h3>Course Completion Certificate</h3>
                <p>
                  Congratulations! You have successfully completed this course.
                </p>
                <a
                  href={student.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Certificate
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
