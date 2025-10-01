"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { servicesService, type Service } from "../../services/services.service";
import { settingsService } from "../../services/settings.service";
import styles from "./Services.module.css";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  services: Service[];
}

export default function Services() {
  const { scrollTo } = useSmoothScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const [isNavCompact, setIsNavCompact] = useState(false);
  const [activeSlides, setActiveSlides] = useState<{ [key: string]: number }>(
    {}
  );
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [showPrices, setShowPrices] = useState(true);

  // Category mapping for display information
  const categoryDisplayInfo: {
    [key: string]: { title: string; subtitle: string; description: string };
  } = {
    HAIR: {
      title: "Hair Services",
      subtitle: "Transform Your Hair",
      description: "Professional hair styling and treatments",
    },
    SKIN: {
      title: "Skin Care",
      subtitle: "Rejuvenate Your Skin",
      description: "Luxurious facial treatments and skin care",
    },
    MAKEUP: {
      title: "Makeup Services",
      subtitle: "Complete Your Look",
      description: "Professional makeup for any occasion",
    },
    NAILS: {
      title: "Nail Services",
      subtitle: "Perfect Your Nails",
      description: "Professional nail care and artistic designs",
    },
    MASSAGE: {
      title: "Massage Therapy",
      subtitle: "Relax & Rejuvenate",
      description: "Therapeutic massage treatments for wellness",
    },
    SPA: {
      title: "Spa Treatments",
      subtitle: "Ultimate Relaxation",
      description: "Luxurious spa experiences and treatments",
    },
    BROWS: {
      title: "Brow Services",
      subtitle: "Frame Your Face",
      description: "Expert brow shaping and enhancement",
    },
    WAXING: {
      title: "Waxing Services",
      subtitle: "Smooth & Silky",
      description: "Professional hair removal services",
    },
    TANNING: {
      title: "Tanning Services",
      subtitle: "Golden Glow",
      description: "Safe and natural-looking tanning solutions",
    },
  };

  // Fetch services data and settings on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch both services and settings
        const [featuredServices, settings] = await Promise.all([
          servicesService.getFeaturedServicesByCategory(3),
          settingsService.getSettings(),
        ]);

        setShowPrices(settings.showPrices);

        const categories: ServiceCategory[] = Object.keys(featuredServices)
          .slice(0, 4) // Limit to only 4 categories
          .map((categoryKey) => {
            const displayInfo = categoryDisplayInfo[categoryKey] || {
              title: categoryKey.charAt(0) + categoryKey.slice(1).toLowerCase(),
              subtitle: `${
                categoryKey.charAt(0) + categoryKey.slice(1).toLowerCase()
              } Services`,
              description: `Professional ${categoryKey.toLowerCase()} services`,
            };

            return {
              id: categoryKey.toLowerCase() + "-services",
              title: displayInfo.title,
              subtitle: displayInfo.subtitle,
              description: displayInfo.description,
              services: featuredServices[categoryKey],
            };
          });

        setServiceCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sectionsRef.current.length === 0) return;

    // Handle navigation scroll state
    const handleScroll = () => {
      if (navRef.current) {
        const scrollY = window.scrollY;
        const navTop = navRef.current.offsetTop;
        setIsNavCompact(scrollY > navTop + 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Set up GSAP animations for each section
    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      // Animate section entrance
      gsap.fromTo(
        section.querySelector(`.${styles.categoryHeader}`),
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate service cards
      const serviceCards = section.querySelectorAll(`.${styles.serviceCard}`);
      gsap.fromTo(
        serviceCards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Carousel functionality useEffect
  useEffect(() => {
    // Initialize active slides
    const initialActiveSlides: { [key: string]: number } = {};
    serviceCategories.forEach((category) => {
      initialActiveSlides[category.id] = 0;
    });
    setActiveSlides(initialActiveSlides);

    // Add scroll listeners for each carousel
    const handleCarouselScroll = (categoryId: string) => {
      const container = document.getElementById(`services-${categoryId}`);
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const cardWidth =
        container.children[0]?.getBoundingClientRect().width || 0;

      // Dynamic gap based on screen width
      let gap = 30; // Default for >1024px
      if (window.innerWidth <= 320) gap = 15;
      else if (window.innerWidth <= 480) gap = 20;
      else if (window.innerWidth <= 768) gap = 25;
      else if (window.innerWidth <= 1024) gap = 30;

      const activeIndex = Math.round(scrollLeft / (cardWidth + gap));

      setActiveSlides((prev) => ({
        ...prev,
        [categoryId]: Math.max(
          0,
          Math.min(activeIndex, container.children.length - 1)
        ),
      }));
    };

    const scrollListeners: Array<() => void> = [];

    // Set up scroll listeners with a delay to ensure DOM is ready
    const setupListeners = () => {
      serviceCategories.forEach((category) => {
        const container = document.getElementById(`services-${category.id}`);
        if (container) {
          const listener = () => handleCarouselScroll(category.id);
          container.addEventListener("scroll", listener, { passive: true });
          scrollListeners.push(() =>
            container.removeEventListener("scroll", listener)
          );
        }
      });
    };

    // Setup listeners after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(setupListeners, 100);

    return () => {
      clearTimeout(timeoutId);
      scrollListeners.forEach((cleanup) => cleanup());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const scrollToCategory = (categoryId: string) => {
    scrollTo(`#${categoryId}`, { duration: 1.5 });
  };

  if (loading) {
    return (
      <section id="services" className={styles.servicesWrapper}>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}>Loading Services...</div>
        </div>
      </section>
    );
  }

  if (serviceCategories.length === 0) {
    return (
      <section id="services" className={styles.servicesWrapper}>
        <div className={styles.errorContainer}>
          <p>No services available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className={styles.servicesWrapper}
      ref={containerRef}
    >
      {/* Full-screen service category sections */}
      {serviceCategories.map((category, index) => (
        <div
          key={category.id}
          id={category.id}
          ref={addToRefs}
          className={styles.categorySection}
        >
          <div className={styles.categoryContainer}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              <h3 className={styles.categorySubtitle}>{category.subtitle}</h3>
              <p className={styles.categoryDescription}>
                {category.description}
              </p>
            </div>

            <div className={styles.servicesContainer}>
              <div
                className={styles.servicesGrid}
                id={`services-${category.id}`}
              >
                {category.services.map((service, serviceIndex) => (
                  <div key={service.id} className={styles.serviceCard}>
                    <div className={styles.serviceImageContainer}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className={styles.serviceImage}
                      />
                      <div className={styles.serviceOverlay}>
                        <button
                          className={styles.serviceOverlayButton}
                          onClick={() => (window.location.href = "/services")}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                    <div className={styles.serviceContent}>
                      <h4 className={styles.serviceTitle}>{service.title}</h4>
                      <p className={styles.serviceDescription}>
                        {service.description}
                      </p>

                      <div className={styles.serviceDetails}>
                        <div className={styles.serviceMeta}>
                          <span className={styles.duration}>
                            ⏱ {service.duration}
                          </span>
                          {showPrices ? (
                            <span className={styles.price}>
                              ${service.price}
                            </span>
                          ) : (
                            <span className={styles.contactPrice}>
                              Contact for pricing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Navigation Dots - Only show on mobile */}
              <div className={styles.sliderNavigation}>
                {category.services.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    className={`${styles.sliderDot} ${
                      activeSlides[category.id] === dotIndex
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => {
                      const container = document.getElementById(
                        `services-${category.id}`
                      );
                      const cardWidth =
                        container?.children[0]?.getBoundingClientRect().width ||
                        0;

                      // Dynamic gap based on screen width
                      let gap = 30; // Default for >1024px
                      if (window.innerWidth <= 320) gap = 15;
                      else if (window.innerWidth <= 480) gap = 20;
                      else if (window.innerWidth <= 768) gap = 25;
                      else if (window.innerWidth <= 1024) gap = 30;

                      container?.scrollTo({
                        left: dotIndex * (cardWidth + gap),
                        behavior: "smooth",
                      });
                      setActiveSlides((prev) => ({
                        ...prev,
                        [category.id]: dotIndex,
                      }));
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Final CTA section */}
      <div className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h3 className={styles.ctaTitle}>Ready to Transform Your Look?</h3>
          <p className={styles.ctaDescription}>
            Book your appointment today and experience our premium services
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => scrollTo("#book-now", { duration: 2 })}
          >
            Book Your Appointment
          </button>
        </div>
      </div>
    </section>
  );
}
