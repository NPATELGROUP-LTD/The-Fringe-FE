import Layout from "../../components/layout/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <section className="section" style={{ paddingTop: "120px" }}>
        <div className="container">
          <h1 className="text-4xl font-bold text-primary mb-8">
            About The Fringe
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Our Story
              </h2>
              <p className="text-lg text-secondary mb-4">
                Founded in 2010, The Fringe has grown from a small neighborhood
                salon into a premier beauty destination and educational
                institution. Our passion for excellence and innovation drives
                everything we do.
              </p>
              <p className="text-lg text-secondary mb-4">
                We believe that beauty is an art form, and everyone deserves to
                feel confident and beautiful. Whether you're looking for a new
                style or starting your career in beauty, we're here to help you
                achieve your goals.
              </p>

              <h3 className="text-xl font-semibold text-primary mb-3">
                Our Mission
              </h3>
              <p className="text-secondary mb-6">
                To provide exceptional beauty services while fostering the next
                generation of beauty professionals through comprehensive
                education and hands-on training.
              </p>

              <div style={{ display: "flex", gap: "2rem" }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-tertiary">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-tertiary">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-tertiary">Expert Stylists</div>
                </div>
              </div>
            </div>

            <div>
              <img
                src="/images/about-salon.jpg"
                alt="The Fringe Salon Interior"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "1rem",
                  border: "1px solid #333333",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
