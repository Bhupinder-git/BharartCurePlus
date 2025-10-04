import React from "react";
import Footer from "../components/Footer";
import PatientStories from "../components/PatientStories";
import Faq from "../components/Faq";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import FloatingChatbot from "../components/FloatingChatbot";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <PatientStories />
      <Faq />
      <Footer />
      <FloatingChatbot />
    </div>
  );
};

export default Home;
