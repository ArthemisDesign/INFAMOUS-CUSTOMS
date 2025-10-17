import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Globe2, Menu, X } from 'lucide-react';
import Lenis from 'lenis';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [activePage, setActivePage] = useState('about');
  const [activeSubsection, setActiveSubsection] = useState('');
  const mainContentRef = useRef(null);
  const lenisRef = useRef(null);

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

  const visualizingContent = {
    spyder: {
      title: 'SPYDER',
      subtitle: 'Turquoise Spyder — Designed 12/09/2025',
      image: '/SPYDER/spyder_title.png',
      number: '00.05',
      titleClassName: 'text-9xl',
    },
    'sv-hermes': {
      title: 'SV-HERMES',
      subtitle: 'SV-Hermes — Designed 10/15/2024',
      image: '/SV/sv.png',
      number: '00.06',
      titleClassName: 'text-8xl',
    },
    'rr-bolshoi': {
      title: 'RR-BOLSHOI',
      subtitle: 'RR-Bolshoi — Designed 08/21/2023',
      image: '/RR/RR.png',
      number: '00.07',
      titleClassName: 'text-8xl',
    },
  };

  useEffect(() => {
    if (activePage !== 'visualizing') return;

    const scrollContainer = mainContentRef.current;
    if (!scrollContainer || !lenisRef.current) return;

    let isWheeling = false;
    let wheelTimeout;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isWheeling) {
        return;
      }

      const subsections = pageSubsections.visualizing;
      const currentIndex = subsections.findIndex(s => s.href === activeSubsection);
      
      let nextIndex = currentIndex;
      if (e.deltaY > 1) { // Scroll down
        nextIndex = Math.min(currentIndex + 1, subsections.length - 1);
      } else if (e.deltaY < -1) { // Scroll up
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      if (nextIndex !== currentIndex) {
        isWheeling = true;
        const nextElement = document.querySelector(subsections[nextIndex].href);
        if (nextElement) {
          lenisRef.current?.scrollTo(nextElement);
        }
        
        wheelTimeout = setTimeout(() => {
          isWheeling = false;
        }, 400); // Lenis duration is now 0.4s
      }
    };
    
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };

  }, [activePage, activeSubsection]);

  useEffect(() => {
    // Set initial subsection
    const subsection = pageSubsections[activePage][0];
    setActiveSubsection(subsection ? subsection.href : '');

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      wrapper: mainContentRef.current,
      duration: 0.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

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
      lenisRef.current = null;
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
        const activeContentKey = activeSubsection.substring(1) || 'spyder';
        const activeContent = visualizingContent[activeContentKey];

        return (
          <section id="visualizing" className="bg-black text-white">
            <div className="h-screen w-full sticky top-0 flex items-stretch pointer-events-none py-8">
              
              {/* Left Column: Number and Line */}
              <div className="w-[12.5%] flex-shrink-0 flex flex-col items-center justify-center pointer-events-auto">
                <span className="text-lg">{activeContent.number}</span>
                <div className="w-full h-px bg-white mt-1"></div>
              </div>

              {/* Center Column: Photo and Content */}
              <div className="w-3/4 flex-shrink-0 h-full flex flex-col items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full flex-grow relative">
                        {Object.entries(visualizingContent).map(([key, content]) => (
                            <div 
                                key={key} 
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out ${activeSubsection === `#${key}` ? 'opacity-100' : 'opacity-0'}`}
                            >
                                <figure className="relative max-w-full max-h-full">
                                    <img 
                                        src={content.image} 
                                        alt={content.title} 
                                        className="block max-w-full max-h-full object-contain rounded-3xl" 
                                    />
                                    <figcaption className="absolute bottom-8 left-8 pointer-events-none">
                                        <h2 className={`${content.titleClassName} font-bold tracking-tighter text-white leading-none`}>
                                            {content.title}
                                        </h2>
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    </div>
                    {/* Subtitle and Button Below */}
                    <div className="text-center mt-4 pointer-events-auto flex-shrink-0">
                        <p className="text-lg">{activeContent.subtitle}</p>
                        <button className="mt-4 border border-white rounded-full px-6 py-2 text-xs font-semibold tracking-wider hover:bg-white hover:text-black transition-colors">
                            LEARN MORE
                        </button>
                    </div>
                </div>
              </div>

              {/* Right Column: Selector */}
              <div className="w-[12.5%] flex-shrink-0 flex items-center justify-center pointer-events-auto">
                <div className="flex flex-col space-y-4">
                  {pageSubsections.visualizing.map((item, index) => (
                      <button key={item.href} onClick={() => {
                          const element = document.querySelector(item.href);
                          if (element) { lenisRef.current?.scrollTo(element); }
                      }}
                      className={`h-0.5 rounded-full transition-all duration-500 ease-in-out ${
                          index === activeVisualizingIndex
                              ? 'w-16 bg-white'
                              : 'w-10 bg-gray-600 hover:bg-gray-400'
                      }`}/>
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