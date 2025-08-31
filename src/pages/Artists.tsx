import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FaInstagram, FaSpotify, FaYoutube, FaGlobe, FaStar, FaMusic, FaGuitar, FaMicrophone, FaDrum, FaCompactDisc } from 'react-icons/fa';
// import { api } from '../services/api';

interface Artist {
  id: number;
  name: string;
  genre: string;
  image: string;
  bio: string;
  rating: number;
  instrument: string;
  year: string;
  social: {
    instagram?: string;
    spotify?: string;
    youtube?: string;
    website?: string;
  };
}

interface Tab {
  key: string;
  label: string;
}

// Memoized tab button component
const TabButton = React.memo(({ tab, isActive, onClick }: {
  tab: Tab;
  isActive: boolean;
  onClick: (key: string) => void;
}) => (
  <button
    onClick={() => onClick(tab.key)}
    className={`px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg relative overflow-hidden transition-all duration-300 hover:scale-105 ${
      isActive
        ? 'bg-gradient-to-r from-nova-neon to-primary text-white shadow-lg shadow-nova-neon/30'
        : 'modern-card border border-primary/30 text-accent hover:border-nova-neon hover:shadow-lg hover:bg-primary/10'
    }`}
  >
    {tab.label}
    
    {/* Active indicator */}
    {isActive && (
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
    )}
  </button>
));

const Artists: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('members');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tabs: Tab[] = useMemo(() => [
    { key: 'members', label: 'Group Members' }
  ], []);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      // const response = await api.artists.getAll();
      // // Handle new API response format
      // const artistsData = response.success ? response.data.artists : (response.artists || response);
      // Using empty array for demo - will show recruitment message
      setArtists([]);
    } catch (err: any) {
      setError(err.message || 'Failed to load artists');
    } finally {
      setLoading(false);
    }
  };

  const currentArtists = artists;

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
  }, []);

  const getInstrumentIcon = useCallback((instrument: string) => {
    switch (instrument.toLowerCase()) {
      case 'piano': return <FaMusic />;
      case 'guitar': return <FaGuitar />;
      case 'vocals': return <FaMicrophone />;
      case 'drums': return <FaDrum />;
      case 'production': return <FaCompactDisc />;
      default: return <FaMusic />;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-bg via-dark-secondary/20 to-dark-secondary/40 py-8 md:py-16 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-nova-neon/10 rounded-full blur-3xl" />
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-mesh-gradient opacity-5" />
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Page Header */}
        <div className="text-center mb-12 md:mb-20 px-4">
          <div className="inline-flex items-center gap-2 md:gap-3 mb-6 px-4 md:px-6 py-2 md:py-3 glass rounded-full border border-primary/20">
            <FaMusic className="text-nova-neon text-sm md:text-base" />
            <span className="text-nova-neon font-medium text-sm md:text-base">ETERNOTES Music Club</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-nova-neon via-white to-primary mb-4 md:mb-6 leading-tight">
            Our Musicians
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-text max-w-3xl mx-auto leading-relaxed">
            Our dedicated group members who make ETERNOTES Music Club special
          </p>
          
          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-nova-neon/50" />
            <FaMusic className="text-nova-neon/60 text-xs" />
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-nova-neon/50" />
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-4">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={activeTab === tab.key}
              onClick={handleTabChange}
            />
          ))}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-nova-neon">
              <div className="w-8 h-8 border-4 border-nova-neon border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl">Loading artists...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 text-xl mb-4">{error}</p>
            <button
              onClick={fetchArtists}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : currentArtists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
            {currentArtists.map((artist, index) => (
              <div
                key={artist.id}
                className="modern-card p-6 md:p-8 text-center relative overflow-hidden group hover:shadow-2xl transition-all duration-300 opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-nova-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 relative bg-gray-800 ring-4 ring-primary/20 group-hover:ring-nova-neon/40 transition-all duration-300">
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-nova-neon text-lg">
                      {getInstrumentIcon(artist.instrument)}
                    </div>
                    <span className="text-nova-neon/80 text-sm uppercase tracking-wider">
                      {artist.instrument}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-heading mb-2 text-accent group-hover:text-nova-neon transition-colors duration-300">
                  {artist.name}
                </h3>
                
                <p className="text-primary/80 font-medium text-sm mb-3">
                  {artist.genre} • {artist.year}
                </p>
                
                <p className="text-gray-text leading-relaxed text-sm mb-4">
                  {artist.bio}
                </p>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-sm ${
                        i < artist.rating ? 'text-nova-neon' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  {artist.social.instagram && (
                    <a
                      href={artist.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <FaInstagram className="text-sm" />
                    </a>
                  )}
                  {artist.social.spotify && (
                    <a
                      href={artist.social.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <FaSpotify className="text-sm" />
                    </a>
                  )}
                  {artist.social.youtube && (
                    <a
                      href={artist.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <FaYoutube className="text-sm" />
                    </a>
                  )}
                  {artist.social.website && (
                    <a
                      href={artist.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-gradient-to-br from-nova-neon to-primary text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <FaGlobe className="text-sm" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-96">
            <div className="modern-card p-12 md:p-16 max-w-2xl mx-auto text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-nova-neon to-primary rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg shadow-nova-neon/30">
                <FaMusic className="text-3xl md:text-4xl text-white" />
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary mb-4 md:mb-6">
                We Are Recruiting Soon!
              </h3>
              
              <p className="text-lg md:text-xl text-gray-text leading-relaxed mb-6 md:mb-8">
                Stay tuned for updates on our upcoming recruitment process.<br />
                Join ETERNOTES Music Club and become part of our musical family!
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

export default Artists;