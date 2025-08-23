'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { SiZalo, SiMessenger } from 'react-icons/si';

export default function Footer() {
  return (
    <footer
      className="bg-[#FEF6F3] text-[#2C2C2C] py-10 px-5 md:px-20"
      style={{ boxShadow: 'var(--shadow-top)' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + Description */}
        <div className="flex-1 max-w-sm">
          <Image
            src="/images/header/logothiepcuoi.png"
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

        {/* All columns including Connect Us */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-8 flex-[2] justify-between">
          {/* Thông tin liên hệ */}
          <div className="min-w-[180px]">
            <h4 className="font-semibold mb-3">Thông tin liên hệ</h4>
            <p className="mb-2">Điện thoại: 0704500354</p>
            <Link
              href="mailto:thiepcuoionline.com"
              className="text-black !no-underline hover:!underline mb-2 block"
            >
              Email: thiepcuoionline.com
            </Link>
          </div>

          {/* Tin tức */}
          <div className="min-w-[180px]">
            <h4 className="font-semibold mb-3">Tin tức</h4>
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
          <div className="min-w-[180px]">
            <h4 className="font-semibold mb-3">Danh mục</h4>
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

          {/* Socials - now integrated with other columns */}
          <div className="min-w-[180px]">
            <h4 className="font-semibold mb-3">Connect with us</h4>
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
                <FaTiktok className="hover:scale-110 cursor-pointer text-black" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
