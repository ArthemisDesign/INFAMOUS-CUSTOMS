import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Globe2, Menu, X } from 'lucide-react';
import Lenis from 'lenis';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activePage, setActivePage] = useState('about');
  const [activeSubsection, setActiveSubsection] = useState('');
  const mainContentRef = useRef(null);

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
    contact: [
      { name: 'client form', href: '#client-form' }
    ]
  };

  const visualizingImages = {
    '#spyder': '/SPYDER/spyder_title.png',
    '#sv-hermes': '/SV/sv.png',
    '#rr-bolshoi': '/RR/RR.png'
  };

  useEffect(() => {
    // Set initial subsection
    const subsection = pageSubsections[activePage][0];
    setActiveSubsection(subsection ? subsection.href : '');

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      wrapper: mainContentRef.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const handleScroll = (e) => {
      if (!mainContentRef.current) return;

      const { scrollHeight, clientHeight } = mainContentRef.current;
      const scrollTop = e.scroll;

      // Icon rotation logic
      const rotationValue = -(scrollTop / 10);
      setRotation(rotationValue);

      // Subsection selection logic
      const scrollBottom = scrollTop + clientHeight;

      // Check if scrolled to the very bottom
      if (scrollBottom >= scrollHeight - 5) { // 5px threshold
        const lastSubsection = pageSubsections[activePage][pageSubsections[activePage].length - 1];
        if (lastSubsection) {
          setActiveSubsection(lastSubsection.href);
        }
        return;
      }

      let currentSubsection = '';
      const threshold = window.innerHeight / 3;

      for (const subsection of pageSubsections[activePage]) {
        const element = document.querySelector(subsection.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentSubsection = subsection.href;
          }
        }
      }

      if (currentSubsection) {
        setActiveSubsection(currentSubsection);
      } else if (pageSubsections[activePage].length > 0) {
        setActiveSubsection(pageSubsections[activePage][0].href);
      }
    };
    
    lenis.on('scroll', handleScroll);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Initial check
    if (mainContentRef.current) {
        handleScroll({ scroll: mainContentRef.current.scrollTop });
    }

    return () => {
      lenis.destroy();
    };
  }, [activePage]);

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
        const activeVisualizingIndex = pageSubsections.visualizing.findIndex(item => item.href === activeSubsection);
        return (
          <section id="visualizing" className="bg-black text-white">
            {/* Sticky container for image and selector */}
            <div className="h-screen w-full sticky top-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-3/4 flex items-center justify-center space-x-8">
                {/* Image Container */}
                <div className="w-full h-full relative">
                  {Object.entries(visualizingImages).map(([href, src]) =>
                    src && (
                      <img
                        key={src}
                        src={src}
                        alt={href.substring(1)}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${activeSubsection === href ? 'opacity-100' : 'opacity-0'}`}
                      />
                    )
                  )}
                </div>
                {/* Selector */}
                <div className="flex flex-col space-y-4 pointer-events-auto">
                  {pageSubsections.visualizing.map((item, index) => (
                    <button
                      key={item.href}
                      onClick={() => {
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className={`h-0.5 rounded-full transition-all duration-500 ease-in-out ${
                        index === activeVisualizingIndex
                          ? 'w-24 bg-white'
                          : 'w-16 bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="relative">
              <div id="spyder" className="h-screen" />
              <div id="sv-hermes" className="h-screen" />
              <div id="rr-bolshoi" className="h-screen" />
            </div>
          </section>
        );
      case 'contact':
        return (
          <section id="contact">
            <div id="client-form" className="h-screen bg-black text-white flex items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold">Client Form</h2>
            </div>
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
          <div className="w-20 h-full border-r border-white relative">
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -rotate-90 whitespace-nowrap">
                  <span className="text-sm tracking-[0.3em]">INFAMOUS CUSTOMS</span>
              </div>
              
              <div className="absolute top-1/2 left-1/2 w-12 h-12 text-white" style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}>
                  <img src="/scroll.svg" alt="Infamous Customs Logo" />
              </div>
          </div>

          {/* Rightmost Column */}
          <div className="flex-1 h-full border-r border-white flex flex-col items-center justify-center text-center relative py-24">
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-24 h-24 text-white">
                <img src="/Loggo.svg" alt="Infamous Customs Logo" />
            </div>
            <div className="space-y-6">
              {pageSubsections[activePage].map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className={`block transition-all duration-300 pb-1 border-b-2 ${
                    item.href === activeSubsection 
                      ? 'text-lg font-semibold text-white border-white' 
                      : 'text-md text-gray-400 hover:text-white border-transparent'
                  }`}
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
      <div ref={mainContentRef} className="flex-1 flex flex-col bg-black lg:ml-80 h-screen overflow-y-auto">
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