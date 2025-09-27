import Layout from "../../components/layout/Layout";
import styles from "./Team.module.css";

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Martinez",
      title: "Master Stylist & Academy Director",
      bio: "With over 15 years of experience, Sarah leads our team with expertise in advanced cutting techniques and color theory.",
      image: "/images/team/sarah-martinez.jpg",
      rating: 4.9,
      specialties: ["Hair Cutting", "Color Theory", "Balayage", "Training"],
      certifications: [
        "Aveda Master Colorist",
        "Vidal Sassoon Advanced Cutting",
      ],
      experience: "15+ years",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Senior Hair Colorist",
      bio: "Specializing in complex color corrections and creative color techniques, Michael brings artistry to every appointment.",
      image: "/images/team/michael-chen.jpg",
      rating: 4.8,
      specialties: [
        "Color Correction",
        "Creative Color",
        "Highlights",
        "Balayage",
      ],
      certifications: [
        "Redken Color Specialist",
        "Schwarzkopf Master Colorist",
      ],
      experience: "12+ years",
    },
    {
      id: 3,
      name: "Jessica Williams",
      title: "Lead Makeup Artist",
      bio: "From bridal to editorial looks, Jessica creates stunning makeup artistry for any occasion with precision and creativity.",
      image: "/images/team/jessica-williams.jpg",
      rating: 4.9,
      specialties: [
        "Bridal Makeup",
        "Special Events",
        "Photography",
        "Airbrush",
      ],
      certifications: ["MAC Pro Certification", "Temptu Airbrush Specialist"],
      experience: "10+ years",
    },
    {
      id: 4,
      name: "David Rodriguez",
      title: "Men's Grooming Specialist",
      bio: "Expert in modern men's cuts and traditional barbering techniques, David delivers precision and style for the modern gentleman.",
      image: "/images/team/david-rodriguez.jpg",
      rating: 4.8,
      specialties: [
        "Men's Cuts",
        "Beard Styling",
        "Razor Cuts",
        "Classic Barbering",
      ],
      certifications: ["Master Barber License", "American Crew Educator"],
      experience: "11+ years",
    },
    {
      id: 5,
      name: "Emily Foster",
      title: "Nail Technology Lead",
      bio: "Creating beautiful nail art and providing exceptional nail care services with attention to detail and latest trends.",
      image: "/images/team/emily-foster.jpg",
      rating: 4.7,
      specialties: ["Nail Art", "Gel Extensions", "Manicures", "Pedicures"],
      certifications: ["CND Master Technician", "OPI Nail Art Specialist"],
      experience: "8+ years",
    },
    {
      id: 6,
      name: "Amanda Thompson",
      title: "Skincare Specialist",
      bio: "Providing personalized facial treatments and skincare consultations to help clients achieve their best skin.",
      image: "/images/team/amanda-thompson.jpg",
      rating: 4.8,
      specialties: [
        "Facial Treatments",
        "Skin Analysis",
        "Anti-Aging",
        "Acne Treatment",
      ],
      certifications: ["Dermalogica Expert", "HydraFacial Certified"],
      experience: "9+ years",
    },
    {
      id: 7,
      name: "Ryan Park",
      title: "Hair Stylist",
      bio: "Passionate about creating personalized looks that enhance each client's unique style and personality.",
      image: "/images/team/ryan-park.jpg",
      rating: 4.6,
      specialties: ["Hair Styling", "Blow Outs", "Updos", "Event Styling"],
      certifications: [
        "Paul Mitchell Advanced Cutting",
        "Moroccanoil Certified",
      ],
      experience: "6+ years",
    },
    {
      id: 8,
      name: "Lisa Chang",
      title: "Junior Stylist",
      bio: "Fresh talent with a passion for learning and creating beautiful transformations under expert mentorship.",
      image: "/images/team/lisa-chang.jpg",
      rating: 4.5,
      specialties: [
        "Hair Cutting",
        "Styling",
        "Color Assistance",
        "Consultations",
      ],
      certifications: ["Cosmetology License", "Redken Color Basics"],
      experience: "2+ years",
    },
  ];

  return (
    <Layout>
      <section className={styles.teamPage}>
        <div className="container">
          {/* Hero Section */}
          <div className={styles.hero}>
            <h1 className={styles.pageTitle}>Meet Our Expert Team</h1>
            <p className={styles.pageSubtitle}>
              Talented professionals dedicated to making you look and feel your
              best
            </p>
          </div>

          {/* Team Grid */}
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <div key={member.id} className={`card ${styles.memberCard}`}>
                <div className={styles.memberImage}>
                  <img src={member.image} alt={member.name} />
                  <div className={styles.memberOverlay}>
                    <div className={styles.memberRating}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(member.rating)
                                ? styles.starFilled
                                : styles.star
                            }
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className={styles.ratingText}>{member.rating}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.memberContent}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberTitle}>{member.title}</p>
                  <p className={styles.memberBio}>{member.bio}</p>

                  <div className={styles.memberDetails}>
                    <div className={styles.experience}>
                      <strong>Experience:</strong> {member.experience}
                    </div>

                    <div className={styles.specialties}>
                      <strong>Specialties:</strong>
                      <div className={styles.specialtyTags}>
                        {member.specialties.map((specialty, index) => (
                          <span key={index} className={styles.specialtyTag}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={styles.certifications}>
                      <strong>Certifications:</strong>
                      <ul>
                        {member.certifications.map((cert, index) => (
                          <li key={index}>{cert}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button className="btn btn-primary btn-sm">
                    Book with {member.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection} style={{ marginBottom: "150px" }}>
            <h2 className={styles.ctaTitle}>Ready to Work with Our Team?</h2>
            <p className={styles.ctaDescription}>
              Book your appointment today and experience the expertise of our
              talented professionals
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
