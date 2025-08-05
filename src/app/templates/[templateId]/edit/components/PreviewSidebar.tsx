'use client';

import React, { useState } from 'react';
import { FaDesktop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const PreviewSidebar = () => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="flex flex-col items-center h-full bg-[#fef8f6]">
      {/* Thumbnail Scrollable */}
      <div className="flex-1 overflow-y-auto w-full px-1">
        <div className="w-full shadow-md overflow-hidden">
          <img
            src="/images/templates/image 17.png"
            alt="Full preview"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Device Switcher */}
      <div className="flex items-center justify-center space-x-2 mt-4 mb-2">
        <button
          className={`p-2 rounded-lg border ${
            activeDevice === 'desktop' ? 'bg-gray-200 border-gray-400' : 'border-transparent'
          }`}
          onClick={() => setActiveDevice('desktop')}
        >
          <FaDesktop className="text-red-700 text-lg" />
        </button>
        <button
          className={`p-2 rounded-lg border ${
            activeDevice === 'tablet' ? 'bg-gray-200 border-gray-400' : 'border-transparent'
          }`}
          onClick={() => setActiveDevice('tablet')}
        >
          <FaTabletAlt className="text-red-700 text-lg" />
        </button>
        <button
          className={`p-2 rounded-lg border ${
            activeDevice === 'mobile' ? 'bg-gray-200 border-gray-400' : 'border-transparent'
          }`}
          onClick={() => setActiveDevice('mobile')}
        >
          <FaMobileAlt className="text-red-700 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default PreviewSidebar;
