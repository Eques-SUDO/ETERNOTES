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
    
    // Show/hide based on scroll direction
    setIsVisible(prevVisible => {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
        ? 'bg-gradient-to-r from-dark-bg/95 via-dark-secondary/90 to-dark-bg/95 backdrop-blur-xl shadow-2xl border-b border-primary/20' 
        : 'bg-gradient-to-r from-transparent via-dark-bg/20 to-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group transition-all duration-300 hover:scale-105 relative z-10"
          >
            <div className="relative overflow-hidden rounded-full mr-0.5 md:mr-1">
              <img 
                src="/etern-logo.PNG" 
                alt="ETERNOTES Logo" 
                className="h-20 w-20 md:h-24 md:w-24 object-contain transition-all duration-300 group-hover:rotate-12"
              />
              
              {/* Enhanced Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-nova-neon/30 to-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 scale-150"></div>
            </div>
            
            <div className="relative">
              <span className="text-xl md:text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-nova-neon to-primary group-hover:from-nova-neon group-hover:to-white transition-all duration-300">
                ETERNOTES
              </span>
              
              {/* Decorative line under text */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-nova-neon to-primary group-hover:w-full transition-all duration-500"></div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 lg:gap-10 items-center">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-heading font-medium text-base lg:text-lg px-4 py-2 rounded-xl transition-all duration-300 group ${
                  location.pathname === item.path 
                    ? 'text-nova-neon bg-gradient-to-r from-nova-neon/10 to-primary/10 shadow-lg' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                
                {/* Hover indicator */}
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-nova-neon to-primary transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'group-hover:w-full'
                }`}></div>
                
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-nova-neon/5 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative text-white text-xl p-3 rounded-full hover:text-nova-neon transition-all duration-300 hover:scale-110 hover:bg-primary/10"
            aria-label="Toggle menu"
          >
            <div className="relative z-10">
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-nova-neon/20 to-primary/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 blur-md"></div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden fixed top-0 right-0 h-screen w-full max-w-sm bg-gradient-to-b from-dark-bg via-dark-secondary/95 to-dark-bg backdrop-blur-2xl shadow-2xl transform transition-all duration-500 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-hidden border-l border-primary/20`}>
        
        {/* Mobile header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-primary/20">
          <div className="flex items-center gap-1">
            <img 
              src="/etern-logo.PNG" 
              alt="ETERNOTES MUSIC Logo" 
              className="h-16 w-16 object-contain"
            />
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary">
              ETERNOTES
            </span>
          </div>
          
          <button
            onClick={toggleMenu}
            className="text-white p-2 hover:text-nova-neon transition-colors duration-200"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Mobile menu content */}
        <div className="flex flex-col justify-center h-full px-6 pb-20">
          <div className="space-y-6">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block text-2xl font-heading font-medium transition-all duration-300 py-3 px-4 rounded-xl relative group ${
                  location.pathname === item.path 
                    ? 'text-nova-neon bg-gradient-to-r from-nova-neon/10 to-primary/10 shadow-lg border-l-4 border-nova-neon' 
                    : 'text-gray-300 hover:text-white hover:bg-primary/5'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <FaMusic className={`text-lg ${
                    location.pathname === item.path ? 'text-nova-neon' : 'text-primary/60'
                  }`} />
                  {item.label}
                </div>
                
                {/* Mobile hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-nova-neon/5 to-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            ))}
          </div>
          
          {/* Mobile menu footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-center gap-2 text-nova-neon/60 text-sm">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-nova-neon/30"></div>
              <FaMusic className="text-xs" />
              <span className="uppercase tracking-widest">ETERNOTES Music Club</span>
              <FaMusic className="text-xs" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-nova-neon/30"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;