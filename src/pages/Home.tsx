import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMusic, FaTicketAlt, FaStar, FaChevronLeft, FaChevronRight, FaUsers, FaInstagram } from 'react-icons/fa';
import Button from '../components/common/Button';
import EternotesSymbols from '../components/common/EternotesSymbols';

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
  artistName?: string;
  colorScheme?: {
    primary: string;
    secondary: string;
    glow: string;
    gradient: string;
  };
}

// Memoized components
const FeatureCard = React.memo(({ feature, index }: { feature: Feature; index: number }) => (
  <div
    className="group relative bg-gradient-to-br from-dark-surface to-dark-card backdrop-blur-sm border border-primary/10 rounded-2xl p-8 md:p-10 text-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] opacity-0 animate-fadeIn hover:border-primary/30 overflow-hidden"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent-purple/0 to-primary/0 group-hover:from-primary/5 group-hover:via-accent-purple/3 group-hover:to-primary/5 transition-all duration-700 rounded-2xl" />
    
    {/* Glow effect */}
    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent-purple/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
    
    {/* Icon container with modern styling */}
    <div className="relative mb-6">
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-primary/20 to-accent-purple/20 rounded-2xl flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent-purple/30 transition-all duration-300 group-hover:rotate-3 group-hover:scale-105">
        <div className="text-3xl md:text-4xl text-primary group-hover:text-accent-purple transition-all duration-300">
          {feature.icon}
        </div>
      </div>
      {/* Floating particle effect */}
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary/50 rounded-full blur-sm animate-pulse" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent-purple/50 rounded-full blur-sm animate-pulse animation-delay-200" />
    </div>
    
    <h3 className="text-xl md:text-2xl font-bold font-heading mb-4 text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent-purple transition-all duration-300">
      {feature.title}
    </h3>
    
    <p className="text-text-secondary leading-relaxed text-sm md:text-base group-hover:text-text-primary transition-colors duration-300">
      {feature.description}
    </p>
    
    {/* Bottom accent line */}
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-accent-purple group-hover:w-full transition-all duration-500 rounded-full" />
  </div>
));

