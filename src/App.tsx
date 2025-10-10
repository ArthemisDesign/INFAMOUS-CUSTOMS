import React, { useState } from 'react';
import { ArrowRight, Globe2, Menu, X } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { name: 'ABOUT', href: '#about' },
    { name: 'VISUALIZING', href: '#visualizing' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-transparent text-white transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Three vertical lines */}
        <div className="absolute left-0 top-0 bottom-0 w-full flex">
          {/* Left line */}
          <div className="w-1 bg-white"></div>
          
          {/* Middle line - main sidebar content */}
          <div className="w-16 bg-transparent relative">
            {/* Company name rotated */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -rotate-90 origin-center">
              <span className="text-sm font-bold tracking-wider">INFAMOUS CUSTOMS</span>
            </div>
            
            {/* Winged logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 border border-white relative">
                {/* Winged creature logo */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                <div className="absolute top-1 right-1/2 transform translate-x-1/2 w-0 h-0 border-r-[8px] border-r-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                <div className="absolute bottom-1 right-1/2 transform translate-x-1/2 w-0 h-0 border-r-[6px] border-r-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
              </div>
            </div>
            
            {/* Navigation items - centered vertically and aligned right */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 space-y-24">
              {navigationItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block text-xl font-medium text-white hover:text-gray-300 transition-colors duration-200 transform -rotate-90 origin-center ${
                    index === 0 ? 'border-b border-white pb-1' : ''
                  }`}
                >
                  {item.name.toLowerCase()}
                </a>
              ))}
            </div>
          </div>
          
          {/* Right line - content separator */}
          <div className="w-1 bg-white"></div>
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
      <div className="flex-1 flex flex-col bg-black">
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

        {/* Hero Section */}
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
    </div>
  );
}

export default App;