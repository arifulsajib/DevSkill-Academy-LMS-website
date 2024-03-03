import HomeBanner from "../components/homepage/HomeBanner";
import HomeCourses from "../components/homepage/HomeCourses";
import HomeFeatures from "../components/homepage/HomeFeatures";

const Homepage = () => {
  return (
    <section className="mt-20 px-4 md:px-6 min-h-screen">
      <HomeBanner />
      <HomeFeatures />
      <HomeCourses />
    </section>
  );
};

export default Homepage;
