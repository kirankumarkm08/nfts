import React from "react";
import Hero from "@/components/Hero";
import { AboutSection } from "@/components/About-section";
import { FeaturesSection } from "@/components/Feature-section";
const page = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <FeaturesSection />
    </div>
  );
};

export default page;
