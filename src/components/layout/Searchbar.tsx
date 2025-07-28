'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center w-full max-w-md px-4 py-3 rounded-2xl border transition-all ${
        isFocused ? 'border-[#1e1e1e] bg-[#fdf3ef]' : 'border-[#ccc] bg-[#fdf3ef]'
      }`}
    >
      <Search className={`w-5 h-5 mr-3 ${isFocused ? 'text-black' : 'text-gray-400'}`} />
      <input
        type="text"
        placeholder="Search bar"
        className={`w-full bg-transparent outline-none text-base transition-all ${
          isFocused ? 'text-black font-medium' : 'text-gray-400'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
