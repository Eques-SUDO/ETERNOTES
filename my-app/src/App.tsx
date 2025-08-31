import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Events = lazy(() => import('./pages/Events'));
const Artists = lazy(() => import('./pages/Artists'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-bg">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-nova-neon border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-nova-neon">Loading...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      {/* Optimized Background Elements */}
      <div className="musical-staff-bg"></div>
      <div className="nova-constellation"></div>
      
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;