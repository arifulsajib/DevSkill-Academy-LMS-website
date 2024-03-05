import HomeBanner from "../components/Home/HomeBanner";
import HomeCourses from "../components/Home/HomeCourses";
import HomeFaq from "../components/Home/HomeFaq";
import HomeFeatures from "../components/Home/HomeFeatures";

const Homepage = () => {
  return (
    <section className="mt-20 px-4 md:px-6 min-h-screen">
      <HomeBanner />
      <HomeFeatures />
      <HomeCourses />
      <HomeFaq />
    </section>
  );
};

export default Homepage;
