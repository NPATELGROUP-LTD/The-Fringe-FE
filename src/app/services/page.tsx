"use client";

import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import styles from "./Services.module.css";
import { servicesService } from "@/services/services.service";
import type { Service } from "@/services/services.service";
import { mockServices as fallbackServices } from "@/services/mockData";
import { useAuth } from "@/hooks/useAuth";

// Use central mock data and derive categories dynamically so UI updates when data changes
const serviceCategoriesFromData = (() => {
  const cats = Array.from(new Set(fallbackServices.map((s) => s.category)));
  const format = (c: string) =>
    c
      .toLowerCase()
      .replace(/[_-]/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return [
    { id: "ALL", name: "All Services" },
    ...cats.map((c) => ({ id: c, name: format(c) })),
  ];
})();

export default function ServicesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesService.getAllServices();
        if (data && data.length > 0) {
          setServices(data);
        } else {
          console.log("No services found in API, using mock data");
          setServices(fallbackServices);
        }
      } catch (error) {
        console.log("Failed to fetch from API, using mock data");
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBooking = async (serviceId: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login?redirect=/services";
      return;
    }

    try {
      await servicesService.bookService({
        serviceId,
        userId: user!.id,
        date: new Date().toISOString().split("T")[0],
        time: "10:00",
      });
      window.location.href = "/student/dashboard";
      setError("");
      alert("Booking successful! Check your dashboard for details.");
    } catch (error) {
      setError("Failed to book the service. Please try again.");
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("ALL") ||
      selectedCategories.includes(service.category);

    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <Layout>
        <section className={styles.servicesPage}>
          <div className={styles.container}>
            <div className={styles.loadingContainer}>
              <div className={styles.loader}>Loading...</div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className={styles.servicesPage}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.pageTitle}>Our Services</h1>
            <p className={styles.pageSubtitle}>
              Discover our comprehensive range of premium beauty services
            </p>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.categoryFilters}>
              {/* Multi-select dropdown trigger */}
              <div
                className={`${styles.filterDropdown} ${
                  dropdownOpen ? styles.open : ""
                }`}
              >
                <button
                  className={`btn ${styles.filterButton}`}
                  onClick={() => setDropdownOpen((s) => !s)}
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                >
                  {selectedCategories.length === 0
                    ? "Filter categories"
                    : `${selectedCategories.length} selected`}
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdownMenu} role="menu">
                    <div className={styles.dropdownHeader}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedCategories(["ALL"])}
                      >
                        All
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedCategories([])}
                      >
                        Clear
                      </button>
                    </div>

                    <ul className={styles.dropdownList}>
                      {serviceCategoriesFromData.map((c) => (
                        <li key={c.id}>
                          <label>
                            <input
                              type="checkbox"
                              checked={
                                selectedCategories.includes("ALL") ||
                                selectedCategories.includes(c.id)
                              }
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setSelectedCategories((prev) => {
                                  if (checked) {
                                    // add
                                    return Array.from(new Set([...prev, c.id]));
                                  }
                                  // remove
                                  return prev.filter(
                                    (x) => x !== c.id && x !== "ALL"
                                  );
                                });
                              }}
                            />
                            <span className={styles.dropdownLabelText}>
                              {c.name}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={service.image} alt={service.title} />
                  <div className={styles.serviceOverlay}>
                    <button
                      onClick={() => handleBooking(service.id)}
                      className="btn btn-primary"
                      disabled={!isAuthenticated}
                    >
                      {isAuthenticated ? "Book Now" : "Login to Book"}
                    </button>
                  </div>
                </div>

                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>

                  <div className={styles.serviceDetails}>
                    <div className={styles.serviceMeta}>
                      <span className={styles.duration}>
                        ⏱ {service.duration}
                      </span>
                      <span className={styles.price}>${service.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredServices.length === 0 && (
              <div className={styles.noResults}>
                <h3>No services found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Ready to Book Your Appointment?</h2>
            <p className={styles.ctaDescription}>
              Our expert stylists are ready to transform your look
            </p>
            <div className={styles.ctaButtons}>
              <a href="/book-now" className="btn btn-primary btn-lg">
                Book Appointment
              </a>
              <a href="/contact" className="btn btn-secondary btn-lg">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
