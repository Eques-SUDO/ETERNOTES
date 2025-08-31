import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;