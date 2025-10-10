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
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        
        <div className="flex h-full">
          {/* Left Column */}
          <div className="w-24 h-full border-l border-r border-white flex flex-col items-center justify-center relative">
            <div className="absolute top-16 w-1 h-12 bg-white"></div>
            <nav>
                <div className="space-y-24">
                    {navigationItems.map((item) => (
                        <a key={item.name} href={item.href} className="block text-xl font-medium text-white hover:text-gray-300 transition-colors duration-200 transform -rotate-90">
                            {item.name.toLowerCase()}
                        </a>
                    ))}
                </div>
            </nav>
            <div className="absolute bottom-16 w-8 h-8 rounded-full border border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4l10 6-10 6V4z" />
                </svg>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 h-full border-r border-white flex flex-col items-center justify-between py-16">
              <div className="transform -rotate-90 whitespace-nowrap">
                  <span className="text-sm tracking-[0.3em]">INFAMOUS CUSTOMS</span>
              </div>
              
              <div className="w-24 h-24 text-white">
                  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M32 2 C16 20, 16 50, 32 62 C48 50, 48 20, 32 2 Z"></path>
                      <path d="M32 12 C24 25, 24 45, 32 52 C40 45, 40 25, 32 12 Z"></path>
                      <path d="M26 48 C28 42, 36 42, 38 48"></path>
                      <path d="M32 52 C30 56, 34 56, 32 52"></path>
                      <path d="M28 20 C24 28, 26 36, 32 38"></path>
                      <path d="M36 20 C40 28, 38 36, 32 38"></path>
                  </svg>
              </div>

              <div></div>
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