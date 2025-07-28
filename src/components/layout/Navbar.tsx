'use client';

import Image from 'next/image';
import SearchBar from '@/components/layout/Searchbar';

export default function Header() {
  return (
    <header className="bg-[#FEF6F3] px-6 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 flex-nowrap">
        {/* Logo + Tên */}
        <div className="flex items-center gap-3 min-w-[220px]">
          <Image
            src="/images/header/THIỆP CƯỚI ONLINE LOGO-02.png"
            alt="Logo"
            width={300}
            height={45}
          />
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-md mx-6">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-[17px] whitespace-nowrap">
          {/* Main nav links with black underline on hover */}
          <a
            href="#"
            className="text-black hover:text-black relative pb-1 transition-colors duration-200 hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
            style={{ textDecoration: 'none' }}
          >
            Trang chủ
          </a>
          <a
            href="#"
            className="text-black hover:text-black relative pb-1 transition-colors duration-200 hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
            style={{ textDecoration: 'none' }}
          >
            Tạo thiệp
          </a>
          <a
            href="#"
            className="text-black hover:text-black relative pb-1 transition-colors duration-200 hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
            style={{ textDecoration: 'none' }}
          >
            Kho mẫu
          </a>
          <a
            href="#"
            className="text-black hover:text-black relative pb-1 transition-colors duration-200 hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black"
            style={{ textDecoration: 'none' }}
          >
            Liên hệ
          </a>

          {/* Sign up and Login - red text on hover, no underline */}
          <a
            href="#"
            className="text-black hover:text-red-500 ml-6 transition-colors duration-200 pb-1"
            style={{ textDecoration: 'none' }}
          >
            Sign up
          </a>
          <a
            href="#"
            className="text-black hover:text-red-500 font-medium transition-colors duration-200 pb-1"
            style={{ textDecoration: 'none' }}
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
