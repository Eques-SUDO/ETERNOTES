import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import LazyImage from '../LazyImage';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  major: string;
  image: string;
  description: string;
}

interface StaffSectionProps {
  staffMembers: StaffMember[];
}

const StaffCard: React.FC<{ member: StaffMember; index: number }> = memo(({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="modern-card p-8 text-center group hover:shadow-2xl transition-all duration-300"
  >
    <div className="relative mb-6 mx-auto w-32 h-32">
      <LazyImage
        src={member.image}
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-nova-neon/50 transition-all duration-300"
      />
    </div>
    
    <h3 className="text-2xl font-bold text-accent mb-2 group-hover:text-nova-neon transition-colors duration-300">
      {member.name}
    </h3>
    
    <p className="text-nova-neon font-semibold mb-2">{member.role}</p>
    
    {member.major && (
      <p className="text-gray-text mb-4">{member.major}</p>
    )}
    
    <p className="text-gray-text leading-relaxed">
      {member.description}
    </p>
  </motion.div>
));

StaffCard.displayName = 'StaffCard';

const StaffSection: React.FC<StaffSectionProps> = memo(({ staffMembers }) => {
  return (
    <section className="py-24 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 glass rounded-full border border-primary/20">
            <FaUsers className="text-nova-neon" />
            <span className="text-nova-neon font-medium">Our Team</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold font-display text-gradient mb-6">
            Meet the ETERNOTES Family
          </h2>
          
          <p className="text-xl text-gray-text max-w-3xl mx-auto">
            Our passionate team of musicians and leaders dedicated to creating 
            an inclusive space for musical growth and having the best vibes and experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staffMembers.map((member, index) => (
            <StaffCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

StaffSection.displayName = 'StaffSection';

export default StaffSection;