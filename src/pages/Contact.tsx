import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaInstagram, FaMusic, FaUser, FaCalendarAlt, FaGuitar, FaPaperPlane, FaBirthdayCake, FaPhone, FaUniversity, FaIdCard } from 'react-icons/fa';
import Button from '../components/common/Button';
import { submitToGoogleSheets } from '../utils/googleSheets';

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  cni: string;
  email: string;
  phone: string;
  university: string;
  year: string;
  otherYear: string;
  instrument: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: '',
    cni: '',
    email: '',
    phone: '',
    university: '',
    year: 'freshman',
    otherYear: '',
    instrument: '',
    subject: 'theory',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return value.length < 2 ? 'First name must be at least 2 characters' : '';
      case 'lastName':
        return value.length < 2 ? 'Last name must be at least 2 characters' : '';
      case 'age':
        const age = parseInt(value);
        return !age || age < 16 || age > 65 ? 'Please enter a valid age (16-65)' : '';
      case 'cni':
        if (!value) return ''; // Allow empty for optional validation
        const cniRegex = /^[A-Za-z]{2}\d{4}$/;
        const upperValue = value.toUpperCase().trim();
        return !cniRegex.test(upperValue) ? 'CNI must be in format: AB1234 (2 letters + 4 digits)' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'phone':
        return ''; // No validation for phone numbers
      case 'university':
        return value.length < 2 ? 'University name must be at least 2 characters' : '';
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for CNI and phone fields
    let processedValue = value;
    if (name === 'cni') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    } else if (name === 'phone') {
      // Auto-format phone numbers
      processedValue = value.replace(/[^0-9+]/g, '');
      // Convert Moroccan format 06/07 to +2126/+2127
      if (processedValue.startsWith('0')) {
        processedValue = '+212' + processedValue.substring(1);
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate required fields
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.cni) newErrors.cni = 'CNI is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.university) newErrors.university = 'University is required';
    if (!formData.message) newErrors.message = 'Message is required';
    
    // Additional validation
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
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
      // Submit to Google Sheets
      const success = await submitToGoogleSheets(formData);
      
      if (success) {
        setShowSuccess(true);
        setIsSubmitting(false);
        setTimeout(() => setShowSuccess(false), 5000);
        
        // Reset form on successful submission
        setFormData({
          firstName: '',
          lastName: '',
          age: '',
          cni: '',
          email: '',
          phone: '',
          university: '',
          year: 'freshman',
          otherYear: '',
          instrument: '',
          subject: 'theory',
          message: ''
        });
        setErrors({});
      } else {
        throw new Error('Failed to submit to Google Sheets');
      }
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
                    <a href="mailto:eternotesmusicclub@gmail.com" className="hover:text-nova-neon transition-colors">
                      eternotesmusicclub@gmail.com
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
                      href="https://www.instagram.com/eternotes.fsr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-nova-neon transition-colors"
                    >
                      @eternotes.fsr
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="border-l-4 border-nova-neon pl-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                  <p className="text-gray-text text-sm">Tell us about yourself</p>
                </div>

                {/* First & Last Name Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-white font-medium mb-2">
                      <FaUser className="inline-block mr-2 text-nova-neon text-sm" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50"
                      placeholder="Your first name"
                    />
                    {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-white font-medium mb-2">
                      <FaUser className="inline-block mr-2 text-nova-neon text-sm" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50"
                      placeholder="Your last name"
                    />
                    {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Age & CNE Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="age" className="block text-white font-medium mb-2">
                      <FaBirthdayCake className="inline-block mr-2 text-nova-neon text-sm" />
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      min="16"
                      max="65"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50"
                      placeholder="Your age"
                    />
                    {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
                  </div>

                  <div>
                    <label htmlFor="cni" className="block text-white font-medium mb-2">
                      <FaIdCard className="inline-block mr-2 text-nova-neon text-sm" />
                      CNI *
                    </label>
                    <input
                      type="text"
                      id="cni"
                      name="cni"
                      value={formData.cni}
                      onChange={handleChange}
                      maxLength={6}
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50 font-mono tracking-wider"
                      placeholder="AB1234"
                      style={{ textTransform: 'uppercase' }}
                    />
                    {errors.cni && <p className="text-red-400 text-sm mt-1">{errors.cni}</p>}
                    <p className="text-gray-text text-xs mt-1">
                      Format: 2 letters + 4 digits (e.g., AB1234)
                      {formData.cni && (
                        <span className={`ml-2 ${formData.cni.length === 6 ? 'text-green-400' : 'text-yellow-400'}`}>
                          ({formData.cni.length}/6)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <div className="border-l-4 border-nova-purple pl-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Contact Information</h3>
                  <p className="text-gray-text text-sm">How can we reach you?</p>
                </div>

                {/* Email & Phone Row */}
                <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2">
                      <FaPhone className="inline-block mr-2 text-nova-neon text-sm" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50"
                      placeholder="06XXXXXXXX or +212 6XXXXXXXX"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Educational Information Section */}
              <div className="space-y-6">
                <div className="border-l-4 border-nova-pink pl-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Educational Background</h3>
                  <p className="text-gray-text text-sm">Tell us about your studies</p>
                </div>

                {/* University */}
                <div>
                  <label htmlFor="university" className="block text-white font-medium mb-2">
                    <FaUniversity className="inline-block mr-2 text-nova-neon text-sm" />
                    University/Institution *
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50"
                    placeholder="e.g., Faculty of Sciences Rabat, ENSAM Rabat..."
                  />
                  {errors.university && <p className="text-red-400 text-sm mt-1">{errors.university}</p>}
                </div>

                {/* Academic Year & Instrument Row */}
                <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50 appearance-none cursor-pointer"
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
                        placeholder="Please specify your year"
                        className="w-full px-4 py-2 mt-2 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300"
                      />
                    )}
                  </div>

                  <div>
                    <label htmlFor="instrument" className="block text-white font-medium mb-2">
                      <FaGuitar className="inline-block mr-2 text-nova-neon text-sm" />
                      Musical Instrument/Skill
                    </label>
                    <input
                      type="text"
                      id="instrument"
                      name="instrument"
                      value={formData.instrument}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50"
                      placeholder="Piano, Guitar, Vocals, Producer, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Interest & Message Section */}
              <div className="space-y-6">
                <div className="border-l-4 border-nova-cyan pl-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Your Interest</h3>
                  <p className="text-gray-text text-sm">What brings you to ETERNOTES?</p>
                </div>

                {/* Interest */}
                <div>
                  <label htmlFor="subject" className="block text-white font-medium mb-2">
                    <FaMusic className="inline-block mr-2 text-nova-neon text-sm" />
                    Primary Interest
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50 appearance-none cursor-pointer"
                  >
                    <option value="theory">Music Theory Lessons</option>
                    <option value="instrument">Learn an Instrument</option>
                    <option value="singing">Learn How to Sing</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white font-medium mb-2">
                    <FaPaperPlane className="inline-block mr-2 text-nova-neon text-sm" />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-secondary/50 border border-primary/30 rounded-lg text-white placeholder-gray-text/50 focus:outline-none focus:border-nova-neon focus:ring-1 focus:ring-nova-neon transition-all duration-300 hover:border-primary/50 resize-none"
                    placeholder="Tell us about your musical background, interests, and what you'd like to achieve with ETERNOTES. What draws you to our music community?"
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 group relative overflow-hidden bg-gradient-to-r from-nova-neon to-nova-purple hover:from-nova-purple hover:to-nova-pink transition-all duration-500 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-nova-neon/30 text-lg font-semibold py-4"
                >
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-nova-neon/20 to-nova-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="relative z-10">Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 relative z-10">
                      <FaPaperPlane className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      <span>Submit Application</span>
                    </div>
                  )}
                </Button>
              </div>

              {/* Success Popup Modal */}
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
                  onClick={() => setShowSuccess(false)}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="relative max-w-md mx-4 p-8 bg-gradient-to-br from-dark-surface to-dark-card backdrop-blur-xl border border-nova-neon/30 rounded-2xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-dark-secondary/50 hover:bg-nova-neon/20 transition-colors duration-200 text-gray-400 hover:text-white"
                    >
                      ×
                    </button>

                    {/* Success animation */}
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", damping: 15 }}
                        className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-nova-neon to-nova-purple rounded-full flex items-center justify-center shadow-lg shadow-nova-neon/30"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, type: "spring" }}
                          className="text-2xl text-white"
                        >
                          ✓
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-white mb-4"
                      >
                        Thank You! 🎵
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-text leading-relaxed mb-6"
                      >
                        Your application has been successfully submitted to ETERNOTES Music Club.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-4 bg-nova-neon/10 border border-nova-neon/20 rounded-lg mb-6"
                      >
                        <p className="text-nova-neon font-medium text-sm">
                          Our team will contact you soon to discuss your musical journey with us!
                        </p>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        onClick={() => setShowSuccess(false)}
                        className="w-full px-6 py-3 bg-gradient-to-r from-nova-neon to-nova-purple hover:from-nova-purple hover:to-nova-pink rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-nova-neon/30"
                      >
                        Continue Exploring
                      </motion.button>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-nova-neon/50 rounded-full blur-sm animate-pulse" />
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-nova-purple/50 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
                  </motion.div>
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