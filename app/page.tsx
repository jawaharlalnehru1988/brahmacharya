import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import PathOfBhakti from './components/PathOfBhakti';
import CTA from './components/CTA';
import Footer from './components/Footer';

import ScripturalSupport from './components/ScripturalSupport';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Pillars />
        <PathOfBhakti />
        <ScripturalSupport />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
