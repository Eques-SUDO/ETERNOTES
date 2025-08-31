import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaMusic } from 'react-icons/fa';

interface NavItem {
  path: string;
  label: string;
}

const Navigation: React.FC = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Show/hide based on scroll direction with mobile-optimized thresholds
    setIsVisible(prevVisible => {
      const isMobile = window.innerWidth <= 768;
      const threshold = isMobile ? 80 : 100; // Lower threshold for mobile
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Reduce sensitivity on mobile for smoother scrolling
      if (isMobile && scrollDelta < 5) {
        return prevVisible;
      }
      
      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        return false;
      }
      return true;
    });
    
    setScrolled(currentScrollY > 50);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;
    
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems: NavItem[] = useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/artists', label: 'Artists' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ], []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${
      scrolled 
        ? 'bg-gradient-to-r from-dark-bg/98 via-dark-surface/95 to-dark-bg/98 backdrop-blur-xl shadow-xl border-b border-dark-border' 
        : 'bg-gradient-to-r from-black/5 via-black/10 to-black/5 backdrop-blur-lg'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-2 sm:py-3 md:py-4">
          {/* Brand Logo Section - Complete Rebuild */}
          <Link 
            to="/" 
            className="group relative z-10 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center min-h-[50px] sm:min-h-[60px] md:min-h-[70px]">
              {/* Logo - Mobile Optimized */}
              <div className="relative flex items-center justify-center mr-2 sm:mr-3 md:mr-4">
                <img 
                  src="/logoupdated.png?v=3" 
                  alt="ETERNOTES Logo" 
                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 object-cover object-center transition-all duration-300 group-hover:rotate-3 rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-pink/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </div>
              
              {/* Text - Mobile Optimized */}
              <div className="relative flex items-center justify-center">
                <div className="flex flex-col justify-center">
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-nova-neon to-primary group-hover:from-nova-neon group-hover:to-white transition-all duration-300 block leading-[1] tracking-tight">
                    ETERNOTES
                  </span>
                  <div className="w-0 h-0.5 bg-gradient-to-r from-nova-neon to-primary group-hover:w-full transition-all duration-500 mt-0.5 sm:mt-1"></div>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 items-center">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-heading font-semibold text-sm md:text-base lg:text-lg px-3 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-300 group ${
                  location.pathname === item.path 
                    ? 'text-primary bg-gradient-to-r from-primary/10 to-accent-purple/10 shadow-medium' 
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {item.label}
                
                {/* Modern hover indicator */}
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-brand-gradient rounded-full transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'group-hover:w-full'
                }`}></div>
                
                {/* Enhanced background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-accent-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative text-text-primary text-lg p-2 sm:p-3 rounded-lg hover:text-primary transition-all duration-300 hover:scale-105 hover:bg-primary/10"
            aria-label="Toggle menu"
          >
            <div className="relative z-10">
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-purple/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden fixed top-0 right-0 h-screen w-full max-w-sm bg-gradient-to-b from-dark-bg via-dark-surface/98 to-dark-bg backdrop-blur-2xl shadow-2xl transform transition-all duration-500 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-hidden border-l border-dark-border`}>
        
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-dark-border">
          <div className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/logoupdated.png?v=3" 
              alt="ETERNOTES MUSIC Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-full"
            />
            <span className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary">
              ETERNOTES
            </span>
          </div>
          
          <button
            onClick={toggleMenu}
            className="text-text-primary p-3 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/10"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        {/* Mobile menu content */}
        <div className="flex flex-col justify-center h-full px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="space-y-4 sm:space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-xl sm:text-2xl font-heading font-semibold transition-all duration-300 py-3 sm:py-4 px-4 sm:px-5 rounded-xl relative group ${
                  location.pathname === item.path 
                    ? 'text-primary bg-gradient-to-r from-primary/15 to-accent-purple/10 shadow-medium border-l-4 border-primary' 
                    : 'text-text-tertiary hover:text-text-primary hover:bg-primary/8'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <FaMusic className={`text-lg sm:text-xl ${
                    location.pathname === item.path ? 'text-primary' : 'text-primary/60'
                  }`} />
                  {item.label}
                </div>
                
                {/* Mobile hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-accent-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            ))}
          </div>
          
          {/* Mobile menu footer */}
          <div className="absolute bottom-8 left-6 right-6">
            <div className="flex items-center justify-center gap-3 text-nova-neon/60 text-sm">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-nova-neon/30"></div>
              <FaMusic className="text-sm" />
              <span className="uppercase tracking-widest font-medium">ETERNOTES Music Club</span>
              <FaMusic className="text-sm" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-nova-neon/30"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;