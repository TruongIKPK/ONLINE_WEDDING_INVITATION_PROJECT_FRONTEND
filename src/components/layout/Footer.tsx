'use client';

import Image from 'next/image';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { SiZalo, SiMessenger } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-[#FEF6F3] text-[#2C2C2C] py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + Description */}
        <div className="flex flex-col gap-4 max-w-xs">
          <Image
            src="/images/THIỆP CƯỚI ONLINE LOGO-02.png"
            alt="Logo"
            width={900}
            height={100}
            className="object-contain"
          />
          <p className="text-sm text-gray-500">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
            consequat.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-lg">
          {/* Thông tin liên hệ */}
          <div>
            <h4 className="font-semibold mb-2">Thông tin liên hệ</h4>
            <p>Điện thoại: 0704500354</p>
            <p>Email: thiepcuoionline.com</p>
          </div>

          {/* Tin tức */}
          <div>
            <h4 className="font-semibold mb-2">Tin tức</h4>
            <p>Blog</p>
            <p>Câu hỏi thường gặp</p>
            <p>Hướng dẫn nhanh</p>
          </div>

          {/* Danh mục */}
          <div>
            <h4 className="font-semibold mb-2">Danh mục</h4>
            <p>Trang chủ</p>
            <p>Tạo thiệp</p>
            <p>Kho mẫu</p>
            <p>Liên hệ</p>
          </div>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-start gap-3">
          <h4 className="font-semibold text-lg">Connect with us</h4>
          <div className="flex gap-3 text-2xl">
            <FaFacebook className="hover:scale-110 cursor-pointer" />
            <SiZalo className="hover:scale-110 cursor-pointer" />
            <SiMessenger className="hover:scale-110 cursor-pointer" />
            <FaTiktok className="hover:scale-110 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
