import React, { useState, useEffect } from 'react';
import { ArrowRight, Globe2, Menu, X } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activePage, setActivePage] = useState('about');

  const navigationItems = [
    { name: 'ABOUT', page: 'about', align: 'start' },
    { name: 'VISUALIZING', page: 'visualizing', align: 'center' },
    { name: 'CONTACT', page: 'contact', align: 'end' }
  ];

  const pageSubsections = {
    about: [
      { name: 'about me', href: '#about-me' },
      { name: 'gallery', href: '#gallery' },
      { name: 'videos', href: '#videos' }
    ],
    visualizing: [
      { name: 'spyder', href: '#spyder' },
      { name: 'sv-hermes', href: '#sv-hermes' },
      { name: 'RR-Bolshoi', href: '#rr-bolshoi' }
    ],
    contact: []
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotationValue = -(scrollY / 10);
      setRotation(rotationValue);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'about':
        return (
          <section id="about">
            {/* "about me" subsection */}
            <div id="about-me">
              <header className="bg-black text-white h-screen flex flex-col">
                <div className="container mx-auto px-6 flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl md:text-8xl font-bold">
                      INFAMOUS CUSTOMS
                    </h1>
                  </div>
                </div>
              </header>
              <section className="h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-5xl md:text-7xl font-light tracking-widest">
                    welcome to
                    <br />
                    <span className="font-bold">INFAMOUS CUSTOMS</span>
                  </h2>
                </div>
              </section>
            </div>
            {/* "gallery" subsection */}
            <section id="gallery" className="h-screen bg-black text-white flex items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold">Gallery</h2>
            </section>
            {/* "videos" subsection */}
            <section id="videos" className="h-screen bg-black text-white flex items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold">Videos</h2>
            </section>
          </section>
        );
      case 'visualizing':
        return (
          <section id="visualizing" className="min-h-screen bg-black text-white">
            <div id="spyder" className="h-screen flex items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold">spyder</h2>
            </div>
            <div id="sv-hermes" className="h-screen flex items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold">sv-hermes</h2>
            </div>
            <div id="rr-bolshoi" className="h-screen flex items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold">RR-Bolshoi</h2>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section id="contact" className="h-screen bg-black text-white flex items-center justify-center">
            <h2 className="text-5xl md:text-7xl font-bold">Contact</h2>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 h-screen w-80 bg-black text-white transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        <div className="flex h-full">
          {/* Left Column */}
          <div className="w-28 h-full border-r border-white flex flex-col justify-center relative">
            <nav>
                <div className="space-y-24 flex flex-col">
                    {navigationItems.map((item) => (
                        <button key={item.name} onClick={() => setActivePage(item.page)} className={`self-${item.align} block text-xl font-medium text-white hover:text-gray-300 transition-colors duration-200 transform -rotate-90 bg-transparent border-none`}>
                            {item.name.toLowerCase()}
                        </button>
                    ))}
                </div>
            </nav>
          </div>

          {/* Middle Column */}
          <div className="w-20 h-full border-r border-white flex flex-col items-center justify-between py-24">
              <div className="transform -rotate-90 whitespace-nowrap">
                  <span className="text-sm tracking-[0.3em]">INFAMOUS CUSTOMS</span>
              </div>
              
              <div className="w-12 h-12 text-white" style={{ transform: `rotate(${rotation}deg)` }}>
                  <img src="/scroll.svg" alt="Infamous Customs Logo" />
              </div>

              <div></div>
          </div>

          {/* Rightmost Column */}
          <div className="flex-1 h-full border-r border-white flex flex-col items-center justify-center text-center relative py-24">
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-24 h-24 text-white">
                <img src="/Loggo.svg" alt="Infamous Customs Logo" />
            </div>
            <div>
              {pageSubsections[activePage].map((item, index) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className={`block ${index === 0 ? 'text-lg font-semibold text-white border-b-2 border-white pb-1' : 'mt-6 text-md text-gray-400 hover:text-white'}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-black lg:ml-80">
        {/* Top bar */}
        <div className="bg-black border-b border-white/20 px-6 py-4 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white hover:text-gray-300"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Globe2 className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">CompanyName</span>
          </div>
          <div></div>
        </div>

        {renderContent()}

      </div>
    </div>
  );
}

export default App;