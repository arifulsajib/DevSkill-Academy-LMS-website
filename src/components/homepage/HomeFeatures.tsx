import SectionHeading from "../common/SectionHeading";
import SingleFeature from "./SingleFeature";
import featureImg1 from "../../assets/features/feature-01.webp";
import featureImg2 from "../../assets/features/feature-02.webp";
import featureImg3 from "../../assets/features/feature-03.webp";
import featureImg4 from "../../assets/features/feature-04.webp";
import featureImg5 from "../../assets/features/feature-05.webp";

const HomeFeatures = () => {
  return (
    <section className="my-8 px-5 lg:px-28">
      <SectionHeading sectionTitle="FEATURES" title="Why DevSkill Academy?" />
      {/* feature 1 */}
      <SingleFeature
        icon="fa-solid fa-clock"
        iconColor="warning"
        title="Fast-track your learning"
        subTitle="No fluff, just the good stuff!"
        description="I don't want to waste your time with boring stuff you don't need. So I've made sure my courses are clear, concise, to the point, and free of technical jargon. No rambling or repetition, just the essentials you need to succeed, explained in plain English."
        image={featureImg1}
      />
      <SingleFeature
        icon="fa-brands fa-youtube"
        iconColor="success"
        title="Step-by-step lessons"
        subTitle="Easy-to-follow lessons"
        description="I know learning to code can be tough. So I've carefully organized my courses into simple, bite-sized pieces to help you progress smoothly, one step at a time. I'll guide you through each step of the way so you won't feel overwhelmed."
        image={featureImg2}
        inverted
      />
      <SingleFeature
        icon="fa-solid fa-wrench"
        iconColor="warning"
        title="Perfect mix of theory and practice"
        subTitle="Hands-on learning"
        description="I believe the best way to learn is by actually doing. That's why my courses teach you the essential theory and provide practical exercises. You'll be able to practice everything you learn and apply it to real-life situations."
        image={featureImg3}
      />
      <SingleFeature
        icon="fa-solid fa-globe"
        iconColor="success"
        title="Get ready for the job"
        subTitle="Real-world projects"
        description="My courses are designed to prepare you for real-world jobs and interviews. With in-depth, comprehensive courses packed with real-world examples and exercises, you'll be ready to take on any challenge that comes your way."
        image={featureImg4}
        inverted
      />
      <SingleFeature
        icon="fa-solid fa-users"
        iconColor="warning"
        title="From beginner to pro"
        subTitle="Courses for everyone"
        description="Whether you're looking to learn a new language or just brushing up on your skills, I've got you covered. I offer a wide variety of courses so you can pick and choose what's most relevant to you. Plus, I make sure my courses are fun and engaging so you won't get bored."
        image={featureImg5}
      />
    </section>
  );
};

export default HomeFeatures;
