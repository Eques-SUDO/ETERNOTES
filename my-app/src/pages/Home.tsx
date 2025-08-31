import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMusic, FaTicketAlt, FaStar, FaChevronLeft, FaChevronRight, FaUsers } from 'react-icons/fa';
import Button from '../components/common/Button';

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

// Memoized components
const FeatureCard = React.memo(({ feature, index }: { feature: Feature; index: number }) => (
  <div
    className="group modern-card text-center p-6 md:p-10 transition-all duration-300 relative overflow-hidden hover:shadow-2xl hover:scale-[1.02] opacity-0 animate-fadeIn"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-nova-neon/0 to-primary/0 group-hover:from-nova-neon/10 group-hover:to-primary/10 transition-all duration-500" />
    
    <div className="text-3xl md:text-4xl text-nova-neon mb-6 md:mb-8 flex justify-center relative group-hover:scale-110 transition-transform duration-300">
      {feature.icon}
    </div>
    
    <h3 className="text-xl md:text-2xl font-bold font-heading mb-3 md:mb-4 text-accent group-hover:text-nova-neon transition-colors duration-300">
      {feature.title}
    </h3>
    
    <p className="text-gray-text leading-relaxed text-base md:text-lg group-hover:text-gray-light transition-colors duration-300">
      {feature.description}
    </p>
  </div>
));

