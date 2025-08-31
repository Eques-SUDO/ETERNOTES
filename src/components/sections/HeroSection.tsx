import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaMusic } from 'react-icons/fa';
import Button from '../common/Button';

interface HeroSectionProps {
  onJoinClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = memo(({ onJoinClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-secondary to-dark-bg" />
      
      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <FaMusic className="text-nova-neon text-2xl" />
            <span className="text-nova-neon font-medium text-lg">ETERNOTES MUSIC CLUB</span>
            <FaMusic className="text-nova-neon text-2xl" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-gradient mb-8 leading-tight">
            Where Music
            <br />
            <span className="nova-text-glow">Comes Alive</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-text max-w-4xl mx-auto mb-12 leading-relaxed">
            Join our vibrant community of musicians, creators, and music lovers. 
            Experience the magic of collaborative music-making in an inspiring environment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="large" onClick={onJoinClick}>
              <FaMusic className="mr-3" />
              Join the Club
            </Button>
            
            <Button variant="outline" size="large">
              Explore Events
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;