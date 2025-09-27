"use client";

import { useState } from "react";
import Layout from "../../components/layout/Layout";
import styles from "./Services.module.css";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const services = [
    {
      id: 1,
      title: "Precision Hair Cut",
      description: "Expert cutting techniques for all hair types and styles",
      category: "HAIR_STYLING",
      price: 85,
      duration: "60 min",
      image: "/images/services/hair-cut.jpg",
    },
    {
      id: 2,
      title: "Hair Color & Highlights",
      description: "Professional coloring with premium products",
      category: "HAIR_COLORING",
      price: 150,
      duration: "120 min",
      image: "/images/services/hair-color.jpg",
    },
    {
      id: 3,
      title: "Balayage & Ombre",
      description: "Hand-painted highlighting techniques for natural looks",
      category: "HAIR_COLORING",
      price: 200,
      duration: "180 min",
      image: "/images/services/balayage.jpg",
    },
    {
      id: 4,
      title: "Bridal Makeup",
      description: "Complete bridal makeup for your special day",
      category: "MAKEUP",
      price: 250,
      duration: "90 min",
      image: "/images/services/bridal-makeup.jpg",
    },
    {
      id: 5,
      title: "Special Event Makeup",
      description: "Professional makeup for parties, photoshoots, and events",
      category: "MAKEUP",
      price: 120,
      duration: "60 min",
      image: "/images/services/event-makeup.jpg",
    },
    {
      id: 6,
      title: "Nail Art & Design",
      description: "Creative nail designs and professional manicures",
      category: "NAIL_ART",
      price: 65,
      duration: "45 min",
      image: "/images/services/nail-art.jpg",
    },
    {
      id: 7,
      title: "Facial Treatment",
      description: "Deep cleansing and rejuvenating facial treatments",
      category: "SKINCARE",
      price: 90,
      duration: "75 min",
      image: "/images/services/facial.jpg",
    },
    {
      id: 8,
      title: "Hair Styling",
      description: "Professional styling for any occasion",
      category: "HAIR_STYLING",
      price: 60,
      duration: "45 min",
      image: "/images/services/hair-styling.jpg",
    },
  ];

  const categories = [
    { value: "ALL", label: "All Services" },
    { value: "HAIR_STYLING", label: "Hair Styling" },
    { value: "HAIR_COLORING", label: "Hair Coloring" },
    { value: "MAKEUP", label: "Makeup" },
    { value: "NAIL_ART", label: "Nail Art" },
    { value: "SKINCARE", label: "Skincare" },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "ALL" || service.category === selectedCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <section className={styles.servicesPage}>
        <div className="container">
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
                className={`input ${styles.searchInput}`}
              />
            </div>

            <div className={styles.categoryFilters}>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`${styles.categoryButton} ${
                    selectedCategory === category.value ? styles.active : ""
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <div key={service.id} className={`card ${styles.serviceCard}`}>
                <div className={styles.serviceImage}>
                  <img src={service.image} alt={service.title} />
                  <div className={styles.serviceOverlay}>
                    <button className="btn btn-primary">Book Now</button>
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
          </div>

          {filteredServices.length === 0 && (
            <div className={styles.noResults}>
              <h3>No services found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}

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
