'use client';

import Header from '@/app/dashboard/Header';
import Sidebar from '@/app/dashboard/leftNavber';
import TemplateCard from '@/components/ui/Card';

export default function HomePage() {
  const cards = Array.from({ length: 6 }).map((_, index) => ({
    title: 'Fireworks Infographics',
    subtitle: 'Here is where your presentation begins',
    name: 'Tên Thiệp',
    price: 10000,
    category: 'Xem chi tiết',
    imageUrl: '/card-demo.png',
  }));

  return (
    <div className="h-screen flex flex-col bg-[#F5F5F5] font-sans overflow-hidden">
      <div className="shadow-md shadow-gray-300 z-10">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[20%] min-w-[240px] bg-[#FFF5F1] border-r border-gray-300 shadow-sm">
          <Sidebar />
        </div>

        {/* Nội dung bên phải */}
        <main className="flex-1 bg-[#FFF7F4] p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-8 text-[#2C2C2C]">Danh sách thiệp mời</h2>

          {/* Grid card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {cards.map((card, index) => (
              <div key={index} className="">
                <TemplateCard {...card} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
