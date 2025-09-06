import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaMusic } from 'react-icons/fa';
import Button from '../common/Button';
import SplitScreenSlideshow from '../common/SplitScreenSlideshow';

interface HeroSectionProps {
  onJoinClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = memo(({ onJoinClick }) => {
  // Staff photos for slideshow
  const staffPhotos = [
    { src: '/images/staff/achraf.jpg', alt: 'Achraf - JAMHOUSE Staff' },
    { src: '/images/staff/Faris.jpg', alt: 'Faris - JAMHOUSE Staff' },
    { src: '/images/staff/hamza.jpg', alt: 'Hamza - JAMHOUSE Staff' },
    { src: '/images/staff/hiba.jpg', alt: 'Hiba - JAMHOUSE Staff' },
    { src: '/images/staff/Minnie.jpg', alt: 'Minnie - JAMHOUSE Staff' },
    { src: '/images/staff/Nour.JPG', alt: 'Nour - JAMHOUSE Staff' },
    { src: '/images/staff/salma.jpg', alt: 'Salma - JAMHOUSE Staff' },
    { src: '/images/staff/Youffes.jpg', alt: 'Youffes - JAMHOUSE Staff' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <SplitScreenSlideshow 
          images={staffPhotos} 
          interval={5000}
          className="w-full h-full"
        />
      </div>
      
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/70 via-dark-secondary/60 to-dark-bg/80" />
      
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