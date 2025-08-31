import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaMusic } from 'react-icons/fa';

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  content: string;
}

const Footer: React.FC = () => {
  const socialLinks: SocialLink[] = [
    { href: "https://www.instagram.com/jamhouse.fsr/", icon: <FaInstagram />, label: "Instagram" },
  ];

  const contactInfo: ContactInfo[] = [
    { icon: <FaMapMarkerAlt />, content: "Faculty of Sciences Rabat, 4 Avenue Ibn Batouta, Rabat, Morocco" },
    { icon: <FaPhone />, content: "0617478471" },
    { icon: <FaEnvelope />, content: "elkhouranihiba226@gmail.com" },
  ];

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      {/* Smooth gradient transition from content */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-secondary via-dark-secondary/95 to-dark-bg" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-nova-neon/10 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Top Divider */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-nova-neon/30 to-transparent" />
          <FaMusic className="text-nova-neon/60 text-lg flex-shrink-0" />
          <div className="h-px w-full bg-gradient-to-l from-transparent via-nova-neon/30 to-transparent" />
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary text-xl font-semibold mb-6">
              About ETERNOTES
            </h3>
            <p className="text-gray-text/80 mb-4 leading-relaxed">
              Your university music community for collaborative sessions, workshops, musical growth and having the best vibes and experiences.
            </p>
            <blockquote className="text-primary/80 italic text-sm mb-6 border-l-2 border-nova-neon/50 pl-4">
              "Music is a higher revelation than all wisdom and philosophy." - Ludwig van Beethoven
            </blockquote>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-dark-bg to-dark-secondary text-accent rounded-full flex items-center justify-center hover:from-nova-neon hover:to-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-nova-neon/30"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary text-xl font-semibold mb-6">
              Quick Links
            </h3>
            <div className="space-y-3">
              <Link to="/events" className="block text-gray-text/80 hover:text-nova-neon hover:translate-x-1 transition-all duration-200">
                → Upcoming Events
              </Link>
              <Link to="/artists" className="block text-gray-text/80 hover:text-nova-neon hover:translate-x-1 transition-all duration-200">
                → Featured Artists
              </Link>
              <Link to="/gallery" className="block text-gray-text/80 hover:text-nova-neon hover:translate-x-1 transition-all duration-200">
                → Photo Gallery
              </Link>
              <Link to="/contact" className="block text-gray-text/80 hover:text-nova-neon hover:translate-x-1 transition-all duration-200">
                → Join Our Club
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary text-xl font-semibold mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 text-gray-text/80 group">
                  <div className="text-nova-neon/80 mt-1 flex-shrink-0 group-hover:text-nova-neon transition-colors duration-200">
                    {info.icon}
                  </div>
                  {index === 1 ? (
                    <a 
                      href="https://wa.me/212617478471" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="leading-relaxed hover:text-nova-neon transition-colors duration-200"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <span className="leading-relaxed group-hover:text-gray-light transition-colors duration-200">
                      {info.content}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative">
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="pt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-nova-neon/60">
              <FaMusic className="text-sm" />
              <span className="text-xs uppercase tracking-widest">ETERNOTES Music Club</span>
              <FaMusic className="text-sm" />
            </div>
            <p className="text-gray-text/60 text-sm">
              &copy; {new Date().getFullYear()} ETERNOTES. All rights reserved. Made with ♪ in Rabat
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;