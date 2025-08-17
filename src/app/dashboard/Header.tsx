'use client';

import Image from 'next/image';
import { Menu, UserCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#FEF6F3] px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo + Tên */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/header/THIỆP CƯỚI ONLINE LOGO-02.png"
            alt="Logo"
            width={180}
            height={150}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Tạo thiệp + icon */}
        <div className="flex items-center gap-4 text-[#2C2C2C] font-inter">
          <a href="#" className="text-[15px]">
            Tạo Thiệp
          </a>
          <UserCircle className="w-6 h-6" />
          <Menu className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
}
