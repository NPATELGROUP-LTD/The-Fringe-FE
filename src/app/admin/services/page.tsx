"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../../components/layout/AdminLayout";
import styles from "./Services.module.css";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  status: "active" | "inactive";
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    category: "",
  });
  const [editService, setEditService] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    category: "",
  });
  const router = useRouter();

  useEffect(() => {
    const adminSession = localStorage.getItem("admin_session");
    if (!adminSession) {
      router.push("/admin/login");
      return;
    }
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services");
      const data = await response.json();
      if (response.ok) {
        setServices(data.services);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newService,
          price: parseFloat(newService.price),
        }),
      });

      if (response.ok) {
        setShowAddForm(false);
        setNewService({
          name: "",
          description: "",
          duration: "",
          price: "",
          category: "",
        });
        fetchServices();
        alert("Service added successfully!");
      }
    } catch (error) {
      alert("Error adding service");
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setEditService({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price.toString(),
      category: service.category,
    });
    setShowEditForm(true);
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const response = await fetch(`/api/admin/services/${editingService.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editService,
          price: parseFloat(editService.price),
        }),
      });

      if (response.ok) {
        setShowEditForm(false);
        setEditingService(null);
        setEditService({
          name: "",
          description: "",
          duration: "",
          price: "",
          category: "",
        });
        fetchServices();
        alert("Service updated successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update service");
      }
    } catch (error) {
      alert("Error updating service");
    }
  };

  const toggleServiceStatus = async (
    serviceId: string,
    currentStatus: string
  ) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      alert("Error updating service status");
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className={styles.loading}>Loading services...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={styles.servicesPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>Services Management</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            Add New Service
          </button>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={`card ${styles.serviceCard}`}>
              <div className={styles.serviceHeader}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <span className={`${styles.status} ${styles[service.status]}`}>
                  {service.status}
                </span>
              </div>
              <p className={styles.serviceDescription}>{service.description}</p>
              <div className={styles.serviceDetails}>
                <div className={styles.detailItem}>
                  <span>Duration: {service.duration}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Price: ${service.price}</span>
                </div>
                <div className={styles.detailItem}>
                  <span>Category: {service.category}</span>
                </div>
              </div>
              <div className={styles.serviceActions}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEditService(service)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    toggleServiceStatus(service.id, service.status)
                  }
                >
                  {service.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {showAddForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Add New Service</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddService} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Service Name</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                    required
                    className="input"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        description: e.target.value,
                      })
                    }
                    required
                    className="input"
                    rows={3}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Duration</label>
                    <input
                      type="text"
                      value={newService.duration}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          duration: e.target.value,
                        })
                      }
                      required
                      className="input"
                      placeholder="e.g., 60 minutes"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Price ($)</label>
                    <input
                      type="number"
                      value={newService.price}
                      onChange={(e) =>
                        setNewService({ ...newService, price: e.target.value })
                      }
                      required
                      className="input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <div className={styles.categoryInputGroup}>
                    <select
                      value={newService.category}
                      onChange={(e) =>
                        setNewService({ ...newService, category: e.target.value })
                      }
                      required
                      className="input"
                    >
                      <option value="">Select Category</option>
                      <option value="HAIR">Hair</option>
                      <option value="MAKEUP">Makeup</option>
                      <option value="NAILS">Nails</option>
                      <option value="SKIN">Skin Care</option>
                      <option value="MASSAGE">Massage</option>
                      <option value="SPA">Spa</option>
                      <option value="BROWS">Brows</option>
                      <option value="WAXING">Waxing</option>
                      <option value="TANNING">Tanning</option>
                      <option value="custom">+ Add New Category</option>
                    </select>
                    {newService.category === 'custom' && (
                      <input
                        type="text"
                        placeholder="Enter new category name"
                        onChange={(e) => {
                          const customCategory = e.target.value.toUpperCase().replace(/\s+/g, '_');
                          setNewService({ ...newService, category: customCategory });
                        }}
                        className="input"
                        style={{ marginTop: '8px' }}
                      />
                    )}
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
                    Add Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Service Modal */}
        {showEditForm && editingService && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>Edit Service</h2>
                <button
                  onClick={() => {
                    setShowEditForm(false);
                    setEditingService(null);
                  }}
                  className={styles.closeBtn}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleUpdateService} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Service Name</label>
                  <input
                    type="text"
                    value={editService.name}
                    onChange={(e) =>
                      setEditService({ ...editService, name: e.target.value })
                    }
                    required
                    className="input"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    value={editService.description}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        description: e.target.value,
                      })
                    }
                    required
                    className="input"
                    rows={3}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Duration</label>
                    <input
                      type="text"
                      value={editService.duration}
                      onChange={(e) =>
                        setEditService({
                          ...editService,
                          duration: e.target.value,
                        })
                      }
                      required
                      className="input"
                      placeholder="e.g., 60 minutes"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Price ($)</label>
                    <input
                      type="number"
                      value={editService.price}
                      onChange={(e) =>
                        setEditService({
                          ...editService,
                          price: e.target.value,
                        })
                      }
                      required
                      className="input"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={editService.category}
                    onChange={(e) =>
                      setEditService({
                        ...editService,
                        category: e.target.value,
                      })
                    }
                    required
                    className="input"
                  >
                    <option value="">Select Category</option>
                    <option value="Hair">Hair</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Nails">Nails</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Bridal">Bridal</option>
                  </select>
                </div>
                <div className={styles.formActions}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setEditingService(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Service
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
