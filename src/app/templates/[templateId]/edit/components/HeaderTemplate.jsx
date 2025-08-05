import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#fef8f6] border-b border-gray-200 text-sm font-sans border-1">
      {/* Zoom */}
      <div className="text-gray-600 font-medium">Zoom: 100%</div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <span className="px-4 py-2 border-2 border-transparent hover:border-red-500 hover:text-red-700 rounded-full transition duration-300">
          Lưu Thiệp
        </span>
        <button className="px-4 py-2 border-2 border-transparent hover:border-red-500 hover:text-red-700 rounded-full transition duration-300">
          Chia sẻ thiệp
        </button>
      </div>
    </header>
  );
};

export default Header;
