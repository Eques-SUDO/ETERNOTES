import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaInstagram, FaMusic, FaUser, FaCalendarAlt, FaGuitar, FaPaperPlane } from 'react-icons/fa';
import Button from '../components/common/Button';
// import { api } from '../services/api';

interface FormData {
  name: string;
  email: string;
  year: string;
  otherYear: string;
  instrument: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    year: 'freshman',
    otherYear: '',
    instrument: '',
    subject: 'join',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate required fields
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    
    // Additional validation
    Object.entries(formData).forEach(([key, value]) => {
      if (value && (key === 'name' || key === 'email' || key === 'message')) {
        const error = validateField(key, value);
        if (error) newErrors[key as keyof FormData] = error;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      // await api.contact.send(formData);
      // Simulating success for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
      setIsSubmitting(false);
      setTimeout(() => setShowSuccess(false), 5000);
      setFormData({
        name: '',
        email: '',
        year: 'freshman',
        otherYear: '',
        instrument: '',
        subject: 'join',
        message: ''
      });
      setErrors({});
    } catch (error: any) {
      setErrors({ message: error.message || 'Failed to send message. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-secondary/20 to-dark-bg opacity-50" />
      
      <div className="relative z-10 container-custom py-20">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <FaMusic className="text-nova-neon" />
            <span className="text-nova-neon font-medium">ETERNOTES Music Club</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-text max-w-2xl mx-auto">
            Ready to join our musical community? Send us a message!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              
              {/* Email */}
              <div className="mb-6">
                <div className="flex items-center gap-3 text-gray-text">
                  <FaEnvelope className="text-nova-neon" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a href="mailto:elkhouranihiba226@gmail.com" className="hover:text-nova-neon transition-colors">
                      elkhouranihiba226@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="mb-8">
                <div className="flex items-center gap-3 text-gray-text">
                  <FaInstagram className="text-nova-neon" />
                  <div>
                    <p className="font-medium text-white">Follow Us</p>
                    <a 
                      href="https://www.instagram.com/jamhouse.fsr/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-nova-neon transition-colors"
                    >
                      @jamhouse.fsr
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="p-6 glass rounded-xl border border-primary/20">
                <h3 className="text-lg font-semibold text-white mb-3">Join Our Community</h3>
                <p className="text-gray-text text-sm leading-relaxed">
                  Whether you're a beginner or an experienced musician, ETERNOTES welcomes everyone 
                  who shares a passion for music. Join us for weekly sessions, workshops, and performances!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  <FaUser className="inline-block mr-2 text-nova-neon text-sm" />
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  <FaEnvelope className="inline-block mr-2 text-nova-neon text-sm" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Two columns for Year and Instrument */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Academic Year */}
                <div>
                  <label htmlFor="year" className="block text-white font-medium mb-2">
                    <FaCalendarAlt className="inline-block mr-2 text-nova-neon text-sm" />
                    Academic Year
                  </label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all appearance-none cursor-pointer"
                  >
                    <option value="freshman">1st Year (L1)</option>
                    <option value="sophomore">2nd Year (L2)</option>
                    <option value="junior">3rd Year (L3)</option>
                    <option value="senior">Master's (M1/M2)</option>
                    <option value="other">Other</option>
                  </select>
                  
                  {formData.year === 'other' && (
                    <input
                      type="text"
                      name="otherYear"
                      value={formData.otherYear}
                      onChange={handleChange}
                      placeholder="Please specify"
                      className="w-full px-4 py-2 mt-2 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all"
                    />
                  )}
                </div>

                {/* Instrument */}
                <div>
                  <label htmlFor="instrument" className="block text-white font-medium mb-2">
                    <FaGuitar className="inline-block mr-2 text-nova-neon text-sm" />
                    Instrument/Skill
                  </label>
                  <input
                    type="text"
                    id="instrument"
                    name="instrument"
                    value={formData.instrument}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all"
                    placeholder="Piano, Guitar, Vocals, etc."
                  />
                </div>
              </div>

              {/* Interest */}
              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  <FaMusic className="inline-block mr-2 text-nova-neon text-sm" />
                  Interest
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all appearance-none cursor-pointer"
                >
                  <option value="join">Join the Club</option>
                  <option value="workshop">Attend Workshops</option>
                  <option value="perform">Performance Opportunities</option>
                  <option value="collaborate">Collaboration</option>
                  <option value="general">General Questions</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all resize-none"
                  placeholder="Tell us about your musical interests and what you'd like to know..."
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </Button>

              {/* Success Message */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;