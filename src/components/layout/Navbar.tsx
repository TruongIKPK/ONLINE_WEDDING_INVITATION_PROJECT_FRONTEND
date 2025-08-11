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
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image src="/images/header/logothiepcuoi.png" alt="Logo" width={150} height={35} />
        </div>

        {/* Hamburger và Close icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? (
              <IoCloseOutline className="text-3xl text-black" />
            ) : (
              <HiMenu className="text-3xl text-black" />
            )}
          </button>
        </div>

        {/* Search bar và Navigation desktop */}
        <div className="hidden md:flex items-center gap-6 flex-1">
          {/* Search bar: hiện trên desktop */}
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>

          <nav className="flex items-center gap-6 text-[17px] whitespace-nowrap">
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
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 px-4 flex flex-col gap-4 text-[16px] border-t border-gray-200 pt-4">
          {/* Search bar trong mobile menu */}
          <div className="w-full">
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
          <a href="#" className="text-black !no-underline hover:!text-red-500">
            Sign up
          </a>
          <a href="#" className="text-black !no-underline hover:!text-red-500 font-medium">
            Login
          </a>
        </div>
      )}
    </header>
  );
}
