import HomeBanner from "../components/homepage/HomeBanner";
import HomeFeatures from "../components/homepage/HomeFeatures";

const Homepage = () => {
  return (
    <section className="mt-20 px-4 md:px-6 min-h-screen">
      <HomeBanner />
      <HomeFeatures />
    </section>
  );
};

export default Homepage;
