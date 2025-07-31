'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { SiZalo, SiMessenger } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-[#FEF6F3] text-[#2C2C2C] py-10 px-5 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-16">
        {/* Logo + Description */}
        <div className="flex-1 max-w-sm">
          <Image
            src="/images/THIỆP CƯỚI ONLINE LOGO-02.png"
            alt="Logo"
            width={900}
            height={100}
            className="object-contain"
          />
          <p className="text-sm text-gray-500 mt-2">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
            consequat.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1 mt-6 md:mt-0">
          {/* Thông tin liên hệ */}
          <div>
            <h4 className="font-semibold mb-2 whitespace-nowrap">Thông tin liên hệ</h4>
            <p className="mb-2">Điện thoại: 0704500354</p>
            <Link
              href="mailto:thiepcuoionline.com"
              className="text-black !no-underline hover:!underline mb-2 block"
            >
              Email: thiepcuoionline.com
            </Link>
          </div>

          {/* Tin tức */}
          <div>
            <h4 className="font-semibold mb-2">Tin tức</h4>
            <Link href="#" className="text-black !no-underline hover:!underline mb-2 block">
              Blog
            </Link>
            <Link href="#" className="text-black !no-underline hover:!underline mb-2 block">
              Câu hỏi thường gặp
            </Link>
            <Link href="#" className="text-black !no-underline hover:!underline mb-2 block">
              Hướng dẫn nhanh
            </Link>
          </div>

          {/* Danh mục */}
          <div>
            <h4 className="font-semibold mb-2">Danh mục</h4>
            <Link href="/" className="text-black !no-underline hover:!underline mb-2 block">
              Trang chủ
            </Link>
            <Link href="#" className="text-black !no-underline hover:!underline mb-2 block">
              Tạo thiệp
            </Link>
            <Link href="#" className="text-black !no-underline hover:!underline mb-2 block">
              Kho mẫu
            </Link>
            <Link href="#" className="text-black !no-underline hover:!underline mb-2 block">
              Liên hệ
            </Link>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-6 md:mt-0 flex flex-col items-start gap-3">
          <h4 className="font-semibold text-lg whitespace-nowrap">Connect with us</h4>
          <div className="flex gap-4 text-2xl">
            <Link href="#" target="_blank">
              <FaFacebook className="hover:scale-110 cursor-pointer text-[#1877F2]" />
            </Link>
            <Link href="#" target="_blank">
              <SiZalo className="hover:scale-110 cursor-pointer text-[#0068FF]" />
            </Link>
            <Link href="#" target="_blank">
              <SiMessenger className="hover:scale-110 cursor-pointer text-[#00B2FF]" />
            </Link>
            <Link href="#" target="_blank">
              <FaTiktok className="hover:scale-110 cursor-pointer text-black dark:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
