import React, { useState, useMemo, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaMusic, FaCamera, FaUsers, FaGuitar, FaMicrophone, FaCalendarAlt } from 'react-icons/fa';

interface GalleryImage {
  id: number;
  src: string;
  category: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

interface Category {
  value: string;
  label: string;
}

// Memoized category button component
const CategoryButton = React.memo(({ cat, category, index, onClick, getCategoryIcon }: {
  cat: Category;
  category: string;
  index: number;
  onClick: (value: string) => void;
  getCategoryIcon: (cat: string) => React.ReactNode;
}) => (
  <button
    onClick={() => onClick(cat.value)}
    className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base flex items-center gap-2 md:gap-3 ${
      category === cat.value
        ? 'bg-gradient-to-r from-nova-neon to-primary text-white shadow-lg shadow-nova-neon/30 border-2 border-nova-neon/50'
        : 'glass border border-primary/30 text-accent hover:border-nova-neon hover:shadow-lg hover:bg-primary/10'
    }`}
  >
    <span className="text-nova-neon text-sm md:text-base">{getCategoryIcon(cat.value)}</span>
    {cat.label}
  </button>
));

// Memoized gallery card component
const GalleryCard = React.memo(({ image, index, onClick }: {
  image: GalleryImage;
  index: number;
  onClick: (image: GalleryImage) => void;
}) => {
  const getCategoryIcon = useCallback((cat: string) => {
    switch (cat) {
      case 'events': return <FaMusic />;
      case 'sessions': return <FaUsers />;
      case 'workshops': return <FaGuitar />;
      case 'campus': return <FaCamera />;
      case 'practice': return <FaMicrophone />;
      case 'social': return <FaCalendarAlt />;
      default: return <FaMusic />;
    }
  }, []);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] opacity-0 animate-fadeIn ${
        index % 7 === 0 ? 'lg:col-span-2 lg:row-span-2' : 
        index % 5 === 0 ? 'lg:row-span-2' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onClick(image)}
    >
      <div className={`${index % 7 === 0 ? 'aspect-video' : 'aspect-square'} overflow-hidden relative`}>
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
        />
        
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* Category badge */}
          <div className="absolute top-3 md:top-4 left-3 md:left-4">
            <span className="px-2 md:px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-nova-neon to-primary text-white shadow-lg flex items-center gap-1 md:gap-2">
              {getCategoryIcon(image.category)}
              <span className="hidden md:inline">{image.category}</span>
            </span>
          </div>
          
          {/* Expand icon */}
          <div className="absolute top-3 md:top-4 right-3 md:right-4 w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center text-nova-neon opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
            <FaExpand className="text-xs md:text-sm" />
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4">
            <h3 className="text-base md:text-lg font-bold font-heading mb-1 md:mb-2 text-white group-hover:text-nova-neon transition-colors duration-300">
              {image.title}
            </h3>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-xs md:text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-nova-neon" />
                {image.date}
              </span>
              <span className="flex items-center gap-1">
                <FaCamera className="text-nova-neon" />
                {image.location}
              </span>
            </div>
            <p className="text-gray-light text-xs md:text-sm mt-1 md:mt-2 opacity-90 line-clamp-2">
              {image.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

const Gallery: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const images: GalleryImage[] = useMemo(() => [], []);

  const categories: Category[] = useMemo(() => [
    { value: 'all', label: 'All Photos' },
    { value: 'events', label: 'Concert Events' },
    { value: 'sessions', label: 'Jam Sessions' },
    { value: 'workshops', label: 'Workshops' },
    { value: 'campus', label: 'Campus Life' },
    { value: 'practice', label: 'Practice & Recording' },
    { value: 'social', label: 'Social Events' }
  ], []);

  const filteredImages = useMemo(() => {
    return category === 'all' 
      ? images 
      : images.filter(img => img.category === category);
  }, [category, images]);

  const handlePrevious = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
  }, [selectedImage, filteredImages]);

  const handleNext = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredImages[nextIndex]);
  }, [selectedImage, filteredImages]);

  const getCategoryIcon = useCallback((cat: string) => {
    switch (cat) {
      case 'events': return <FaMusic />;
      case 'sessions': return <FaUsers />;
      case 'workshops': return <FaGuitar />;
      case 'campus': return <FaCamera />;
      case 'practice': return <FaMicrophone />;
      case 'social': return <FaCalendarAlt />;
      default: return <FaMusic />;
    }
  }, []);

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
  }, []);

  const handleImageClick = useCallback((image: GalleryImage) => {
    setSelectedImage(image);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
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
            Photo Gallery
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-text max-w-3xl mx-auto leading-relaxed">
            Capturing memories from our musical journey at the university
          </p>
          
          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-2 mt-6 md:mt-8">
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-nova-neon/50" />
            <FaMusic className="text-nova-neon/60 text-xs" />
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-nova-neon/50" />
          </div>
        </div>

        {/* Enhanced Category Filter */}
        <div className="modern-card p-4 md:p-6 mb-12 md:mb-16 mx-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3 text-nova-neon">
              <FaCamera className="text-base md:text-lg" />
              <span className="font-semibold text-base md:text-lg">Filter Photos:</span>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              {categories.map((cat, index) => (
                <CategoryButton
                  key={cat.value}
                  cat={cat}
                  category={category}
                  index={index}
                  onClick={handleCategoryChange}
                  getCategoryIcon={getCategoryIcon}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4">
            {filteredImages.map((image, index) => (
              <GalleryCard
                key={image.id}
                image={image}
                index={index}
                onClick={handleImageClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20 relative px-4">
            <div className="modern-card p-8 md:p-12 max-w-2xl mx-auto hover:shadow-2xl transition-shadow duration-300">
              <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-nova-neon to-primary rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg shadow-nova-neon/30">
                <FaCamera className="text-2xl md:text-3xl text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary mb-4 md:mb-6">
                Gallery Coming Soon
              </h3>
              <p className="text-lg md:text-xl text-gray-text leading-relaxed mb-6 md:mb-8">
                We're preparing an amazing collection of moments from our musical journey.<br />
                Check back soon for photos and videos!
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-nova-neon animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-xl transition-all duration-300"
            onClick={handleCloseModal}
          >
            <div
              className="relative max-w-6xl max-h-full transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />
              
              {/* Enhanced image info */}
              <div className="absolute bottom-0 left-0 right-0 glass bg-dark-secondary/90 rounded-b-2xl p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold font-heading mb-2 text-white">{selectedImage.title}</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-300 mb-3">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-nova-neon" />
                    {selectedImage.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCamera className="text-nova-neon" />
                    {selectedImage.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-nova-neon">{getCategoryIcon(selectedImage.category)}</span>
                    {selectedImage.category}
                  </span>
                </div>
                <p className="text-gray-light leading-relaxed text-sm md:text-base">{selectedImage.description}</p>
              </div>
            </div>
            
            {/* Enhanced Controls */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white text-lg md:text-xl hover:scale-110 hover:text-nova-neon transition-all duration-200"
            >
              <FaTimes />
            </button>
            
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white text-lg md:text-xl hover:scale-110 hover:text-nova-neon transition-all duration-200"
                >
                  <FaChevronLeft />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white text-lg md:text-xl hover:scale-110 hover:text-nova-neon transition-all duration-200"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;