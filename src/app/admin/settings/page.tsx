"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/layout/AdminLayout";
import { settingsService, type SiteSettings } from "../../../services/settings.service";
import styles from "./Settings.module.css";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session");
    if (!adminSession) {
      router.push("/admin/login");
      return;
    }
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      setMessage("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePrices = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    try {
      const updatedSettings = await settingsService.togglePriceVisibility();
      setSettings(updatedSettings);
      setMessage(`Price visibility ${updatedSettings.showPrices ? 'enabled' : 'disabled'} successfully!`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to toggle price visibility:", error);
      setMessage("Failed to update price visibility");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateSettings = async (updatedData: Partial<SiteSettings>) => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const updatedSettings = await settingsService.updateSettings(updatedData);
      setSettings(updatedSettings);
      setMessage("Settings updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to update settings:", error);
      setMessage("Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading settings...</div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return (
      <AdminLayout>
        <div className={styles.error}>Failed to load settings</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.settingsPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Site Settings</h1>
          <p className={styles.subtitle}>Manage your website configuration</p>
        </div>

        {message && (
          <div className={`${styles.message} ${message.includes('Failed') ? styles.error : styles.success}`}>
            {message}
          </div>
        )}

        <div className={styles.settingsGrid}>
          {/* Price Visibility Settings */}
          <div className={`card ${styles.settingCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Price Display</h2>
              <p className={styles.cardDescription}>
                Control whether prices are shown on the public website
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.toggleContainer}>
                <label className={styles.toggleLabel}>
                  <span>Show Prices on Website</span>
                  <div className={styles.toggle}>
                    <input
                      type="checkbox"
                      checked={settings.showPrices}
                      onChange={handleTogglePrices}
                      disabled={isSaving}
                    />
                    <span className={styles.toggleSlider}></span>
                  </div>
                </label>
                <p className={styles.toggleDescription}>
                  {settings.showPrices 
                    ? "Prices are currently visible to all website visitors"
                    : "Prices are hidden from public view - visitors must contact for pricing"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Site Information */}
          <div className={`card ${styles.settingCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Site Information</h2>
              <p className={styles.cardDescription}>
                Basic information about your business
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formGroup}>
                <label>Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleUpdateSettings({ siteName: e.target.value })}
                  className="input"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleUpdateSettings({ contactEmail: e.target.value })}
                  className="input"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Contact Phone</label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleUpdateSettings({ contactPhone: e.target.value })}
                  className="input"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Address</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => handleUpdateSettings({ address: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className={`card ${styles.settingCard}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Social Media</h2>
              <p className={styles.cardDescription}>
                Your social media profiles
              </p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.formGroup}>
                <label>Facebook URL</label>
                <input
                  type="url"
                  value={settings.socialMedia.facebook || ''}
                  onChange={(e) => handleUpdateSettings({ 
                    socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                  })}
                  className="input"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Instagram URL</label>
                <input
                  type="url"
                  value={settings.socialMedia.instagram || ''}
                  onChange={(e) => handleUpdateSettings({ 
                    socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                  })}
                  className="input"
                  placeholder="https://instagram.com/yourpage"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Twitter URL</label>
                <input
                  type="url"
                  value={settings.socialMedia.twitter || ''}
                  onChange={(e) => handleUpdateSettings({ 
                    socialMedia: { ...settings.socialMedia, twitter: e.target.value }
                  })}
                  className="input"
                  placeholder="https://twitter.com/yourpage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}