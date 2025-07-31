'use client';

import { useState } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/layout/Searchbar';
import { HiMenu } from 'react-icons/hi'; // hoặc dùng bất kỳ icon nào

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#FEF6F3] px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-[180px]">
          <Image
            src="/images/header/THIỆP CƯỚI ONLINE LOGO-02.png"
            alt="Logo"
            width={200}
            height={45}
          />
        </div>

        {/* Search bar: ẩn trên mobile */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Hamburger: hiện trên mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <HiMenu className="text-3xl text-black" />
          </button>
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
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 px-4 flex flex-col gap-2 text-[16px]">
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
