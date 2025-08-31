import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { FaFilter, FaMusic } from 'react-icons/fa';
import EventCard from '../components/EventCard';
// import { api } from '../services/api';

interface Event {
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
}

interface Category {
  value: string;
  label: string;
}

// Memoized filter button component
const FilterButton = React.memo(({ category, isActive, onClick }: {
  category: Category;
  isActive: boolean;
  onClick: (value: string) => void;
}) => (
  <button
    onClick={() => onClick(category.value)}
    className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base ${
      isActive
        ? 'bg-gradient-to-r from-nova-neon to-primary text-white shadow-lg shadow-nova-neon/30 border-2 border-nova-neon/50'
        : 'glass border border-primary/30 text-accent hover:border-nova-neon hover:shadow-lg hover:bg-primary/10'
    }`}
  >
    {category.label}
  </button>
));

const Events: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hardcodedEvents: Event[] = [
    {
      id: 1,
      title: "Weekly Jam Session",
      artist: "All Members Welcome",
      date: new Date('2025-01-01'),
      time: "TBA",
      price: 0,
      category: "jam",
      description: "Bring your instrument and join our collaborative music session. All skill levels welcome!",
      location: "TBA",
      soldOut: false
    },
    {
      id: 2,
      title: "Music Theory Classes",
      artist: "ETERNOTES Music Club Instructors",
      date: new Date('2025-01-01'),
      time: "TBA",
      price: 0,
      category: "workshop",
      description: "Learn chord progressions, songwriting, and music composition fundamentals.",
      location: "TBA",
      soldOut: false
    },
    {
      id: 3,
      title: "Guitar Classes",
      artist: "ETERNOTES Music Club Instructors",
      date: new Date('2025-01-01'),
      time: "TBA",
      price: 0,
      category: "workshop",
      description: "Guitar techniques, effects, and performance tips for all levels.",
      location: "TBA",
      soldOut: false
    },
    {
      id: 4,
      title: "Choir Practice",
      artist: "ETERNOTES Music Club Choir",
      date: new Date('2025-01-01'),
      time: "TBA",
      price: 0,
      category: "rehearsal",
      description: "Join our vocal ensemble for harmonious choir practice sessions.",
      location: "TBA",
      soldOut: false
    }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // const response = await api.events.getAll();
      // // Handle new API response format
      // const eventsData = response.success ? response.data.events : (response.events || response);
      // const eventsList = Array.isArray(eventsData) ? eventsData : [];
      
      // Using hardcoded data for demo
      const eventsList = hardcodedEvents;
      
      // Transform date strings to Date objects
      const transformedData = eventsList.map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      setEvents(transformedData);
    } catch (err: any) {
      setError(err.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };


  const categories: Category[] = useMemo(() => [
    { value: 'all', label: 'All Activities' },
    { value: 'jam', label: 'Jam Sessions' },
    { value: 'workshop', label: 'Classes' },
    { value: 'rehearsal', label: 'Choir Practice' }
  ], []);

  const filteredEvents = useMemo(() => {
    return filter === 'all' 
      ? events 
      : events.filter(event => event.category === filter);
  }, [filter, events]);

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-secondary/30 to-dark-secondary/60 py-8 md:py-16 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-nova-neon/10 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-5" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Page Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-6 px-4 md:px-6 py-2 md:py-3 glass rounded-full border border-primary/20">
            <FaMusic className="text-nova-neon text-sm md:text-base" />
            <span className="text-nova-neon font-medium text-sm md:text-base">ETERNOTES Music Club</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-nova-neon via-white to-primary mb-4 md:mb-6 leading-tight">
            Club Activities
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-text max-w-4xl mx-auto leading-relaxed">
            Join our weekly sessions, workshops, and campus performances
          </p>
          
          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-nova-neon/50" />
            <FaMusic className="text-nova-neon/60 text-xs" />
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-nova-neon/50" />
          </div>
        </div>

        {/* Enhanced Filter Bar */}
        <div className="modern-card p-4 md:p-6 mb-12 md:mb-16 mx-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3 text-nova-neon">
              <FaFilter className="text-base md:text-lg" />
              <span className="font-semibold text-base md:text-lg">Filter Activities:</span>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {categories.map((cat) => (
                <FilterButton
                  key={cat.value}
                  category={cat}
                  isActive={filter === cat.value}
                  onClick={handleFilterChange}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Events Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-nova-neon">
              <div className="w-8 h-8 border-4 border-nova-neon border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl">Loading events...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={fetchEvents}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 px-4">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20 relative px-4">
            <div className="modern-card p-8 md:p-12 max-w-2xl mx-auto hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-nova-neon to-primary rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg shadow-nova-neon/30">
                <FaMusic className="text-2xl md:text-3xl text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary mb-4 md:mb-6">
                No activities found
              </h3>
              <p className="text-lg md:text-xl text-gray-text leading-relaxed mb-6 md:mb-8">
                Check back soon for new sessions and workshops!<br />
                Or try selecting a different category above.
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;