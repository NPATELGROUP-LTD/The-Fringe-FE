 "use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import styles from "./Services.module.css";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const { scrollTo } = useSmoothScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const [isNavCompact, setIsNavCompact] = useState(false);

  const serviceCategories = [
    {
      id: "hair-services",
      title: "Hair Services",
      subtitle: "Transform Your Hair",
      description: "Professional hair styling and treatments",
      services: [
        {
          id: 1,
          title: "Premium Hair Cut",
          description:
            "Precision cuts tailored to your face shape and lifestyle",
          price: "From $45",
          image: "/images/hair-cut.jpg",
        },
        {
          id: 2,
          title: "Hair Styling",
          description: "Special event styling and everyday looks",
          price: "From $35",
          image: "/images/hair-styling.jpg",
        },
        {
          id: 3,
          title: "Hair Treatments",
          description: "Deep conditioning and repair treatments",
          price: "From $55",
          image: "/images/hair-treatment.jpg",
        },
      ],
    },
    {
      id: "color-services",
      title: "Color Services",
      subtitle: "Express Your Style",
      description: "Expert coloring techniques and color correction",
      services: [
        {
          id: 4,
          title: "Full Color",
          description: "Complete color transformation with premium products",
          price: "From $75",
          image: "/images/full-color.jpg",
        },
        {
          id: 5,
          title: "Highlights & Balayage",
          description:
            "Natural-looking highlights and modern balayage techniques",
          price: "From $95",
          image: "/images/highlights.jpg",
        },
        {
          id: 6,
          title: "Color Correction",
          description: "Fix and transform previous color work",
          price: "From $120",
          image: "/images/color-correction.jpg",
        },
      ],
    },
    {
      id: "beauty-services",
      title: "Beauty Services",
      subtitle: "Complete Your Look",
      description: "Professional makeup and beauty treatments",
      services: [
        {
          id: 7,
          title: "Bridal Makeup",
          description: "Flawless makeup for your special day",
          price: "From $85",
          image: "/images/bridal-makeup.jpg",
        },
        {
          id: 8,
          title: "Special Event Makeup",
          description: "Glamorous looks for parties and events",
          price: "From $65",
          image: "/images/event-makeup.jpg",
        },
        {
          id: 9,
          title: "Nail Art & Manicure",
          description: "Creative nail designs and professional manicures",
          price: "From $25",
          image: "/images/nail-art.jpg",
        },
      ],
    },
  ];

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

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const scrollToCategory = (categoryId: string) => {
    scrollTo(`#${categoryId}`, { duration: 1.5 });
  };

  return (
    <section
      id="services"
      className={styles.servicesWrapper}
      ref={containerRef}
    >
      {/* Compact Navigation for service categories */}
      <div
        className={`${styles.serviceNavigation} ${
          isNavCompact ? styles.compact : ""
        }`}
        ref={navRef}
      >
        <div className={styles.navContainer}>
          <div className={styles.categoryButtons}>
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={styles.categoryNavButton}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>

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

            <div className={styles.servicesGrid}>
              {category.services.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceImageContainer}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className={styles.serviceImage}
                    />
                    <div className={styles.serviceOverlay}>
                      <span className={styles.servicePrice}>
                        {service.price}
                      </span>
                    </div>
                  </div>
                  <div className={styles.serviceContent}>
                    <h4 className={styles.serviceTitle}>{service.title}</h4>
                    <p className={styles.serviceDescription}>
                      {service.description}
                    </p>
                    <button className={styles.serviceButton}>Book Now</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll indicator for next section */}
            {index < serviceCategories.length - 1 && (
              <div
                className={styles.scrollIndicator}
                onClick={() =>
                  scrollToCategory(serviceCategories[index + 1].id)
                }
              >
                <span>Next Category</span>
                <div className={styles.scrollArrow}>
                  <i className="ri-arrow-down-line"></i>
                </div>
              </div>
            )}
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