const StaffCard = React.memo(({ member, index }: { member: StaffMember; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group text-center p-8 transition-all duration-300 relative overflow-hidden modern-card hover:shadow-2xl opacity-0 animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-nova-neon/0 to-transparent group-hover:from-nova-neon/10 transition-all duration-500" />
      
      <div className="relative mb-6">
        <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-4 relative bg-gray-800 ring-4 ring-primary/20 group-hover:ring-nova-neon/40 transition-all duration-300">
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
        </div>
      </div>
      
      <h3 className="text-xl font-bold font-heading mb-2 text-accent group-hover:text-nova-neon transition-colors duration-300">
        {member.name}
      </h3>
      
      <p className="text-nova-neon/80 font-medium text-sm mb-3 uppercase tracking-wider">
        {member.role}
      </p>
      
      {member.major && (
        <p className="text-gray-text text-sm mb-3 italic">
          {member.major}
        </p>
      )}
      
      <p className="text-gray-text leading-relaxed text-sm">
        {member.description}
      </p>
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
    },
    {
      id: 8,
      name: "Youssef Loulida",
      role: "Marketing Leader",
      major: "",
      image: "/images/staff/Youffes.jpg",
      description: "Events Presenter"
    }
  ], []);

  // Callbacks
  const scrollToNextSection = useCallback(() => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 transition-opacity duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
            filter: 'brightness(0.8) contrast(1.1) saturate(1.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/70 via-dark-bg/60 to-dark-secondary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-dark-bg/40" />
        
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-nova-neon/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Floating Musical Notes */}
          <div className="absolute top-20 left-10 text-nova-neon/20 text-2xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>♪</div>
          <div className="absolute top-32 right-16 text-primary/20 text-xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>♫</div>
          <div className="absolute bottom-40 left-20 text-nova-neon/15 text-3xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '5s' }}>♬</div>
          <div className="absolute bottom-64 right-24 text-primary/15 text-lg animate-bounce" style={{ animationDelay: '3s', animationDuration: '3.5s' }}>♩</div>
          <div className="absolute top-1/3 left-1/4 text-nova-neon/10 text-4xl animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '6s' }}>♭</div>
          <div className="absolute top-2/3 right-1/3 text-primary/10 text-2xl animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4.5s' }}>♯</div>
          
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
        
        <div className="relative z-10 text-center max-w-6xl px-8">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-8 opacity-80">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-nova-neon" />
              <FaMusic className="text-nova-neon text-lg" />
              <span className="text-nova-neon/80 text-sm font-medium tracking-widest uppercase">ETERNOTES Music Club</span>
              <FaMusic className="text-nova-neon text-lg" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-nova-neon" />
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
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black font-display mb-6 md:mb-8 leading-tight opacity-0 animate-fadeIn relative">
                <span className="block text-gradient bg-clip-text text-transparent">WHERE</span>
                <span className="block text-white text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] my-2 md:my-4 relative">
                  MUSIC
                  {/* Subtle glow effect behind MUSIC */}
                  <div className="absolute inset-0 text-white opacity-20 blur-sm -z-10">MUSIC</div>
                </span>
                <span className="block text-gradient bg-clip-text text-transparent">COMES ALIVE</span>
              </h1>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-text mb-12 md:mb-16 font-light leading-relaxed max-w-4xl mx-auto opacity-0 animate-fadeIn px-4" style={{ animationDelay: '300ms' }}>
            Join the <span className="text-nova-neon font-medium">musical community</span> at your university with the most vibrant <span className="text-white font-semibold">music club</span> on campus
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center opacity-0 animate-fadeIn px-4 mb-16 md:mb-20" style={{ animationDelay: '600ms' }}>
            <Link to="/events" className="group w-full sm:w-auto">
              <Button size="large" className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5 shadow-lg hover:shadow-nova-neon/30 w-full sm:w-auto">
                <FaCalendarAlt className="text-lg md:text-xl mr-2 md:mr-3" />
                Join Activities
              </Button>
            </Link>
            <Link to="/contact" className="group w-full sm:w-auto">
              <Button variant="outline" size="large" className="text-base md:text-lg px-8 md:px-12 py-4 md:py-5 w-full sm:w-auto">
                <FaUsers className="text-lg md:text-xl mr-2 md:mr-3" />
                Become a Member
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div
          className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-0 animate-fadeIn hover:scale-110 transition-all duration-500 group z-20"
          style={{ animationDelay: '2000ms', left: '50%' }}
          onClick={scrollToNextSection}
        >
          {/* Decorative elements around scroll indicator */}
          <div className="absolute -top-4 -left-2 w-1 h-1 bg-nova-neon/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0s', animationDuration: '2s' }}></div>
          <div className="absolute -top-4 -right-2 w-1 h-1 bg-primary/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
          
          {/* Floating musical notes around scroll indicator */}
          <div className="absolute -top-6 -left-4 text-nova-neon/30 text-xs animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0s', animationDuration: '4s' }}>♪</div>
          <div className="absolute -top-6 -right-4 text-primary/30 text-xs animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '1s', animationDuration: '3.5s' }}>♫</div>
          
          <div className="flex flex-col items-center relative">            
            {/* Enhanced text with gradient */}
            <div className="flex items-center gap-2 mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              <div className="h-px w-3 bg-gradient-to-r from-transparent to-nova-neon/50"></div>
              <span className="text-xs font-medium uppercase tracking-widest text-nova-neon/70 group-hover:text-nova-neon transition-colors duration-300">
                Explore More
              </span>
              <div className="h-px w-3 bg-gradient-to-l from-transparent to-primary/50"></div>
            </div>
            
            {/* Enhanced scroll mouse */}
            <div className="relative">
              <div className="w-6 h-10 border-2 border-nova-neon/40 group-hover:border-nova-neon rounded-full flex justify-center relative overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-nova-neon/20">
                {/* Animated dot */}
                <div className="w-1 h-3 bg-nova-neon/60 group-hover:bg-nova-neon rounded-full mt-2 animate-bounce transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-dark-secondary/80 via-dark-bg to-dark-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-transparent" />
        
        <div className="container-custom relative">
          <div className="text-center mb-12 md:mb-20 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50" />
              <span className="text-nova-neon/60 text-xs md:text-sm uppercase tracking-widest">Our Services</span>
              <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6">
              <span className="text-gradient bg-clip-text text-transparent">What We Offer</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-text max-w-3xl mx-auto leading-relaxed px-4">
              From beginner-friendly sessions to advanced workshops - grow your musical skills with fellow students
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Enhanced */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-dark-bg via-dark-secondary/30 to-dark-secondary/60">
        <div className="absolute inset-0 bg-gradient-to-br from-nova-darkPurple/10 via-transparent to-primary/5" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-12 md:mb-16 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50" />
              <span className="text-nova-neon/60 text-xs md:text-sm uppercase tracking-widest">Who We Are</span>
              <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 md:mb-8">
              <span className="text-gradient bg-clip-text text-transparent">About Us</span>
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="modern-card p-8 md:p-12 lg:p-16 text-center relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-nova-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <p className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-light relative z-10">
                <span className="font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary">ETERNOTES</span>
                <span className="italic opacity-90"> Music Club </span>
                is a vibrant community based in the Faculty of Sciences Rabat, bringing together passionate musicians and music enthusiasts who want to showcase their talent and share their love for music...
              </p>
              
              <div className="relative">
                <p className="text-2xl md:text-3xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-nova-neon via-white to-primary">
                  Music, what unites us!
                </p>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-nova-neon to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Enhanced */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-dark-secondary/60 via-dark-secondary/40 to-dark-secondary/80">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-nova-darkPurple/5 to-transparent" />
        
        <div className="container-custom relative">
          <div className="text-center mb-12 md:mb-20 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50" />
              <span className="text-nova-neon/60 text-xs md:text-sm uppercase tracking-widest">Memories</span>
              <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6">
              <span className="text-gradient bg-clip-text text-transparent">Campus Gallery</span>
            </h2>
            <p className="text-xl text-gray-text max-w-3xl mx-auto leading-relaxed">
              Moments from our musical journey - jam sessions, workshops, and campus performances
            </p>
          </div>

          {/* Coming Soon Placeholder - Enhanced */}
          <div className="text-center py-20">
            <div className="glass border border-primary/30 rounded-3xl p-8 md:p-16 max-w-2xl mx-auto backdrop-blur-xl hover:shadow-2xl hover:border-nova-neon/30 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-nova-neon to-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-nova-neon/30">
                <FaMusic className="text-4xl text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary mb-4">
                Gallery Coming Soon
              </h3>
              <p className="text-xl text-gray-text leading-relaxed">
                We're preparing an amazing collection of moments from our musical journey.<br />
                Check back soon for photos and videos!
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-8">
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section - Enhanced */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-gradient-to-b from-dark-secondary/80 to-dark-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/20 to-dark-secondary/50" />
        
        <div className="container-custom relative">
          <div className="text-center mb-12 md:mb-20 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-nova-neon/50" />
              <span className="text-nova-neon/60 text-xs md:text-sm uppercase tracking-widest">Our Team</span>
              <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-nova-neon/50" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 md:mb-6">
              <span className="text-gradient bg-clip-text text-transparent">Meet Our Team</span>
            </h2>
            
            <p className="text-xl text-gray-text max-w-3xl mx-auto leading-relaxed">
              The passionate staff who make ETERNOTES Music Club the amazing community it is
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
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