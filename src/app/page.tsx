import Layout from "../components/layout/Layout";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import About from "../components/sections/About";
import Reviews from "../components/sections/Reviews";
import Newsletter from "../components/sections/Newsletter";
import TextLoop from "../components/ui/textLoop/textLoop";

export default function HomePage() {
  return (
    <Layout>
      <Hero />
      <Services />
      <TextLoop />
      <About />
      <Reviews />
      <Newsletter />
    </Layout>
  );
}
