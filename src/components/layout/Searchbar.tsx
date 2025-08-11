'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center w-[432px] h-[35px] px-4 rounded-[12px] border transition-all ${
        isFocused ? 'border-[#1e1e1e] bg-[#fdf3ef]' : 'border-[#ccc] bg-[#fdf3ef]'
      }`}
      style={{
        top: '28px',
        left: '297px',
      }}
    >
      <Search className={`w-5 h-5 mr-3 ${isFocused ? 'text-black' : 'text-gray-400'}`} />
      <input
        type="text"
        placeholder="Search bar"
        className={`w-full bg-transparent outline-none text-base transition-all ${
          isFocused ? 'text-black font-medium' : 'text-gray-400'
        }`}
        style={{
          height: '100%',
          padding: '6px 0',
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
