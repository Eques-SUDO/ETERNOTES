import React, { useState, useEffect } from 'react';

const AnnouncementPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Always show popup on page load/refresh
    setTimeout(() => setIsOpen(true), 1000);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative max-w-2xl w-full glass border-2 border-nova-neon/50 rounded-2xl p-8 shadow-2xl shadow-nova-neon/30 animate-slideUp">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
        >
          ×
        </button>

        <div className="text-center">
          <img
            src="/eternity.png"
            alt="ETERNOTES Logo"
            className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-nova-neon/50 shadow-lg shadow-nova-neon/30"
          />

          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-neon to-primary mb-4">
            🎤 AUDITIONS ANNOUNCEMENT
          </h2>

          <div className="text-white space-y-4 mb-6">
            <p className="text-xl font-semibold">
              ETERNOTES Music Club is holding auditions!
            </p>

            <div className="flex flex-col gap-3 text-left max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-nova-neon flex-shrink-0">📅</span>
                <span>This Saturday, September 27th</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-nova-neon flex-shrink-0">🕐</span>
                <span>1:00 PM - 5:00 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-nova-neon flex-shrink-0">📍</span>
                <span>Faculty of Sciences, Rabat</span>
              </div>
            </div>

            <p className="text-lg mt-4">
              All singers, instrumentalists, producers, and performers welcome!<br />
              Show us your talent and join our musical family! 🎵
            </p>
          </div>

          <button
            onClick={handleClose}
            className="btn-primary px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform"
          >
            Got it, I'll be there!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPopup;