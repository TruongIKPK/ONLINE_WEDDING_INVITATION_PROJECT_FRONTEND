'use client';

import { Folder, User, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      key: '/dashboard', // đường dẫn
      label: 'Quản lý thiệp mời',
      icon: <Folder size={20} />,
    },
    {
      key: '/dashboard/account',
      label: 'Tài khoản & đơn mua',
      icon: <User size={20} />,
    },
    {
      key: '/dashboard/help',
      label: 'Trợ giúp',
      icon: <HelpCircle size={20} />,
    },
  ];

  return (
    <aside className="min-w-[250px] bg-[#FFF5F1] border-r border-gray-200 p-6 h-full">
      <nav className="flex flex-col gap-3">
        {navItems.map(item => {
          const isActive = pathname === item.key;

          return (
            <Link
              key={item.key}
              href={item.key}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${
                  isActive
                    ? 'bg-[#E5E5E5] text-[#2C2C2C] font-medium'
                    : 'text-[#888] hover:bg-gray-100'
                }`}
            >
              {item.icon}
              <span className="text-[15px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
