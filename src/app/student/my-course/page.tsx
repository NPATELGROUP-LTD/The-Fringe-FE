"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentLayout from "../../../components/layout/StudentLayout";
import VideoPlayer from "../../../components/ui/VideoPlayer";
import styles from "./MyCourse.module.css";

export default function MyCourse() {
  const [course, setCourse] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const studentSession = localStorage.getItem("student_session");
    if (!studentSession) {
      router.push("/student/login");
      return;
    }
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const response = await fetch("/api/student/dashboard");
      const data = await response.json();
      if (response.ok) {
        setCourse(data.course);
        setProgress(data.progress);
        if (data.course?.modules?.length > 0) {
          setCurrentModule(data.course.modules[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch course data:", error);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId, progress, watchTime }),
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className={styles.loading}>Loading your course...</div>
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
      <div className={styles.myCoursePage}>
        <div className={styles.courseHeader}>
          <h1 className={styles.courseTitle}>{course.title}</h1>
          <p className={styles.courseDescription}>{course.description}</p>
          <div className={styles.progressOverview}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress?.progressPercent || 0}%` }}
              ></div>
            </div>
            <span className={styles.progressText}>
              {Math.round(progress?.progressPercent || 0)}% Complete
            </span>
          </div>
        </div>

        <div className={styles.courseContent}>
          <div className={styles.modulesList}>
            <h2>Course Modules</h2>
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
                  <h3>{module.title}</h3>
                  <p>
                    {module.duration
                      ? `${module.duration} min`
                      : "Duration varies"}
                  </p>
                </div>
                <div className={styles.moduleStatus}>
                  {progress?.completedModules?.includes(module.id) ? "✓" : "○"}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.videoSection}>
            {currentModule ? (
              <>
                <h2>{currentModule.title}</h2>
                {currentModule.description && (
                  <p className={styles.moduleDescription}>
                    {currentModule.description}
                  </p>
                )}

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
                  <div className={styles.textContent}>
                    <h3>Module Content</h3>
                    <div className={styles.contentText}>
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
      </div>
    </StudentLayout>
  );
}
