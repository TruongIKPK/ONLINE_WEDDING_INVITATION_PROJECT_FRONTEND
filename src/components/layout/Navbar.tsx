'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/layout/Searchbar';
import { HiMenu } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= 670);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-[#FEF6F3] px-4 py-0 shadow-sm" style={{ minHeight: '90px' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex-shrink-0 min-w-[100px] sm:min-w-[120px]">
          <Image
            src="/images/header/logothiepcuoi.png"
            alt="Logo"
            width={200}
            height={50}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* SearchBar - ẩn khi màn <= 670px */}
        <div className="flex-1 flex justify-center max-w-full xs:max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-none max-[670px]:hidden">
          <SearchBar />
        </div>

        {/* Navigation - ẩn khi màn <= 670px */}
        <nav
          className="hidden lg:flex items-center
            gap-4 xl:gap-5 2xl:gap-6
            text-[15px] xl:text-[16px] 2xl:text-[17px]
            max-[670px]:hidden"
        >
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
        </nav>

        {/* Icon menu - luôn hiện khi màn ≤ 670px */}
        <div className="flex items-center flex-shrink-0 max-[670px]:block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-2xl"
          >
            {isMenuOpen ? <IoCloseOutline size={54} /> : <HiMenu size={54} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="lg:hidden max-[670px]:block mt-3 px-4 py-4 flex flex-col gap-3 text-[16px] border-t border-gray-200 bg-white w-full shadow-md">
          {isMobileView && (
            <div className="flex justify-center items-center py-3 pt-0 border-b border-gray-200">
              <SearchBar />
            </div>
          )}
          <div className="flex flex-col gap-3 text-[16px]">
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
        </div>
      )}
    </header>
  );
}
