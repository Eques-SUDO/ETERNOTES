import React, { useEffect, useState, useMemo } from 'react';
import '../../styles/music-decorations.css';
import { useReducedMotion, useDevicePerformance } from '../../hooks/useReducedMotion';

const MusicDecorations: React.FC = () => {
  const [decorations, setDecorations] = useState<JSX.Element[]>([]);
  const reducedMotion = useReducedMotion();
  const isLowEnd = useDevicePerformance();

  useEffect(() => {
    // Skip decorations entirely if user prefers reduced motion
    if (reducedMotion) {
      setDecorations([]);
      return;
    }

    const elements: JSX.Element[] = [];
    
    // Reduce number of animations based on device performance
    const noteCount = isLowEnd ? 3 : 5;
    const decorationScale = isLowEnd ? 0.3 : 0.6;
    
    // Add floating music notes at random positions (reduced count)
    for (let i = 0; i < noteCount; i++) {
      elements.push(
        <div
          key={`note-${i}`}
          className={`music-note note-${(i % 6) + 1}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      );
    }

    // Add sound waves (reduced for performance)
    if (!isLowEnd) {
      for (let i = 0; i < 2; i++) {
        elements.push(
          <div
            key={`wave-${i}`}
            className="sound-wave"
            style={{
              top: `${20 + i * 40}%`,
              left: i % 2 === 0 ? '10%' : '85%',
              animationDelay: `${i * 2}s`
            }}
          />
        );
      }
    }

    // Add vinyl records (only one for low-end devices)
    if (!isLowEnd) {
      elements.push(
        <div
          key="vinyl-1"
          className="vinyl-record"
          style={{
            top: '15%',
            right: '5%',
            transform: `scale(${decorationScale * 0.7})`
          }}
        />
      );
    }

    // Skip piano keys for low-end devices (complex animation)

    // Skip guitar strings for low-end devices

    // Add single treble clef
    if (!isLowEnd) {
      elements.push(
        <div
          key="clef-1"
          className="treble-clef"
          style={{
            top: '25%',
            left: '15%'
          }}
        />
      );
    }

    // Add single equalizer for performance
    if (!isLowEnd) {
      elements.push(
        <div
          key="eq-1"
          className="equalizer"
          style={{
            top: '60%',
            right: '8%'
          }}
        >
          <div className="eq-bar" />
          <div className="eq-bar" />
          <div className="eq-bar" />
        </div>
      );
    }

    // Skip microphones and headphones for low-end devices

    // Add single musical staff for subtle effect
    elements.push(
      <div
        key="staff-1"
        className="musical-staff"
        style={{
          top: '20%',
          transform: 'rotate(-1deg)',
          opacity: 0.02
        }}
      >
        <div className="musical-staff-line" />
        <div className="musical-staff-line" />
        <div className="musical-staff-line" />
      </div>
    );

    setDecorations(elements);
  }, [reducedMotion, isLowEnd]);

  return (
    <div className="music-decorations-container">
      {decorations}
    </div>
  );
};

export default MusicDecorations;