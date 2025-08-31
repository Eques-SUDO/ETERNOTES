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
    { href: "https://www.instagram.com/eternotes.fsr", icon: <FaInstagram />, label: "Instagram" },
  ];

  const contactInfo: ContactInfo[] = [
    { icon: <FaPhone />, content: "0617478471" },
    { icon: <FaEnvelope />, content: "eternotesmusicclub@gmail.com" },
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
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary text-xl font-semibold mb-6">
              Contact Us
            </h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4 text-gray-text/80 group">
                  <div className="text-nova-neon/80 mt-1 flex-shrink-0 group-hover:text-nova-neon transition-colors duration-200">
                    {info.icon}
                  </div>
                  {index === 0 ? (
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

            {/* Google Maps iframe */}
            <div className="mt-8">
              <h4 className="text-nova-neon/80 font-medium mb-4">Find Us</h4>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7676!2d-6.8382388!3d34.0079673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c80825a1893%3A0xbf497c49ab56246a!2sFaculty%20of%20Sciences%20Rabat!5e0!3m2!1sen!2sma!4v1635789123456!5m2!1sen!2sma"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ETERNOTES Music Club Location"
                  className="w-full"
                />
              </div>
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
              &copy; {new Date().getFullYear()} ETERNOTES. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;