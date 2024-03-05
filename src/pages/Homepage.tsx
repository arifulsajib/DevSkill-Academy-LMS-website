import HomeBanner from "../components/Home/HomeBanner";
import HomeCourses from "../components/Home/HomeCourses";
import HomeFeatures from "../components/Home/HomeFeatures";

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
