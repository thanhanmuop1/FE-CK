import React from 'react';
import styles from './LandingPage.less';
import HeroSection from './components/HeroSection';
import TrustedBySection from './components/TrustedBySection';
import FeaturesSection from './components/FeaturesSection';
import ProcessSection from './components/ProcessSection';
import UniversitiesSection from './components/UniversitiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';


const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingContainer}>
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <ProcessSection />
      <UniversitiesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage; 