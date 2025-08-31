import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FaCalendarAlt, FaMusic, FaTicketAlt, FaStar, FaChevronLeft, FaChevronRight, FaUsers } from 'react-icons/fa';
import Button from '../components/common/Button';

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -60 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 100 }
};

// Floating animation for musical notes
const floatAnimation = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [-20, -40, -20],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StaffMember {
  id: number;
  name: string;
  role: string;
  major: string;
  image: string;
  description: string;
}

// Enhanced Feature Card with Framer Motion
const FeatureCard = React.memo(({ feature, index }: { feature: Feature; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="group relative bg-gradient-to-br from-dark-surface/90 to-dark-card/90 backdrop-blur-xl border border-primary/10 rounded-3xl p-8 md:p-10 text-center transition-all duration-500 hover:shadow-2xl hover:border-primary/30 overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 rounded-3xl"
        animate={{
          background: isHovered 
            ? "linear-gradient(135deg, rgba(139,93,255,0.08) 0%, rgba(168,85,247,0.05) 50%, rgba(139,93,255,0.08) 100%)"
            : "linear-gradient(135deg, rgba(139,93,255,0) 0%, rgba(168,85,247,0) 50%, rgba(139,93,255,0) 100%)"
        }}
        transition={{ duration: 0.7 }}
      />
      
      {/* Glow effect */}
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent-purple/20 to-primary/20 rounded-3xl blur-xl"
        animate={{
          opacity: isHovered ? 0.5 : 0
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Modern icon container */}
      <motion.div className="relative mb-6 z-10">
        <motion.div 
          className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent-purple/20 rounded-2xl flex items-center justify-center"
          animate={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(139,93,255,0.3) 0%, rgba(168,85,247,0.3) 100%)"
              : "linear-gradient(135deg, rgba(139,93,255,0.2) 0%, rgba(168,85,247,0.2) 100%)",
            rotate: isHovered ? 6 : 0,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="text-3xl md:text-4xl text-primary"
            animate={{
              scale: isHovered ? 1.1 : 1,
              color: isHovered ? "#A855F7" : "#8B5DFF"
            }}
            transition={{ duration: 0.3 }}
          >
            {feature.icon}
          </motion.div>
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-primary to-accent-purple rounded-full"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.5
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-accent-purple to-primary rounded-full"
          animate={{
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? [0.5, 1, 0.5] : 0.5
          }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        />
      </motion.div>
      
      <motion.h3 
        className="text-xl md:text-2xl font-bold font-heading mb-4 text-text-primary relative z-10"
        animate={{
          color: isHovered ? "transparent" : "#F9FAFB"
        }}
        style={{
          backgroundImage: isHovered ? "linear-gradient(135deg, #8B5DFF 0%, #A855F7 100%)" : "none",
          backgroundClip: isHovered ? "text" : "unset",
          WebkitBackgroundClip: isHovered ? "text" : "unset"
        }}
      >
        {feature.title}
      </motion.h3>
      
      <motion.p 
        className="text-text-secondary leading-relaxed text-sm md:text-base relative z-10"
        animate={{
          color: isHovered ? "#D1D5DB" : "#9CA3AF"
        }}
        transition={{ duration: 0.3 }}
      >
        {feature.description}
      </motion.p>
      
      {/* Bottom accent line */}
      <motion.div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-primary via-accent-purple to-primary rounded-full"
        animate={{
          width: isHovered ? "100%" : "0%",
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      />
    </motion.div>
  );
});

// Enhanced Staff Card with 3D tilt effect
const StaffCard = React.memo(({ member, index }: { member: StaffMember; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="group text-center p-8 transition-all duration-300 relative overflow-hidden modern-card hover:shadow-2xl"
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 80
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 50 }}
    >
      {/* Gradient overlay that moves with hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-nova-neon/0 to-transparent"
        animate={{
          opacity: x.get() !== 0 ? 0.1 : 0
        }}
      />
      
      <motion.div className="relative mb-6">
        <motion.div 
          className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-4 relative bg-gray-800 ring-4 ring-primary/20"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 0 30px rgba(232,145,255,0.4)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {!imageLoaded && !imageError && (
            <motion.div 
              className="absolute inset-0 bg-gray-800"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          {!imageError ? (
            <motion.img 
              src={member.image} 
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ scale: 1.2, filter: "blur(10px)" }}
              animate={{ 
                scale: imageLoaded ? 1 : 1.2,
                filter: imageLoaded ? "blur(0px)" : "blur(10px)"
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <FaMusic className="text-3xl text-gray-600" />
            </div>
          )}
        </motion.div>
      </motion.div>
      
      <motion.h3 
        className="text-xl font-bold font-heading mb-2 text-accent"
        style={{ transform: "translateZ(20px)" }}
      >
        {member.name}
      </motion.h3>
      
      <motion.p 
        className="text-nova-neon/80 font-medium text-sm mb-3 uppercase tracking-wider"
        style={{ transform: "translateZ(15px)" }}
      >
        {member.role}
      </motion.p>
      
      {member.major && (
        <motion.p 
          className="text-gray-text text-sm mb-3 italic"
          style={{ transform: "translateZ(10px)" }}
        >
          {member.major}
        </motion.p>
      )}
      
      <motion.p 
        className="text-gray-text leading-relaxed text-sm"
        style={{ transform: "translateZ(5px)" }}
      >
        {member.description}
      </motion.p>
    </motion.div>
  );
});

const HomeEnhanced: React.FC = () => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  
  // Mouse position for interactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX - innerWidth / 2) / 20);
    mouseY.set((clientY - innerHeight / 2) / 20);
  };
  
  // Memoized data
  const features = useMemo<Feature[]>(() => [
    {
      icon: <FaMusic className="w-full h-full" />,
      title: "Weekly Jam Sessions",
      description: "Join us every Sunday for collaborative music sessions - all skill levels welcome!"
    },
    {
      icon: <FaCalendarAlt className="w-full h-full" />,
      title: "Music Theory Classes",
      description: "Learn fundamentals, composition, and advanced theory with our experienced student instructors"
    },
    {
      icon: <FaTicketAlt className="w-full h-full" />,
      title: "Practice Room Access",
      description: "Book practice rooms and borrow club instruments for your musical development"
    },
    {
      icon: <FaStar className="w-full h-full" />,
      title: "Campus Events",
      description: "Perform at university showcases, open mic nights, and seasonal music festivals"
    }
  ], []);

  const staffMembers = useMemo<StaffMember[]>(() => [
    {
      id: 1,
      name: "Achraf ElOuazzani",
      role: "President",
      major: "",
      image: "/images/staff/achraf.jpg",
      description: "Singer/Records, Masters Songs"
    },
    {
      id: 2,
      name: "Manal Ahmina (Minnie)",
      role: "Vice President",
      major: "",
      image: "/images/staff/Minnie.jpg",
      description: "Content Creator, Singer, Song Writer"
    },
    {
      id: 3,
      name: "Hiba ELKhourani",
      role: "Human Resources",
      major: "",
      image: "/images/staff/hiba.jpg",
      description: "Singer"
    },
    {
      id: 4,
      name: "Salma Hajjaji",
      role: "VP of Administration",
      major: "",
      image: "/images/staff/salma.jpg",
      description: "Singer"
    },
    {
      id: 5,
      name: "Faris Moughamir",
      role: "Artistic Director",
      major: "",
      image: "/images/staff/Faris.jpg",
      description: "DJ and Producer"
    },
    {
      id: 6,
      name: "Nour Naim",
      role: "Artistic Director",
      major: "",
      image: "/images/staff/Nour.JPG",
      description: "Singer"
    },
    {
      id: 7,
      name: "Hamza Naim",
      role: "Vocal Coach/Music Theory Tutor",
      major: "",
      image: "/images/staff/hamza.jpg",
      description: "Singer"
    }
  ], []);

  const scrollToNextSection = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  return (
    <motion.div onMouseMove={handleMouseMove}>
      {/* Enhanced Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
        {/* Parallax Background Image */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            filter: 'brightness(0.8) contrast(1.1) saturate(1.2)',
            y: heroY
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/70 via-dark-bg/60 to-dark-secondary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-dark-bg/40" />
        
        {/* Interactive Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Interactive gradient blobs that follow mouse */}
          <motion.div 
            className="absolute w-96 h-96 -top-48 -left-48 bg-nova-neon/15 rounded-full blur-3xl"
            animate={{
              x: smoothMouseX,
              y: smoothMouseY,
            }}
          />
          <motion.div 
            className="absolute w-96 h-96 -bottom-48 -right-48 bg-primary/15 rounded-full blur-3xl"
            animate={{
              x: smoothMouseX,
              y: smoothMouseY,
            }}
          />
          
          {/* Animated Musical Notes with Framer Motion */}
          <motion.div 
            className="absolute top-20 left-10 text-nova-neon/20 text-2xl"
            variants={floatAnimation}
            initial="initial"
            animate="animate"
          >
            ♪
          </motion.div>
          <motion.div 
            className="absolute top-32 right-16 text-primary/20 text-xl"
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
          >
            ♫
          </motion.div>
          <motion.div 
            className="absolute bottom-40 left-20 text-nova-neon/15 text-3xl"
            variants={floatAnimation}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
          >
            ♬
          </motion.div>
          
          {/* Animated Stars with stagger effect */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-nova-neon/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        
        {/* Main Hero Content with Scale and Fade */}
        <motion.div 
          className="relative z-10 text-center max-w-6xl px-8"
          style={{
            opacity: heroOpacity,
            scale: heroScale,
          }}
        >
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Badge */}
            <motion.div 
              className="flex items-center justify-center gap-2 mb-8 opacity-80"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              <motion.div 
                className="h-px w-12 bg-gradient-to-r from-transparent to-nova-neon"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              <FaMusic className="text-nova-neon text-lg" />
              <span className="text-nova-neon/80 text-sm font-medium tracking-widest uppercase">ETERNOTES Music Club</span>
              <FaMusic className="text-nova-neon text-lg" />
              <motion.div 
                className="h-px w-12 bg-gradient-to-l from-transparent to-nova-neon"
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </motion.div>
            
            {/* Animated Title with Letter Stagger */}
            <div className="relative">
              <motion.h1 
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-display mb-6 md:mb-8 leading-tight"
                initial="initial"
                animate="animate"
                variants={staggerContainer}
              >
                <motion.span 
                  className="block text-gradient bg-clip-text text-transparent"
                  variants={fadeInUp}
                >
                  WHERE
                </motion.span>
                <motion.span 
                  className="block text-white text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] my-2 md:my-4 relative"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  MUSIC
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 text-white opacity-20 blur-sm -z-10"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    MUSIC
                  </motion.div>
                </motion.span>
                <motion.span 
                  className="block text-gradient bg-clip-text text-transparent"
                  variants={fadeInUp}
                >
                  COMES ALIVE
                </motion.span>
              </motion.h1>
            </div>
          </motion.div>
          
          {/* Animated Description */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-text mb-12 md:mb-16 font-light leading-relaxed max-w-4xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join the <span className="text-nova-neon font-medium">musical community</span> at your university with the most vibrant <span className="text-white font-semibold">music club</span> on campus
          </motion.p>
          
          {/* Animated CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4 mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/events" className="group w-full sm:w-auto">
                <Button size="large" className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5 shadow-lg hover:shadow-nova-neon/30 w-full sm:w-auto">
                  <FaCalendarAlt className="text-lg md:text-xl mr-2 md:mr-3" />
                  Join Activities
                </Button>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="group w-full sm:w-auto">
                <Button variant="outline" size="large" className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5 w-full sm:w-auto">
                  <FaUsers className="text-lg md:text-xl mr-2 md:mr-3" />
                  Become a Member
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          onClick={scrollToNextSection}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className="flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs font-medium uppercase tracking-widest text-nova-neon/70 mb-3">
              Explore More
            </span>
            <div className="w-6 h-10 border-2 border-nova-neon/40 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-3 bg-nova-neon/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with Scroll Animations */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-dark-secondary/80 via-dark-bg to-dark-bg">
        <div className="container-custom relative">
          <motion.div 
            className="text-center mb-12 md:mb-20 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.div 
                className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
              />
              <span className="text-nova-neon/60 text-xs md:text-sm uppercase tracking-widest">Our Services</span>
              <motion.div 
                className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
              />
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <span className="text-gradient bg-clip-text text-transparent">What We Offer</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-text max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              From beginner-friendly sessions to advanced workshops - grow your musical skills with fellow students
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section with Reveal Animation */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-dark-bg via-dark-secondary/30 to-dark-secondary/60">
        <div className="container-custom relative z-10">
          <motion.div 
            className="text-center mb-12 md:mb-16 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 md:mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <span className="text-gradient bg-clip-text text-transparent">About Us</span>
            </motion.h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="modern-card p-8 md:p-12 lg:p-16 text-center relative overflow-hidden group"
              initial={{ opacity: 0, rotateX: -15 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.p className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-light relative z-10">
                <motion.span 
                  className="font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  ETERNOTES
                </motion.span>
                <span className="italic opacity-90"> Music Club </span>
                is a vibrant community based in the Faculty of Sciences Rabat, bringing together passionate musicians and music enthusiasts who want to showcase their talent and share their love for music...
              </motion.p>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-2xl md:text-3xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-nova-neon via-white to-primary">
                  Music, what unites us!
                </p>
                <motion.div 
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-nova-neon to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 128 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Staff Section with 3D Cards */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-dark-secondary/80 to-dark-secondary">
        <div className="container-custom relative">
          <motion.div 
            className="text-center mb-12 md:mb-20 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80 }}
            >
              <span className="text-gradient bg-clip-text text-transparent">Meet Our Team</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-text max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The passionate staff who make ETERNOTES Music Club the amazing community it is
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
            {staffMembers.map((member, index) => (
              <StaffCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomeEnhanced;