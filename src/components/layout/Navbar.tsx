'use client';

import { useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/layout/Searchbar';
import { HiMenu } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#FEF6F3] px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo - Luôn hiển thị và co giãn hợp lý */}
        <div className="flex-shrink-0 min-w-[120px] sm:min-w-[150px] md:min-w-[200px]">
          <Image
            src="/images/header/logothiepcuoi.png"
            alt="Logo"
            width={200}
            height={50}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Search bar - Hiển thị trên tablet/desktop */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-6 text-[17px] whitespace-nowrap">
          <a href="#" className="text-black !no-underline hover:!underline">
            Trang chủ
          </a>
          <a href="#" className="text-black !no-underline hover:!underline">
            Tạo thiệp
          </a>
          <a href="#" className="text-black !no-underline hover:!underline">
            Kho mẫu
          </a>
          <a href="#" className="text-black !no-underline hover:!underline">
            Liên hệ
          </a>
          <a href="#" className="text-black !no-underline hover:!text-red-500 ml-6">
            Sign up
          </a>
          <a href="#" className="text-black !no-underline hover:!text-red-500 font-medium">
            Login
          </a>
        </nav>

        {/* Hamburger menu - Hiển thị trên mobile/tablet */}
        <div className="flex md:hidden items-center gap-4">
          {/* Search icon cho mobile (optional) */}
          <button
            className="sm:hidden"
            onClick={() => {
              /* Logic mở search */
            }}
          >
            {/* Icon search */}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-3xl text-black"
          >
            {isMenuOpen ? <IoCloseOutline /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 px-4 flex flex-col gap-4 text-[16px] border-t border-gray-200 pt-4">
          {/* Search bar trong mobile menu (nếu cần) */}
          <div className="sm:hidden w-full">
            <SearchBar />
          </div>
          <a href="#" className="text-black !no-underline hover:!underline">
            Trang chủ
          </a>
          <a href="#" className="text-black !no-underline hover:!underline">
            Tạo thiệp
          </a>
          <a href="#" className="text-black !no-underline hover:!underline">
            Kho mẫu
          </a>
          <a href="#" className="text-black !no-underline hover:!underline">
            Liên hệ
          </a>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-black !no-underline hover:!text-red-500">
              Sign up
            </a>
            <a href="#" className="text-black !no-underline hover:!text-red-500 font-medium">
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
