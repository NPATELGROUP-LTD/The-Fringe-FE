"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentLayout from "../../../components/layout/StudentLayout";
import styles from "./Settings.module.css";

interface StudentSettings {
  id: string;
  name: string;
  email: string;
  phone?: string;
  notifications: {
    email: boolean;
    sms: boolean;
    courseUpdates: boolean;
    certificateAlerts: boolean;
  };
  privacy: {
    profileVisible: boolean;
    shareProgress: boolean;
  };
}

export default function StudentSettingsPage() {
  const [settings, setSettings] = useState<StudentSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
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
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/student/settings");
      const data = await response.json();
      
      if (response.ok) {
        setSettings(data.settings);
      } else {
        setMessage("Failed to load settings");
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      setMessage("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSettings = async (updatedData: Partial<StudentSettings>) => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/student/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        setMessage("Settings updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to update settings");
      }
    } catch (error) {
      console.error("Failed to update settings:", error);
      setMessage("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }

    setIsSaving(true);
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
        setMessage("Password changed successfully!");
        setShowPasswordChange(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setMessage(""), 3000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Failed to change password:", error);
      setMessage("Failed to change password");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <StudentLayout>
        <div className={styles.loading}>Loading settings...</div>
      </StudentLayout>
    );
  }

  if (!settings) {
    return (
      <StudentLayout>
        <div className={styles.error}>Failed to load settings</div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className={styles.settingsPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>Manage your account preferences and privacy settings</p>
        </div>

        {message && (
          <div className={`${styles.message} ${message.includes('Failed') || message.includes("don't match") || message.includes('must be') ? styles.error : styles.success}`}>
            {message}
          </div>
        )}

        <div className={styles.settingsGrid}>
          {/* Profile Information */}
          <div className={`card ${styles.settingCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Profile Information</h2>
              <p className={styles.cardDescription}>
                Update your personal information
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleUpdateSettings({ name: e.target.value })}
                  className="input"
                  disabled={isSaving}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleUpdateSettings({ email: e.target.value })}
                  className="input"
                  disabled={isSaving}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={settings.phone || ''}
                  onChange={(e) => handleUpdateSettings({ phone: e.target.value })}
                  className="input"
                  placeholder="Enter your phone number"
                  disabled={isSaving}
                />
              </div>
            </div>
          </div>

          {/* Password Security */}
          <div className={`card ${styles.settingCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Password & Security</h2>
              <p className={styles.cardDescription}>
                Keep your account secure
              </p>
            </div>
            <div className={styles.cardContent}>
              {!showPasswordChange ? (
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  Change Password
                </button>
              ) : (
                <form onSubmit={handlePasswordChange} className={styles.passwordForm}>
                  <div className={styles.formGroup}>
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value
                      })}
                      className="input"
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value
                      })}
                      className="input"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value
                      })}
                      className="input"
                      required
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordChange(false);
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                      className="btn btn-secondary"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSaving}
                    >
                      {isSaving ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className={`card ${styles.settingCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Notifications</h2>
              <p className={styles.cardDescription}>
                Choose how you want to be notified
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.toggleGroup}>
                <label className={styles.toggleLabel}>
                  <span>Email Notifications</span>
                  <div className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => handleUpdateSettings({
                        notifications: {
                          ...settings.notifications,
                          email: e.target.checked
                        }
                      })}
                      disabled={isSaving}
                    />
                    <span className={styles.toggleSlider}></span>
                  </div>
                </label>
                
                <label className={styles.toggleLabel}>
                  <span>SMS Notifications</span>
                  <div className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.notifications.sms}
                      onChange={(e) => handleUpdateSettings({
                        notifications: {
                          ...settings.notifications,
                          sms: e.target.checked
                        }
                      })}
                      disabled={isSaving}
                    />
                    <span className={styles.toggleSlider}></span>
                  </div>
                </label>
                
                <label className={styles.toggleLabel}>
                  <span>Course Updates</span>
                  <div className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.notifications.courseUpdates}
                      onChange={(e) => handleUpdateSettings({
                        notifications: {
                          ...settings.notifications,
                          courseUpdates: e.target.checked
                        }
                      })}
                      disabled={isSaving}
                    />
                    <span className={styles.toggleSlider}></span>
                  </div>
                </label>
                
                <label className={styles.toggleLabel}>
                  <span>Certificate Alerts</span>
                  <div className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.notifications.certificateAlerts}
                      onChange={(e) => handleUpdateSettings({
                        notifications: {
                          ...settings.notifications,
                          certificateAlerts: e.target.checked
                        }
                      })}
                      disabled={isSaving}
                    />
                    <span className={styles.toggleSlider}></span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className={`card ${styles.settingCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Privacy</h2>
              <p className={styles.cardDescription}>
                Control your privacy preferences
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.toggleGroup}>
                <label className={styles.toggleLabel}>
                  <span>Profile Visible to Others</span>
                  <div className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.privacy.profileVisible}
                      onChange={(e) => handleUpdateSettings({
                        privacy: {
                          ...settings.privacy,
                          profileVisible: e.target.checked
                        }
                      })}
                      disabled={isSaving}
                    />
                    <span className={styles.toggleSlider}></span>
                  </div>
                </label>
                
                <label className={styles.toggleLabel}>
                  <span>Share Progress with Instructors</span>
                  <div className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.privacy.shareProgress}
                      onChange={(e) => handleUpdateSettings({
                        privacy: {
                          ...settings.privacy,
                          shareProgress: e.target.checked
                        }
                      })}
                      disabled={isSaving}
                    />
                    <span className={styles.toggleSlider}></span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}