const StaffCard = React.memo(({ member, index }: { member: StaffMember; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Default color scheme if none provided
  const defaultColorScheme = {
    primary: "text-gradient-cosmic",
    secondary: "text-primary",
    glow: "shadow-[0_0_30px_rgba(139,93,255,0.6)]",
    gradient: "from-primary to-accent-purple"
  };
  
  const colors = member.colorScheme || defaultColorScheme;

  return (
    <div
      className={`group text-center transition-all duration-500 relative overflow-hidden bg-gradient-to-br from-dark-surface/90 to-dark-card/90 backdrop-blur-xl border border-primary/10 rounded-3xl p-6 md:p-8 hover:scale-[1.02] opacity-0 animate-fadeIn hover:border-primary/30 hover:${colors.glow}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Dynamic gradient overlay based on member's color scheme */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-all duration-700 rounded-3xl`} />
      
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
      
      <div className="relative mb-6 z-10">
        {/* Image container with member-specific styling */}
        <div className={`w-32 h-32 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden mb-4 relative bg-dark-elevated ring-4 ring-primary/20 group-hover:ring-4 transition-all duration-300 ${colors.glow} group-hover:scale-105`}>
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          {!imageError ? (
            <img 
              src={member.image} 
              alt={member.name}
              loading="lazy"
              className={`w-full h-full object-cover transition-all duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <FaMusic className="text-3xl text-gray-600" />
            </div>
          )}
          
          {/* Decorative ring effect */}
          <div className={`absolute -inset-2 rounded-full border-2 border-transparent bg-gradient-to-r ${colors.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-sm`} />
        </div>
        
        {/* Member name with unique color */}
        <h3 className={`text-xl md:text-2xl font-bold font-heading mb-2 ${colors.primary} transition-all duration-300`}>
          {member.name}
        </h3>
        
        {/* Artist name - prominently displayed */}
        {member.artistName && (
          <div className="mb-3">
            <div className="relative inline-block">
              <p className={`text-lg md:text-xl font-bold ${colors.primary} opacity-95 tracking-wide artist-name-glow px-3 py-1 rounded-lg transition-all duration-300 group-hover:scale-105`}>
                "{member.artistName}"
              </p>
              {/* Subtle background glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-10 group-hover:opacity-20 rounded-lg blur-sm transition-opacity duration-300`} />
            </div>
            <div className={`w-16 h-0.5 bg-gradient-to-r ${colors.gradient} mx-auto mt-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
            {/* Decorative dots */}
            <div className="flex justify-center gap-1 mt-1">
              <div className={`w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`} />
              <div className={`w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`w-1 h-1 bg-gradient-to-r ${colors.gradient} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`} />
            </div>
          </div>
        )}
        
        {/* Role with member-specific color */}
        <p className={`font-semibold text-sm md:text-base mb-3 uppercase tracking-wider ${colors.secondary} transition-colors duration-300`}>
          {member.role}
        </p>
        
        {member.major && (
          <p className="text-text-tertiary text-sm md:text-base mb-3 italic">
            {member.major}
          </p>
        )}
        
        {/* Description */}
        <p className="text-text-secondary leading-relaxed text-sm md:text-base group-hover:text-text-primary transition-colors duration-300">
          {member.description}
        </p>
      </div>
      
      {/* Bottom accent line with member's color */}
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${colors.gradient} group-hover:w-full transition-all duration-500 rounded-full`} />
      
      {/* Floating particles with member's color theme */}
      <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${colors.gradient} rounded-full opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-500`} />
      <div className={`absolute bottom-4 left-4 w-1.5 h-1.5 bg-gradient-to-br ${colors.gradient} rounded-full opacity-0 group-hover:opacity-40 animate-pulse transition-opacity duration-700`} style={{ animationDelay: '0.5s' }} />
    </div>
  );
});

const Home: React.FC = () => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  
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
      description: "Singer/Records, Masters Songs",
      colorScheme: {
        primary: "text-gradient-aurora",
        secondary: "text-glow-cyan",
        glow: "shadow-[0_0_30px_rgba(34,211,238,0.6)]",
        gradient: "from-cyan-400 to-blue-500"
      }
    },
    {
      id: 2,
      name: "Manal Ahmina",
      role: "Vice President",
      major: "",
      image: "/images/staff/Minnie.jpg",
      description: "Content Creator, Singer, Song Writer",
      artistName: "Minnie",
      colorScheme: {
        primary: "text-gradient-purple-pink",
        secondary: "text-pink-400",
        glow: "shadow-[0_0_30px_rgba(244,114,182,0.6)]",
        gradient: "from-pink-400 to-purple-500"
      }
    },
    {
      id: 3,
      name: "Hiba ELKhourani",
      role: "Human Resources",
      major: "",
      image: "/images/staff/hiba.jpg",
      description: "Singer",
      colorScheme: {
        primary: "text-gradient-cosmic",
        secondary: "text-indigo-400",
        glow: "shadow-[0_0_30px_rgba(99,102,241,0.6)]",
        gradient: "from-indigo-400 to-cyan-500"
      }
    },
    {
      id: 4,
      name: "Salma Hajjaji",
      role: "VP of Administration",
      major: "",
      image: "/images/staff/salma.jpg",
      description: "Singer",
      colorScheme: {
        primary: "text-gradient-neon",
        secondary: "text-violet-400",
        glow: "shadow-[0_0_30px_rgba(139,92,246,0.6)]",
        gradient: "from-violet-400 to-purple-600"
      }
    },
    {
      id: 5,
      name: "Faris Moughamir",
      role: "Artistic Director",
      major: "",
      image: "/images/staff/Faris.jpg",
      description: "DJ and Producer",
      artistName: "Eques",
      colorScheme: {
        primary: "text-gradient-cosmic",
        secondary: "text-glow-purple",
        glow: "shadow-[0_0_30px_rgba(168,85,247,0.6)]",
        gradient: "from-purple-500 to-pink-500"
      }
    },
    {
      id: 6,
      name: "Nour Naim",
      role: "Artistic Director",
      major: "",
      image: "/images/staff/Nour.JPG",
      description: "Singer",
      colorScheme: {
        primary: "text-gradient-blue-cyan",
        secondary: "text-blue-400",
        glow: "shadow-[0_0_30px_rgba(59,130,246,0.6)]",
        gradient: "from-blue-400 to-indigo-500"
      }
    },
    {
      id: 7,
      name: "Hamza Naim",
      role: "Vocal Coach/Music Theory Tutor",
      major: "",
      image: "/images/staff/hamza.jpg",
      description: "Singer",
      colorScheme: {
        primary: "text-gradient-emerald-cyan",
        secondary: "text-green-400",
        glow: "shadow-[0_0_30px_rgba(16,185,129,0.6)]",
        gradient: "from-emerald-400 to-teal-500"
      }
    }
  ], []);

  // Callbacks
  const scrollToNextSection = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  const handleJoinClick = useCallback(() => {
    window.location.href = '/contact';
  }, []);

  return (
    <>
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-0">
        {/* Main dark background with subtle ETERNOTES colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />
        
        {/* ETERNOTES color layers */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-pink-500/8" />
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/8 via-transparent to-cyan-500/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent" />
        
        {/* Radial gradients for depth */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255, 69, 216, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 40% 80%, rgba(153, 69, 255, 0.10) 0%, transparent 40%)
          `
        }} />
        
        {/* ETERNOTES Infinity Symbols */}
        <EternotesSymbols density="minimal" />
        
        {/* Clean background for musical notes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          
          {/* Mobile-Optimized Floating Musical Notes */}
          <div className="hidden sm:block absolute top-20 left-10 text-primary/30 text-2xl animate-bounce" style={{ 
            animationDelay: '1s', 
            animationDuration: '3s',
            filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.4))'
          }}>♪</div>
          <div className="absolute top-24 right-6 sm:top-32 sm:right-16 text-accent/25 text-lg sm:text-xl animate-bounce" style={{ 
            animationDelay: '2s', 
            animationDuration: '4s',
            filter: 'drop-shadow(0 0 6px rgba(255, 69, 216, 0.4))'
          }}>♫</div>
          <div className="absolute bottom-32 left-6 sm:bottom-40 sm:left-20 text-secondary/20 text-xl sm:text-3xl animate-bounce" style={{ 
            animationDelay: '0.5s', 
            animationDuration: '5s',
            filter: 'drop-shadow(0 0 10px rgba(153, 69, 255, 0.3))'
          }}>♬</div>
          <div className="hidden sm:block absolute bottom-64 right-24 text-primary/20 text-lg animate-bounce" style={{ 
            animationDelay: '3s', 
            animationDuration: '3.5s',
            filter: 'drop-shadow(0 0 5px rgba(155, 77, 224, 0.3))'
          }}>♩</div>
          <div className="hidden md:block absolute top-1/3 left-1/4 text-nova-neon/15 text-4xl animate-bounce" style={{ 
            animationDelay: '1.5s', 
            animationDuration: '6s',
            filter: 'drop-shadow(0 0 12px rgba(168, 85, 247, 0.2))'
          }}>♭</div>
          <div className="hidden md:block absolute top-2/3 right-1/3 text-primary/15 text-2xl animate-bounce" style={{ 
            animationDelay: '2.5s', 
            animationDuration: '4.5s',
            filter: 'drop-shadow(0 0 7px rgba(155, 77, 224, 0.2))'
          }}>♯</div>
          
          {/* Subtle Stars */}
          <div className="absolute top-16 right-1/4 w-1 h-1 bg-nova-neon/40 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
          <div className="absolute top-24 right-1/3 w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-nova-neon/50 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '2.5s' }}></div>
          <div className="absolute bottom-48 right-1/4 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
          <div className="absolute top-1/2 left-16 w-1 h-1 bg-nova-neon/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute top-1/2 right-20 w-1 h-1 bg-primary/35 rounded-full animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '2.8s' }}></div>
          
          {/* Geometric Lines */}
          <div className="absolute top-1/4 left-0 w-24 h-px bg-gradient-to-r from-transparent via-nova-neon/20 to-transparent opacity-50" style={{ transform: 'rotate(45deg)' }}></div>
          <div className="absolute bottom-1/4 right-0 w-32 h-px bg-gradient-to-l from-transparent via-primary/20 to-transparent opacity-40" style={{ transform: 'rotate(-30deg)' }}></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-px bg-gradient-to-r from-transparent via-nova-neon/15 to-transparent opacity-60" style={{ transform: 'rotate(60deg)' }}></div>
          
          {/* Additional subtle overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark-bg/30 to-dark-bg/60" />
        </div>
        
        <div className="relative z-10 text-center max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8 opacity-80">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-nova-neon" />
              <FaMusic className="text-nova-neon text-sm sm:text-lg" />
              <span className="text-nova-neon/80 text-xs sm:text-sm font-medium tracking-widest uppercase">ETERNOTES Music Club</span>
              <FaMusic className="text-nova-neon text-sm sm:text-lg" />
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-nova-neon" />
            </div>
            
            <div className="relative">
              {/* Decorative elements around the title */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-nova-neon/30 opacity-0 animate-fadeIn" style={{ animationDelay: '800ms' }}></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-primary/30 opacity-0 animate-fadeIn" style={{ animationDelay: '900ms' }}></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-primary/30 opacity-0 animate-fadeIn" style={{ animationDelay: '1000ms' }}></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-nova-neon/30 opacity-0 animate-fadeIn" style={{ animationDelay: '1100ms' }}></div>
              
              {/* Floating musical notes near title */}
              <div className="absolute -top-8 left-1/4 text-nova-neon/40 text-sm animate-bounce opacity-0 animate-fadeIn" style={{ animationDelay: '1200ms', animationDuration: '4s' }}>♪</div>
              <div className="absolute -top-6 right-1/4 text-primary/40 text-xs animate-bounce opacity-0 animate-fadeIn" style={{ animationDelay: '1300ms', animationDuration: '3s' }}>♫</div>
              <div className="absolute -bottom-8 left-1/3 text-nova-neon/30 text-sm animate-bounce opacity-0 animate-fadeIn" style={{ animationDelay: '1400ms', animationDuration: '5s' }}>♬</div>
              <div className="absolute -bottom-6 right-1/3 text-primary/30 text-xs animate-bounce opacity-0 animate-fadeIn" style={{ animationDelay: '1500ms', animationDuration: '3.5s' }}>♩</div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-display mb-8 md:mb-12 leading-tight opacity-0 animate-fadeIn relative">
                <span className="block text-white mb-2">WHERE</span>
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] my-4 md:my-6 relative font-extrabold tracking-tight">
                  <span className="text-transparent bg-clip-text" style={{
                    backgroundImage: 'linear-gradient(135deg, #00D4FF 0%, #9945FF 50%, #FF45D8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    MUSIC
                  </span>
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 text-white opacity-20 blur-md -z-10">MUSIC</div>
                </span>
                <span className="block text-white mt-2">LIVES FOREVER</span>
              </h1>
            </div>
          </div>
          
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-12 md:mb-16 font-light leading-relaxed max-w-5xl mx-auto opacity-0 animate-fadeIn px-4" style={{ animationDelay: '300ms' }}>
            Join the <span className="font-semibold" style={{
              backgroundImage: 'linear-gradient(135deg, #00D4FF 0%, #9945FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>musical community</span> at your university with the most vibrant <span className="font-bold" style={{
              backgroundImage: 'linear-gradient(135deg, #9945FF 0%, #FF45D8 100%)',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>music club</span> on campus
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center opacity-0 animate-fadeIn px-4 mb-12 sm:mb-16 md:mb-20" style={{ animationDelay: '600ms' }}>
            <Link to="/events" className="w-full sm:w-auto">
              <button className="group relative bg-gradient-to-br from-dark-surface to-dark-card backdrop-blur-sm border border-primary/10 rounded-2xl px-8 md:px-12 py-4 md:py-5 text-white font-semibold transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] w-full sm:w-auto text-base md:text-lg hover:border-primary/30 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent-purple/0 to-primary/0 group-hover:from-primary/5 group-hover:via-accent-purple/3 group-hover:to-primary/5 transition-all duration-700 rounded-2xl" />
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent-purple/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="relative flex items-center justify-center gap-3">
                  <FaCalendarAlt className="text-primary group-hover:text-accent-purple transition-all duration-300" />
                  Join Activities
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-accent-purple group-hover:w-full transition-all duration-500 rounded-full" />
              </button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="group relative bg-gradient-to-br from-dark-surface to-dark-card backdrop-blur-sm border border-primary/10 rounded-2xl px-8 md:px-12 py-4 md:py-5 text-white font-semibold transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] w-full sm:w-auto text-base md:text-lg hover:border-primary/30 overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-accent-purple/0 to-primary/0 group-hover:from-primary/5 group-hover:via-accent-purple/3 group-hover:to-primary/5 transition-all duration-700 rounded-2xl" />
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent-purple/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="relative flex items-center justify-center gap-3">
                  <FaUsers className="text-primary group-hover:text-accent-purple transition-all duration-300" />
                  Become a Member
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-accent-purple group-hover:w-full transition-all duration-500 rounded-full" />
              </button>
            </Link>
          </div>
        </div>

      </section>

      {/* Features Section - Modern */}
      <section className="py-20 md:py-32 lg:py-40 relative overflow-hidden bg-gradient-to-b from-dark-surface via-dark-bg to-dark-surface">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-secondary/3 to-accent/3" />
        
        {/* Infinity Symbols - Services Section */}
        <EternotesSymbols density="light" />
        
        <div className="container-custom relative">
          <div className="text-center mb-12 md:mb-20 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50" />
              <span className="text-gradient-purple-pink text-xs md:text-sm uppercase tracking-widest font-semibold">Our Services</span>
              <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-6 md:mb-8">
              <span className="text-gradient-cosmic">What We Offer</span>
            </h2>
            <p className="text-xl md:text-2xl text-gradient-blue-cyan max-w-4xl mx-auto leading-relaxed px-4 font-medium">
              From beginner-friendly sessions to advanced workshops - grow your musical skills with fellow students
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-dark-bg via-dark-secondary/30 to-dark-secondary/60">
        <div className="absolute inset-0 bg-gradient-to-br from-nova-darkPurple/10 via-transparent to-primary/5" />
        
        {/* Infinity Symbols - About Section */}
        <EternotesSymbols density="minimal" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="h-px w-6 sm:w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50" />
              <span className="text-gradient-emerald-cyan text-xs md:text-sm uppercase tracking-widest font-semibold">Who We Are</span>
              <div className="h-px w-6 sm:w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 md:mb-8">
              <span className="text-gradient-neon">About Us</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="modern-card p-4 sm:p-6 md:p-8 lg:p-12 text-center relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-nova-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <p className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-light relative z-10">
                <span className="font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary">ETERNOTES</span>
                <span className="italic opacity-90"> Music Club </span>
                is a vibrant community based in the Faculty of Sciences Rabat, bringing together passionate musicians and music enthusiasts who want to showcase their talent and share their love for music...
              </p>
              
              <div className="relative">
                <p className="text-2xl md:text-3xl font-bold font-heading text-gradient-cosmic">
                  Music, what unites us!
                </p>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-nova-neon to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-dark-secondary/60 via-dark-secondary/40 to-dark-secondary/80">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-nova-darkPurple/5 to-transparent" />
        
        {/* Infinity Symbols - Gallery Section */}
        <EternotesSymbols density="light" />
        
        <div className="container-custom relative">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="h-px w-6 sm:w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50" />
              <span className="text-gradient-pink-orange text-xs md:text-sm uppercase tracking-widest font-semibold">Memories</span>
              <div className="h-px w-6 sm:w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6">
              <span className="text-gradient-purple-pink">Campus Gallery</span>
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto leading-relaxed">
              Moments from our musical journey - jam sessions, workshops, and campus performances
            </p>
          </div>

          {/* Coming Soon Placeholder - Mobile Optimized */}
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="glass border border-primary/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 max-w-2xl mx-auto backdrop-blur-xl hover:shadow-2xl hover:border-nova-neon/30 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-nova-neon to-primary rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg shadow-nova-neon/30">
                <FaMusic className="text-2xl sm:text-3xl md:text-4xl text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary mb-4">
                Gallery Coming Soon
              </h3>
              <p className="text-xl text-gray-text leading-relaxed">
                We're preparing an amazing collection of moments from our musical journey.
                <br className="hidden sm:block" />
                <span className="block sm:inline">Check back soon for photos and videos!</span>
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Staff Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-dark-secondary/80 to-dark-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/20 to-dark-secondary/50" />
        
        {/* Infinity Symbols - Team Section */}
        <EternotesSymbols density="minimal" />
        
        <div className="container-custom relative">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="h-px w-6 sm:w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50" />
              <span className="text-nova-neon/60 text-xs md:text-sm uppercase tracking-widest">Our Team</span>
              <div className="h-px w-6 sm:w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6">
              <span className="text-gradient-cosmic">Meet Our Team</span>
            </h2>
            
            <p className="text-xl text-gray-text max-w-3xl mx-auto leading-relaxed">
              The passionate staff who make ETERNOTES Music Club the amazing community it is
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4 max-w-6xl mx-auto">
            {staffMembers.map((member, index) => (
              <StaffCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;