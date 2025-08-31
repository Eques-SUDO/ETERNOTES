import React, { memo, ReactElement } from 'react';
import { FaCalendarAlt, FaClock, FaTicketAlt, FaMusic, FaUsers, FaGuitar, FaMapMarkerAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import Button from './common/Button';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    artist: string;
    date: Date;
    time: string;
    price: number;
    category: string;
    description: string;
    location: string;
    soldOut: boolean;
  };
}


const EventCard: React.FC<EventCardProps> = memo(({ event }) => {
  return (
    <div className="group modern-card p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-primary/20 hover:border-nova-neon/50 backdrop-blur-xl relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-nova-neon/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Event Header */}
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-accent mb-2 group-hover:text-nova-neon transition-colors duration-300">
            {event.title}
          </h3>
          <p className="text-nova-neon font-semibold text-lg smooth-glow">
            {event.artist}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="text-3xl text-nova-neon group-hover:scale-110 transition-transform duration-300">
            {event.category === 'jam' && <FaMusic key="jam" />}
            {event.category === 'workshop' && <FaGuitar key="workshop" />}
            {event.category === 'performance' && <FaUsers key="performance" />}
            {event.category === 'rehearsal' && <FaMusic key="rehearsal" />}
            {!['jam', 'workshop', 'performance', 'rehearsal'].includes(event.category) && <FaMusic key="default" />}
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
            event.price === 0 
              ? 'bg-nova-gradient text-accent shadow-nova-neon/30' 
              : 'bg-primary text-accent shadow-primary/30'
          }`}>
            {event.price === 0 ? 'FREE' : `$${event.price}`}
          </span>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="relative z-10 space-y-4 mb-6">
        <div className="flex items-center gap-4 text-gray-text group-hover:text-accent transition-colors duration-300 p-3 rounded-lg glass border border-primary/10">
          <FaCalendarAlt className="text-nova-neon text-lg flex-shrink-0" />
          <span className="font-medium">TBA</span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-text group-hover:text-accent transition-colors duration-300 p-3 rounded-lg glass border border-primary/10">
          <FaClock className="text-nova-neon text-lg flex-shrink-0" />
          <span className="font-medium">{event.time}</span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-text group-hover:text-accent transition-colors duration-300 p-3 rounded-lg glass border border-primary/10">
          <FaMapMarkerAlt className="text-nova-neon text-lg flex-shrink-0" />
          <span className="font-medium">{event.location}</span>
        </div>
      </div>
      
      {/* Description */}
      <div className="relative z-10 mb-8">
        <p className="text-gray-text leading-relaxed text-lg group-hover:text-gray-light transition-colors duration-300">
          {event.description}
        </p>
      </div>
      
      {/* Action Button */}
      <div className="relative z-10">
        <Button className="w-full group-hover:scale-105 transition-transform duration-300">
          <FaTicketAlt className="mr-3" />
          {event.price === 0 ? 'Join Activity' : 'Register'}
        </Button>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;